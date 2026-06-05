import type { Metadata } from "next";
import ToolLandingPage from "@/components/ToolLandingPage";
import { buildMetadata, buildToolSchema, tiktokWatermarkPage } from "@/lib/tool-pages";

export const metadata: Metadata = buildMetadata(tiktokWatermarkPage);

export default function TikTokWatermarkRemoverPage() {
  return <ToolLandingPage {...tiktokWatermarkPage} schema={buildToolSchema(tiktokWatermarkPage)} />;
}
