
import { CartItem } from '@/lib/types';

interface OrderSummaryCardProps {
  items: CartItem[];
  getTotal: () => number;
}

const OrderSummaryCard = ({ items, getTotal }: OrderSummaryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-subtle p-6">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      
      <div className="divide-y space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex py-4 first:pt-0">
            <div className="w-16 h-16 shrink-0 bg-gray-50 rounded overflow-hidden">
              <img 
                src={item.product.image} 
                alt={item.product.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-medium line-clamp-2">{item.product.name}</h4>
              <div className="text-sm text-muted-foreground mt-1">
                {item.quantity} × ${item.product.price.toFixed(2)}
              </div>
            </div>
            <div className="ml-4 text-right">
              <span className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${getTotal().toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">$0.00</span>
        </div>
        
        <div className="pt-3 mt-3 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold">${getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
