//Why it is written this way
//title is required by how we’ll use the component, while this check:
//{description && (...)}
//prevents React from creating an empty meta description if a page does not provide one.
import { Helmet } from "react-helmet-async"

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>

      {description && (
        <meta
          name="description"
          content={description}
        />
      )}
    </Helmet>
  )
}

export default SEO