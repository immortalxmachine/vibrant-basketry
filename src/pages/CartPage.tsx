
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import CartEmpty from '@/components/cart/CartEmpty';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';
import ClearCartDialog from '@/components/cart/ClearCartDialog';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal, itemCount } = useCart();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const handleClearCart = () => {
    clearCart();
    setIsConfirmDialogOpen(false);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add items before proceeding to checkout.",
        variant: "destructive"
      });
      return;
    }
    navigate('/checkout');
  };
  
  return (
    <>
      <Helmet>
        <title>Your Cart | Elegance</title>
        <meta name="description" content="Review your shopping cart and checkout." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {/* Header */}
          <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground">Your Cart</span>
              </div>
              <h1 className="text-3xl font-display font-bold">Shopping Cart</h1>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-10">
            {items.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <CartItemsList 
                  items={items}
                  itemCount={itemCount}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onOpenClearDialog={() => setIsConfirmDialogOpen(true)}
                />
                
                <OrderSummary 
                  total={getTotal()}
                  onCheckout={handleCheckout}
                />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
      
      <ClearCartDialog 
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleClearCart}
      />
    </>
  );
};

export default CartPage;
