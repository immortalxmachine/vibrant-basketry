
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductFilters from '@/components/products/ProductFilters';
import ProductsList from '@/components/products/ProductsList';
import { sampleProducts } from '@/data/sampleProducts';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setIsLoading(true);
      // In a real app, fetch from API
      setTimeout(() => {
        setProducts(sampleProducts);
        setIsLoading(false);
      }, 500);
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Get category from URL query params
    const categoryParam = searchParams.get("category")?.toLowerCase() || "all";
    setSelectedCategory(categoryParam);
    
    // Filter products based on search and category
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryParam && categoryParam !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryParam
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, searchParams, searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect above
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL query params
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSearchParams({});
  };

  return (
    <>
      <Helmet>
        <title>Products | Elegance</title>
        <meta name="description" content="Browse our collection of premium products at Elegance." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {/* Header */}
          <div className="bg-gray-50 py-10 mb-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-display font-bold">Our Products</h1>
              <p className="text-muted-foreground mt-2">
                Discover our curated collection of premium products
              </p>
            </div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar / Filters */}
              <ProductFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                handleSearch={handleSearch}
              />
              
              {/* Product Grid */}
              <div className="flex-1">
                <ProductsList 
                  products={filteredProducts}
                  isLoading={isLoading}
                  clearFilters={clearFilters}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
