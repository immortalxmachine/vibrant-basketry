import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  MinusCircle, 
  PlusCircle, 
  ShoppingBag, 
  Trash2, 
  ArrowRight
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

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
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-medium">
                      Your Items ({itemCount})
                    </h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsConfirmDialogOpen(true)}
                      className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {items.map((cartItem) => (
                      <div 
                        key={cartItem.product.id} 
                        className="flex gap-4 p-4 bg-white rounded-lg shadow-subtle"
                      >
                        {/* Product Image */}
                        <Link 
                          to={`/products/${cartItem.product.id}`}
                          className="shrink-0 w-24 h-24 bg-gray-50 rounded overflow-hidden"
                        >
                          <img 
                            src={cartItem.product.image} 
                            alt={cartItem.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/products/${cartItem.product.id}`}
                            className="text-lg font-medium leading-tight hover:text-primary transition-colors line-clamp-1"
                          >
                            {cartItem.product.name}
                          </Link>
                          
                          <div className="text-sm text-muted-foreground mt-1">
                            ${cartItem.product.price.toFixed(2)} each
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity - 1)}
                                disabled={cartItem.quantity <= 1}
                                className="h-8 w-8"
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              
                              <span className="w-8 text-center">
                                {cartItem.quantity}
                              </span>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* Item Total & Remove */}
                            <div className="flex items-center">
                              <div className="font-medium mr-4">
                                ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveItem(cartItem.product.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-subtle p-6">
                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${getTotal().toFixed(2)}</span>
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
                          <span className="text-lg">${getTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mb-3" size="lg" onClick={handleCheckout}>
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
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
      
      {/* Confirm Clear Cart Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Cart</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove all items from your cart? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartPage;
