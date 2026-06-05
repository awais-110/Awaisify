import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import DownloaderWidget from "@/components/DownloaderWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import SchemaScript from "@/components/SchemaScript";

interface StepItem {
  title: string;
  description: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface RelatedTool {
  href: string;
  label: string;
  description: string;
}

interface ToolLandingPageProps {
  title: string;
  description: string;
  badgeLabel: string;
  placeholder?: string;
  helperText?: string;
  invalidHostMessage?: string;
  allowedHosts?: string[];
  trustBadges: string[];
  steps: StepItem[];
  features: FeatureItem[];
  faqs: FaqItem[];
  relatedTools: RelatedTool[];
  schema: Record<string, unknown> | Record<string, unknown>[];
  mode?: "default" | "audio-only";
  resultBadges?: string[];
  affiliateBannerType?: "4kdownloader" | "nordvpn" | "canva";
}

export default function ToolLandingPage({
  title,
  description,
  badgeLabel,
  placeholder,
  helperText,
  invalidHostMessage,
  allowedHosts,
  trustBadges,
  steps,
  features,
  faqs,
  relatedTools,
  schema,
  mode = "default",
  resultBadges = [],
  affiliateBannerType,
}: ToolLandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SchemaScript data={schema} />
      <Navbar />
      <main>
        <section className="border-b border-gray-100 bg-[radial-gradient(circle_at_top,#dbeafe_0%,#ffffff_45%,#ffffff_100%)] px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                {badgeLabel}
              </span>
            </div>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                  {description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {trustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <AdBanner slot="YOUR_SLOT_1" />
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
              <DownloaderWidget
                placeholder={placeholder}
                helperText={helperText}
                invalidHostMessage={invalidHostMessage}
                allowedHosts={allowedHosts}
                mode={mode}
                resultBadges={resultBadges}
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-black text-gray-900">How to use</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <AdBanner slot="YOUR_SLOT_2" />
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-black text-gray-900">Why people use this tool</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {affiliateBannerType && (
          <section className="px-4 py-6">
            <div className="mx-auto max-w-6xl">
              <AffiliateBanner type={affiliateBannerType} />
            </div>
          </section>
        )}

        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Frequently asked questions</h2>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Related tools</h2>
              <div className="mt-6 space-y-4">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200"
                  >
                    <h3 className="text-sm font-bold text-gray-900">{tool.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <AdBanner slot="YOUR_SLOT_3" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
