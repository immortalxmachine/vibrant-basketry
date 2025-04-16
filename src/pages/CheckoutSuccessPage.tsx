
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Order } from '@/lib/types';
import { CheckCircle2, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      // Get the order ID from URL params
      const params = new URLSearchParams(location.search);
      const orderId = params.get('order');
      
      if (!orderId) {
        setError('No order ID found');
        setLoading(false);
        return;
      }

      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError('Order not found');
        } else {
          // Transform the Supabase data to match our Order interface
          setOrder({
            id: data.id,
            userId: data.user_id,
            status: data.status,
            total: data.total,
            createdAt: data.created_at
          });
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [location, user, navigate]);

  return (
    <>
      <Helmet>
        <title>Order Confirmation | Elegance</title>
        <meta name="description" content="Thank you for your order" />
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
                <span className="text-foreground">Order Confirmation</span>
              </div>
              <h1 className="text-3xl font-display font-bold">Order Confirmation</h1>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-16">
            {loading ? (
              <div className="text-center py-16">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-display font-bold">Loading your order details...</h2>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="inline-flex mx-auto justify-center items-center w-20 h-20 bg-red-50 rounded-full mb-6">
                  <ShoppingBag className="h-10 w-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-3">Something went wrong</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {error}
                </p>
                <Link to="/">
                  <Button>
                    Return to Home
                  </Button>
                </Link>
              </div>
            ) : order ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex mx-auto justify-center items-center w-24 h-24 bg-green-50 rounded-full mb-6">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-3">Thank You for Your Order!</h2>
                <p className="text-xl mb-2">
                  Your order <span className="font-medium">#{order.id.substring(0, 8)}</span> has been placed.
                </p>
                <p className="text-muted-foreground mb-8">
                  We've sent a confirmation email to your email address.
                  You can also view your order details in your account.
                </p>
                
                <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
                  <div className="flex justify-between mb-3">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/products">
                    <Button>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex mx-auto justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-3">No order found</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any order details. Please try again or contact customer support.
                </p>
                <Link to="/">
                  <Button>
                    Return to Home
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

export default CheckoutSuccessPage;
