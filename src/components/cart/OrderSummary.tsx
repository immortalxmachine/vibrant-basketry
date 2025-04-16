
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface OrderSummaryProps {
  total: number;
  onCheckout: () => void;
}

const OrderSummary = ({ total, onCheckout }: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-subtle p-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          
          <div className="pt-3 mt-3 border-t border-gray-200">
            <div className="flex justify-between font-medium">
              <span>Estimated Total</span>
              <span className="text-lg">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full mb-3" size="lg" onClick={onCheckout}>
          Proceed to Checkout
        </Button>
        
        <Link to="/products">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
