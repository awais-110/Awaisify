import type { Metadata } from "next";
import ToolLandingPage from "@/components/ToolLandingPage";
import { buildMetadata, buildToolSchema, platformPages } from "@/lib/tool-pages";

const page = platformPages.youtube;

export const metadata: Metadata = buildMetadata(page);

export default function YouTubeDownloaderPage() {
  return <ToolLandingPage {...page} schema={buildToolSchema(page)} />;
}
