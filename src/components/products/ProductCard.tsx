
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, 1);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link 
      to={`/products/${product.id}`}
      className="group product-card block rounded-xl bg-white overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-elevation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative product-image-container aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image w-full h-full object-cover"
        />
        
        {/* Quick Action Buttons */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2 bg-black/5 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button 
            variant="secondary"
            size="icon"
            className="bg-white shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors", 
                isFavorite ? "fill-red-500 text-red-500" : ""
              )} 
            />
          </Button>
          
          <Button 
            variant="secondary"
            size="icon"
            className="bg-white shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Product Badge */}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded",
            product.inStock 
              ? "bg-green-50 text-green-600" 
              : "bg-red-50 text-red-600"
          )}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="mt-1 text-lg font-semibold">${product.price.toFixed(2)}</p>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 group-hover:border-primary group-hover:text-primary transition-colors duration-300"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
