
import { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import CartItem from './CartItem';

interface CartItemsListProps {
  items: CartItemType[];
  itemCount: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenClearDialog: () => void;
}

const CartItemsList = ({ 
  items, 
  itemCount, 
  onUpdateQuantity, 
  onRemoveItem,
  onOpenClearDialog 
}: CartItemsListProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-medium">
          Your Items ({itemCount})
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onOpenClearDialog}
          className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Cart
        </Button>
      </div>
      
      <div className="space-y-6">
        {items.map((item) => (
          <CartItem 
            key={item.product.id} 
            item={item} 
            onUpdateQuantity={onUpdateQuantity} 
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
