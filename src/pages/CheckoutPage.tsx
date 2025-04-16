
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronRight, CreditCard, Loader2 } from 'lucide-react';

// Define checkout form schema
const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  paymentMethod: z.enum(["credit", "debit", "paypal"], {
    required_error: "Please select a payment method",
  }),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Please enter a valid card number")
    .optional()
    .or(z.literal("")),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please enter a valid expiry date (MM/YY)")
    .optional()
    .or(z.literal("")),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, "Please enter a valid CVC")
    .optional()
    .or(z.literal("")),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCardFields, setShowCardFields] = useState(true);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "credit",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const handleSubmit = async (values: CheckoutFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to complete your purchase",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add items before checking out.",
        variant: "destructive"
      });
      navigate('/products');
      return;
    }

    // Validate card details if credit/debit is selected
    if ((values.paymentMethod === "credit" || values.paymentMethod === "debit") && 
        (!values.cardNumber || !values.expiryDate || !values.cvc)) {
      toast({
        title: "Payment information required",
        description: "Please enter your complete card details",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create a new order in the database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total: getTotal(),
        })
        .select()
        .single();
      
      if (orderError) throw orderError;

      // Create order items for each product in the cart
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Mock payment processing - in a real app you would use Stripe or another payment processor
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate payment processing

      // Success - clear the cart and navigate to confirmation
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id.substring(0, 8)} has been placed.`,
      });
      navigate(`/checkout/success?order=${order.id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch the payment method to toggle card fields visibility
  const paymentMethod = form.watch("paymentMethod");
  
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
          <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <a href="/" className="hover:text-primary">Home</a>
                <ChevronRight className="h-4 w-4 mx-2" />
                <a href="/cart" className="hover:text-primary">Cart</a>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground">Checkout</span>
              </div>
              <h1 className="text-3xl font-display font-bold">Checkout</h1>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Payment Section */}
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Payment Details
                        </CardTitle>
                        <CardDescription>
                          Select a payment method for your order
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="credit" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Credit Card</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="debit" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Debit Card</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="paypal" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">PayPal</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Credit/Debit Card Fields */}
                          {(paymentMethod === "credit" || paymentMethod === "debit") && (
                            <div className="pt-4 space-y-4">
                              <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="4242 4242 4242 4242" 
                                        {...field}
                                        maxLength={19}
                                        onChange={(e) => {
                                          // Format card number with spaces
                                          const value = e.target.value.replace(/\s/g, "");
                                          const formattedValue = value
                                            .replace(/\D/g, "")
                                            .replace(/(\d{4})(?=\d)/g, "$1 ");
                                          field.onChange(formattedValue);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="expiryDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Expiry Date</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="MM/YY" 
                                          {...field}
                                          maxLength={5}
                                          onChange={(e) => {
                                            // Format expiry date with slash
                                            const value = e.target.value.replace(/\D/g, "");
                                            if (value.length <= 2) {
                                              field.onChange(value);
                                            } else {
                                              field.onChange(
                                                value.slice(0, 2) + "/" + value.slice(2, 4)
                                              );
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="cvc"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>CVC</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="123" 
                                          {...field}
                                          maxLength={4} 
                                          onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            field.onChange(value);
                                          }}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}

                          {/* PayPal info */}
                          {paymentMethod === "paypal" && (
                            <div className="pt-4 bg-gray-50 p-4 rounded-md text-center">
                              <p className="text-sm text-muted-foreground">
                                You will be redirected to PayPal to complete your purchase securely.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Place Order</>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
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
