
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CheckoutHeader = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/cart" className="hover:text-primary">Cart</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">Checkout</span>
        </div>
        <h1 className="text-3xl font-display font-bold">Checkout</h1>
      </div>
    </div>
  );
};

export default CheckoutHeader;
