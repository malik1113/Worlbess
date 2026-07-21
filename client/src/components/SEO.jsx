import { Helmet } from "react-helmet-async"

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>

      {description && (
        <>
          <meta
            name="description"
            content={description}
          />

          <meta
            property="og:title"
            content={title}
          />

          <meta
            property="og:description"
            content={description}
          />
        </>
      )}
    </Helmet>
  )
}

export default SEO