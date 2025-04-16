import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';

// Sample product data (in a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
    name: "Ultra-Slim Laptop Pro",
    price: 1299.99,
    description: "The latest ultra-slim laptop with powerful performance, stunning display, and all-day battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: "5",
    name: "Premium Denim Jacket",
    price: 89.99,
    description: "A classic denim jacket made from premium materials, featuring a comfortable fit and timeless design.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFja2V0fGVufDB8fDB8fHww",
    rating: 4.5,
    inStock: true
  },
  {
    id: "6",
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "An ergonomic office chair designed for maximum comfort during long work sessions.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    inStock: true
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    description: "An eco-friendly, vacuum-insulated water bottle that keeps your drinks hot or cold for hours.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
    rating: 4.4,
    inStock: true
  },
  {
    id: "8",
    name: "Modern Coffee Table",
    price: 199.99,
    description: "A sleek, modern coffee table with a minimalist design, perfect for any living room.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1559554604-0f9a6e3f4109?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    inStock: false
  }
];

const categories = [
  { id: "1", name: "All" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Clothing" },
  { id: "4", name: "Accessories" },
  { id: "5", name: "Furniture" }
];

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
              <div className="w-full md:w-64 shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Search */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Search</h3>
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCategory === category.name.toLowerCase()
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleCategoryChange(category.name.toLowerCase())}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="flex-1">
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
                        <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                        <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSearchParams({});
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
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
