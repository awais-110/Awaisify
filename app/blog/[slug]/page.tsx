import type { Metadata } from "next";
import Image from "next/image";
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
  const imageUrl = post.heroImage ? `${BASE_URL}${post.heroImage.src}` : `${BASE_URL}/favicon.ico`;

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
      images: [imageUrl],
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
  const schemaImage = post.heroImage ? `${BASE_URL}${post.heroImage.src}` : `${BASE_URL}/favicon.ico`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Awaisify Down",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    image: schemaImage,
    keywords: post.keywords.join(", "),
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

          {post.heroImage && (
  <figure className="my-8 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm sm:mx-auto max-w-[300px]">
    <Image
      src={post.heroImage.src}
      width={post.heroImage.width}
      height={post.heroImage.height}
      alt={post.heroImage.alt}
      loading="lazy"
      sizes="300px"
      className="h-auto w-full"
    />
    <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500">
      {post.heroImage.caption}
    </figcaption>
  </figure>
)}

                <div className="mt-6 flex flex-wrap gap-3">
                  {post.cta && (
                    <Link href={post.cta.href} className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700">
                      {post.cta.label}
                    </Link>
                  )}
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

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-5 grid gap-3 text-sm font-medium text-gray-700 sm:grid-cols-2">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.image && (
                        <figure className="my-8 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm sm:mx-auto max-w-[300px]">
  <Image
    src={section.image.src}
    width={section.image.width}
    height={section.image.height}
    alt={section.image.alt}
    loading="lazy"
    sizes="300px"
    className="h-auto w-full"
  />
  <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500">
    {section.image.caption}
  </figcaption>
</figure>
                      )}
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

              {post.cta && (
                <section className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-8">
                  <h2 className="text-2xl font-black text-gray-900">Ready to save your Reel?</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                    Open the Instagram downloader, paste your public Reel link, and download it from your browser.
                  </p>
                  <Link href={post.cta.href} className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700">
                    {post.cta.label}
                  </Link>
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
                  <Link href="/" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">
                    Homepage
                  </Link>
                  <Link href="/instagram-downloader" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">
                    Instagram Downloader
                  </Link>
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
