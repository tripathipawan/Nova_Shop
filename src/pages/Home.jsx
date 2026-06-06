import useSEO from "../hooks/useSEO";
import Carousel     from "../components/Homepage_Components/Carousel";
import MidBanner    from "../components/Homepage_Components/MidBanner";
import Features     from "../components/Homepage_Components/Features";
import Reviews      from "../components/Homepage_Components/Review";
import UseCaseSection from "../components/Homepage_Components/UseCaseSection";
import Category     from "../components/Homepage_Components/Category";
import Deals        from "../components/Homepage_Components/Deals";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "NovaShop — Home",
  url: "https://knovashop.vercel.app/",
  description: "Shop premium electronics, fashion, home essentials and more on NovaShop. Fast delivery across India, secure payments, easy returns.",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://knovashop.vercel.app/" }],
  },
};

const Home = () => {
  useSEO({
    title:       "NovaShop – Premium Online Shopping | Best Deals in India",
    description: "Shop premium electronics, fashion, home essentials on NovaShop. Lightning-fast delivery across India, secure payments, easy returns. 50K+ happy customers.",
    schema:      homeSchema,
  });

  return (
    <div className="overflow-x-hidden">
      <Category />
      <Carousel />
      <UseCaseSection />
      <Deals />
      <MidBanner />
      <Features />
      <Reviews />
    </div>
  );
};

export default Home;