import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

const cardElementOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

interface PaymentFormProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

function PaymentForm({ onSuccess, onError }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [cardholderName, setCardholderName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setCardholderName('');
        setError(null);
        
        // Limpiar el CardElement
        const cardElement = elements?.getElement(CardElement);
        if (cardElement) {
            cardElement.clear();
        }
    };

    const createSetupIntent = async (): Promise<string> => {
        try {
            const response = await fetch('/payment/create-setup-intent', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Aquí está la corrección: extraer client_secret del objeto
            if (!data.client_secret) {
                throw new Error('No client_secret received from server');
            }

            return data.client_secret;

        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card element not found');
            setIsLoading(false);
            return;
        }

        try {
            // Crear Setup Intent dinámicamente
            const clientSecret = await createSetupIntent();
            console.log('Client secret:', clientSecret);

            // Confirmar el Setup Intent con Stripe
            const { error, setupIntent } = await stripe.confirmCardSetup(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: cardholderName,
                        },
                    },
                }
            );

            if (error) {
                console.error('Stripe error:', error);
                setError(error.message || 'An error occurred');
                onError?.(error.message || 'An error occurred');
            } else {
                console.log('Setup successful!', setupIntent);
                setSuccess(true);
                resetForm();
                onSuccess?.();
            }
        } catch (err) {
            console.error('General error:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAnother = () => {
        setSuccess(false);
        setError(null);
    };

    if (success) {
        return (
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-green-800">Payment Method Added!</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Your payment method has been saved successfully.
                            </p>
                        </div>
                        <Button 
                            onClick={handleAddAnother}
                            variant="outline"
                            className="w-full"
                        >
                            Add Another Payment Method
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Add Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-holder-name">Cardholder Name</Label>
                        <Input
                            id="card-holder-name"
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            placeholder="Enter cardholder name"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Card Information</Label>
                        <div className="p-3 border rounded-md">
                            <CardElement 
                                options={{
                                    ...cardElementOptions,
                                    disabled: isLoading
                                }} 
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={!stripe || isLoading}
                        className="w-full"
                    >
                        {isLoading ? 'Processing...' : 'Add Payment Method'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

interface AddPaymentMethodProps {
    stripeKey: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export default function AddPaymentMethod({
    stripeKey,
    onSuccess,
    onError
}: AddPaymentMethodProps) {
    const stripePromise = loadStripe(stripeKey);

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm
                onSuccess={onSuccess}
                onError={onError}
            />
        </Elements>
    );
}