import SEO from "../components/SEO";

import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import VideoSection from "../components/VideoSection";
import BrandStory from "../components/BrandStory";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <SEO
        title="Worlbess | Premium Grabba & Tobacco Leaf"
        description="Discover premium Grabba, natural tobacco leaf, and smoking accessories from Worlbess. Crafted for quality, freshness, and an exceptional smoking experience."
      />

      <Hero />
      <FeaturedCollections />
      <VideoSection />
      <BrandStory />
      <FeaturedProducts />
    </>
  );
}

export default Home;
