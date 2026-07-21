import { Helmet } from "react-helmet-async";

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>

      {description && (
        <>
          <meta name="description" content={description} />

          <meta property="og:title" content={title} />

          <meta property="og:description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />

          <meta name="twitter:title" content={title} />

          <meta name="twitter:description" content={description} />
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