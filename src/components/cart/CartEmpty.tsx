
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartEmpty = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex mx-auto justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-6">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-display font-bold mb-3">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love.
      </p>
      <Link to="/products">
        <Button size="lg">
          Browse Products
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
