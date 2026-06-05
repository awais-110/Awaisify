import type { Metadata } from "next";
import ToolLandingPage from "@/components/ToolLandingPage";
import { buildMetadata, buildToolSchema, mp3ConverterPage } from "@/lib/tool-pages";

export const metadata: Metadata = buildMetadata(mp3ConverterPage);

export default function Mp3ConverterPage() {
  return <ToolLandingPage {...mp3ConverterPage} schema={buildToolSchema(mp3ConverterPage)} />;
}
