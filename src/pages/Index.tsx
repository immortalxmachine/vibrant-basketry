
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Elegance | Premium E-Commerce</title>
        <meta name="description" content="Discover premium quality products at Elegance, your one-stop shop for the finest selection of goods." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FeaturedProducts />
          <CategorySection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
