import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";

export default function Home() {
  return (
    <div className="">
      {/* <Banner /> */}
      <Hero />
      <Products />
      {/* <Products /> */}
    </div>
  );
}
