import {
  Navigation,
  Hero,
  TrendingNFTs,
  TopSellers,
  Features,
  Footer
} from "@/components/home";
import LiveStats from "@/components/home/live_stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900">
      <Navigation />
      <Hero />
      <LiveStats />
      <div id="nfts">
        <TrendingNFTs />
      </div>
      <div id="top-sellers">
        <TopSellers />
      </div>
      <div id="features">
        <Features />
      </div>
      <Footer />
    </div>
  );
}
