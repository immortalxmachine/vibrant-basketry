
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Product } from '@/lib/types';
import { useCart } from '@/hooks/useCart';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, ShoppingCart, Star, ChevronRight, ArrowLeft } from 'lucide-react';

// Sample product data (in a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation technology. These headphones are designed for comfort during extended listening sessions, with memory foam ear cushions and an adjustable headband. They feature Bluetooth 5.0 connectivity for seamless pairing with your devices and up to 30 hours of battery life on a single charge.",
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
    description: "Stay connected with our latest smartwatch featuring health monitoring, GPS, and cellular connectivity. The Series 5 includes advanced health sensors to track your heart rate, sleep patterns, and activity levels. With a beautiful always-on Retina display, you can easily view your information at a glance. The watch is water-resistant up to 50 meters and includes a variety of customizable bands to match your style.",
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
    description: "A stylish leather bag that combines elegance and functionality, perfect for everyday use. Crafted from premium full-grain leather, this bag features a spacious main compartment with interior pockets for organization, a secure zippered closure, and adjustable straps for comfortable carrying. The timeless design ensures this bag will be a staple in your collection for years to come.",
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
    description: "The latest ultra-slim laptop with powerful performance, stunning display, and all-day battery life. Featuring a high-resolution Retina display, this laptop delivers vibrant colors and incredible detail. Powered by the latest processor and graphics card, it handles intensive tasks with ease while maintaining a thin and lightweight design. The backlit keyboard and large trackpad provide a comfortable user experience, and the solid-state drive ensures fast boot times and application launches.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    rating: 4.9,
    inStock: true,
    featured: true
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call
    const fetchProduct = async () => {
      setIsLoading(true);
      
      // In a real app, fetch from API based on ID
      setTimeout(() => {
        const foundProduct = sampleProducts.find(p => p.id === id);
        setProduct(foundProduct || null);
        setIsLoading(false);
      }, 500);
    };
    
    fetchProduct();
  }, [id]);
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncreaseQuantity = () => {
    // In a real app, you would check against available stock
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <>
      <Helmet>
        <title>{product ? `${product.name} | Elegance` : 'Product | Elegance'}</title>
        <meta name="description" content={product?.description || 'Product details'} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {/* Breadcrumb */}
          <div className="bg-gray-50 py-3">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link to="/products" className="hover:text-primary">Products</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground">{product?.name || 'Product'}</span>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <div className="bg-gray-200 rounded-lg aspect-square"></div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-6 rounded w-1/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-10 rounded w-full mt-6"></div>
                  </div>
                </div>
              </div>
            ) : product ? (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                  <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="w-full md:w-1/2">
                  <div className="sticky top-24">
                    <h1 className="text-3xl font-display font-bold mb-4">{product.name}</h1>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star 
                            key={index} 
                            className={`h-4 w-4 ${
                              index < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {product.rating} Rating
                        </span>
                      </div>
                      
                      <span className="text-muted-foreground">|</span>
                      
                      <span className={`text-sm px-2 py-1 rounded ${
                        product.inStock 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    <div className="text-2xl font-semibold mb-4">
                      ${product.price.toFixed(2)}
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {product.description}
                    </p>
                    
                    {/* Quantity Selector */}
                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2">Quantity</p>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleDecreaseQuantity}
                          disabled={quantity <= 1}
                          className="h-10 w-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <div className="w-16 mx-2">
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full text-center h-10 border rounded-md"
                            min="1"
                          />
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleIncreaseQuantity}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={handleAddToCart}
                        className="flex-1 add-to-cart-btn bg-primary hover:bg-primary/90"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleToggleFavorite}
                      >
                        <Heart 
                          className={`h-4 w-4 mr-2 ${
                            isFavorite ? 'fill-red-500 text-red-500' : ''
                          }`} 
                        />
                        {isFavorite ? 'Saved' : 'Wishlist'}
                      </Button>
                    </div>
                    
                    {/* Back to products */}
                    <div className="mt-8">
                      <Link 
                        to="/products" 
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Product Not Found</h3>
                <p className="text-muted-foreground mb-4">
                  The product you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/products">
                  <Button>
                    Browse Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
