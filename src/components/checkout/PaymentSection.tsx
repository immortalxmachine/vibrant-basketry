
import { CreditCard } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { CheckoutFormValues } from './CheckoutForm';

interface PaymentSectionProps {
  form: UseFormReturn<CheckoutFormValues>;
  paymentMethod: string;
}

export const PaymentSection = ({ form, paymentMethod }: PaymentSectionProps) => {
  return (
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
  );
};
