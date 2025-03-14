
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample product data (in a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation technology.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 399.99,
    description: "Stay connected with our latest smartwatch featuring health monitoring, GPS, and cellular connectivity.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 159.99,
    description: "A stylish leather bag that combines elegance and functionality, perfect for everyday use.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Ultra-Slim Laptop Pro",
    price: 1299.99,
    description: "The latest ultra-slim laptop with powerful performance, stunning display, and all-day battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    rating: 4.9,
    inStock: true,
    featured: true
  }
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setIsLoading(true);
      // In a real app, fetch from API: const response = await fetch('/api/featured-products');
      setTimeout(() => {
        setProducts(sampleProducts);
        setIsLoading(false);
      }, 500);
    };
    
    fetchProducts();
  }, []);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-sm font-medium text-primary mb-2">FEATURED PRODUCTS</h2>
            <h3 className="text-3xl font-display font-bold">Our Most Popular Items</h3>
          </div>
          
          <Link to="/products">
            <Button 
              variant="ghost"
              className="mt-4 md:mt-0 group"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
