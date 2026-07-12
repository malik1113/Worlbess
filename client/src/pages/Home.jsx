import Hero from "../components/Hero"
import FeaturedCollections from "../components/FeaturedCollections"
import VideoSection from "../components/VideoSection"
import BrandStory from "../components/BrandStory"
import FeaturedProducts from "../components/FeaturedProducts"

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <VideoSection />
      <BrandStory />
      <FeaturedProducts />
    </>
  )
}

export default Home