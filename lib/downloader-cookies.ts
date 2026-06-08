import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "downloader_cookies";
const MAX_COOKIE_LENGTH = 3000;

function getSecret(): string {
  const secret = process.env.DOWNLOADER_COOKIE_SECRET || process.env.NEXTAUTH_SECRET || "";

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("DOWNLOADER_COOKIE_SECRET is required to store downloader cookies.");
  }

  return secret || "development-only-downloader-cookie-secret";
}

function getKey(): Buffer {
  return crypto.createHash("sha256").update(getSecret()).digest();
}

export function validateDownloaderCookies(value: string): string {
  const cookies = value.trim();

  if (!cookies) {
    throw new Error("Enter cookies before saving.");
  }

  if (cookies.length > MAX_COOKIE_LENGTH) {
    throw new Error("Cookie value is too large. Please include only the required platform cookies.");
  }

  const pairs = cookies.split(";").map((part) => part.trim()).filter(Boolean);
  const validPair = /^[^=;\s][^=;]*=[^;]+$/;

  if (!pairs.length || pairs.some((pair) => !validPair.test(pair))) {
    throw new Error("Invalid cookie format. Use name=value pairs separated by semicolons.");
  }

  return pairs.join("; ");
}

export function encryptDownloaderCookies(value: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptDownloaderCookies(value?: string): string | undefined {
  if (!value) return undefined;

  try {
    const payload = Buffer.from(value, "base64url");
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const encrypted = payload.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), iv);

    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  } catch {
    return undefined;
  }
}

export function getDownloaderCookies(req: NextRequest): string | undefined {
  return decryptDownloaderCookies(req.cookies.get(COOKIE_NAME)?.value);
}

export function setDownloaderCookie(res: NextResponse, encryptedValue: string) {
  res.cookies.set(COOKIE_NAME, encryptedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearDownloaderCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export function logDownloaderCookieUsage(platform: string, present: boolean, used: boolean) {
  if (process.env.NODE_ENV !== "development") return;

  console.log("DOWNLOADER_COOKIES", { platform, present, used });
}
