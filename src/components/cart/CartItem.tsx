
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-subtle">
      {/* Product Image */}
      <Link 
        to={`/products/${item.product.id}`}
        className="shrink-0 w-24 h-24 bg-gray-50 rounded overflow-hidden"
      >
        <img 
          src={item.product.image} 
          alt={item.product.name} 
          className="w-full h-full object-cover"
        />
      </Link>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/products/${item.product.id}`}
          className="text-lg font-medium leading-tight hover:text-primary transition-colors line-clamp-1"
        >
          {item.product.name}
        </Link>
        
        <div className="text-sm text-muted-foreground mt-1">
          ${item.product.price.toFixed(2)} each
        </div>
        
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8"
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center">
              {item.quantity}
            </span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="h-8 w-8"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Item Total & Remove */}
          <div className="flex items-center">
            <div className="font-medium mr-4">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemoveItem(item.product.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
