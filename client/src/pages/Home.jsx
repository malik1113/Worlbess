import { Helmet } from "react-helmet-async"

import Hero from "../components/Hero"
import FeaturedCollections from "../components/FeaturedCollections"
import VideoSection from "../components/VideoSection"
import BrandStory from "../components/BrandStory"
import FeaturedProducts from "../components/FeaturedProducts"

function Home() {
  return (
    <>
      <Helmet>
        <title>Worlbess | Premium Grabba & Tobacco Leaf</title>

        <meta
          name="description"
          content="Discover premium Grabba, natural tobacco leaf, and smoking accessories from Worlbess. Crafted for quality, freshness, and an exceptional smoking experience."
        />
      </Helmet>

      <Hero />
      <FeaturedCollections />
      <VideoSection />
      <BrandStory />
      <FeaturedProducts />
    </>
  )
}

export default Home