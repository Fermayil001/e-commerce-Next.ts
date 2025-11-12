import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="">
      {/* <Banner /> */}
      <Hero />
      <FeaturedProducts />
      <Products />
      {/* <Products /> */}
    </div>
  );
}
