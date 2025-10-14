import {
  Navigation,
  Hero,
  Categories,
  TrendingNFTs,
  DigitalProducts,
  TopSellers,
  Features,
  Newsletter,
  Footer
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900">
      <Navigation />
      <Hero />
      <div id="categories">
        <Categories />
      </div>
      <div id="nfts">
        <TrendingNFTs />
      </div>
      <div id="digital-products">
        <DigitalProducts />
      </div>
      <TopSellers />
      <div id="features">
        <Features />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
