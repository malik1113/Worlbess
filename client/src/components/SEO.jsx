import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  canonical,
  image = "/images/Earth-in-space.png",
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Worlbess",
        url: siteUrl,
        logo: `${siteUrl}/images/Earth-in-space.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Worlbess",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };
  return (
    <Helmet>
      <title>{title}</title>

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {canonical && <link rel="canonical" href={canonical} />}

      {description && (
        <>
          <meta name="description" content={description} />

          <meta property="og:title" content={title} />

          <meta property="og:description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />

          <meta name="twitter:title" content={title} />

          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={image} />

          <meta property="og:site_name" content="Worlbess" />

          <meta name="twitter:image" content={image} />
        </>
      )}
    </Helmet>
  );
}

export default SEO;

//Why we're using summary_large_image
//Twitter/X supports several card types.
//summary_large_image is the recommended format for ecommerce because it displays:
//Large product or brand image
//Page title
//Description
//Once we add your default social image later in this milestone, shared Worlbess links will have a polished preview across social platforms.
