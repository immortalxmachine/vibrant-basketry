
import { Helmet } from 'react-helmet';
import { useCart } from '@/hooks/useCart';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard';

const CheckoutPage = () => {
  const { items, getTotal } = useCart();
  
  return (
    <>
      <Helmet>
        <title>Checkout | Elegance</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {/* Header */}
          <CheckoutHeader />
          
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <CheckoutForm />
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummaryCard items={items} getTotal={getTotal} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
