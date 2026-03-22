import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  /** Page title – shown in browser tab and Google (50–60 chars recommended) */
  title?: string;
  /** Meta description – shown in Google snippet (150–160 chars recommended) */
  description?: string;
  /** Canonical URL for this page */
  canonical?: string;
  /** Open Graph image URL (1200×630 recommended) */
  ogImage?: string;
  /** Open Graph image alt text */
  ogImageAlt?: string;
  /** Page type for Open Graph */
  ogType?: string;
  /** Additional keywords for this page */
  keywords?: string;
  /** JSON-LD structured data for this page */
  structuredData?: object | object[];
  /** noindex – set true for pages that should not be indexed */
  noIndex?: boolean;
}

const SITE_NAME = 'HABESHA – Äthiopisches Restaurant Salzburg';
const DEFAULT_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/9HrMebUv6xYuQJf7s9tVq7/og-image_9004108a.jpg';
const BASE_URL = 'https://www.habesha-salzburg.at';

// Global keywords always appended to every page
const GLOBAL_KEYWORDS = [
  'äthiopisches Restaurant Salzburg', 'Ethiopian restaurant Salzburg',
  'halal Restaurant Salzburg', 'veganes Restaurant Salzburg',
  'glutenfreies Restaurant Salzburg', 'gluten free restaurant Salzburg',
  'Zöliakie Restaurant Salzburg', 'ohne Weizen Salzburg',
  'Injera Salzburg', 'äthiopische Küche', 'Ethiopian food Salzburg',
  'African food Salzburg', 'Habesha Salzburg',
].join(', ');

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogType = 'website',
  keywords,
  structuredData,
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | HABESHA Salzburg`
    : SITE_NAME;

  const combinedKeywords = keywords
    ? `${keywords}, ${GLOBAL_KEYWORDS}`
    : GLOBAL_KEYWORDS;

  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`)
    : BASE_URL;

  const structuredDataArray = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      {description && <meta name="description" content={description} />}
      <meta name="keywords" content={combinedKeywords} />
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      }
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="de_AT" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {/* Structured Data (JSON-LD) */}
      {structuredDataArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
