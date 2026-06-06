import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import AffiliateBanner from "@/components/AffiliateBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchemaScript from "@/components/SchemaScript";
import { blogs, getBlogBySlug } from "@/lib/blogs";
import { BASE_URL } from "@/lib/tool-pages";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogBySlug(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Awaisify Down`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Awaisify Down`,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [`${BASE_URL}/favicon.ico`],
      type: "article",
    },
  };
}

function buildShareLinks(slug: string, title: string) {
  const url = `${BASE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const shareLinks = buildShareLinks(post.slug, post.title);
  const relatedPosts = blogs
    .filter((blog) => blog.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 0 : 1;
      const bScore = b.category === post.category ? 0 : 1;
      return aScore - bScore;
    })
    .slice(0, 3);
  const midIndex = Math.floor(post.sections.length / 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Awaisify Down",
    },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    image: `${BASE_URL}/favicon.ico`,
  };

  const schema = post.faqs && post.faqs.length > 0
    ? [
        articleSchema,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ]
    : articleSchema;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SchemaScript data={schema} />
      <Navbar />
      <main className="px-4 py-10">
        <article className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">{post.category}</span>
                  <span className="text-gray-400">{post.date}</span>
                  <span className="text-gray-400">{post.readTime}</span>
                  <span className="text-gray-400">By {post.author}</span>
                </div>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900">{post.title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">{post.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600">
                    Share on Twitter
                  </Link>
                  <Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600">
                    Share on Facebook
                  </Link>
                  <Link href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600">
                    Share on WhatsApp
                  </Link>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                {post.sections.map((section, index) => (
                  <div key={section.id}>
                    <section id={section.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                      <h2 className="text-2xl font-black text-gray-900">{section.heading}</h2>
                      <div className="mt-4 space-y-4 text-base leading-8 text-gray-700">
                        {section.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                        ))}
                      </div>
                    </section>

                    {index === 0 && post.affiliateBanners && post.affiliateBanners.length > 0 && (
                      <div className="mt-6 space-y-4">
                        {post.affiliateBanners.map((type) => (
                          <AffiliateBanner key={type} type={type} />
                        ))}
                      </div>
                    )}

                    {index === midIndex && (
                      <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                        <AdBanner slot="YOUR_SLOT_2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <section className="mt-10">
                <h2 className="text-2xl font-black text-gray-900">Related posts</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200"
                    >
                      <div className="text-xs font-semibold text-blue-600">{related.category}</div>
                      <h3 className="mt-3 text-sm font-bold leading-6 text-gray-900">{related.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{related.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>

              {post.faqs && post.faqs.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-2xl font-black text-gray-900">Frequently asked questions</h2>
                  <div className="mt-6 space-y-4">
                    {post.faqs.map((faq) => (
                      <div key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-gray-900">Table of contents</h2>
                <nav className="mt-4 space-y-3">
                  {post.sections.map((section, index) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm leading-6 text-gray-600 transition-colors hover:text-blue-600"
                    >
                      {index + 1}. {section.heading}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                <AdBanner slot="YOUR_SLOT_1" />
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-gray-900">More from Awaisify Down</h2>
                <div className="mt-4 space-y-3">
                  <Link href="/youtube-downloader" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">
                    YouTube Downloader
                  </Link>
                  <Link href="/mp3-converter" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">
                    MP3 Converter
                  </Link>
                  <Link href="/tiktok-watermark-remover" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">
                    TikTok Watermark Remover
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
