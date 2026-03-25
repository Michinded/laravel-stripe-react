import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    CreditCard, 
    MoreVertical, 
    Star, 
    StarOff, 
    Edit, 
    Trash2, 
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

// Tipos TypeScript simplificados
interface BillingDetails {
    name: string | null;
    email?: string | null;
    phone?: string | null;
}

interface CardDetails {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
    funding: string; // 'credit', 'debit', etc.
}

interface PaymentMethod {
    id: string;
    type: string;
    billing_details: BillingDetails;
    card: CardDetails;
    created: number;
}

interface PaymentMethodsProps {
    onSetDefault?: (paymentMethodId: string) => void;
    onEdit?: (paymentMethodId: string) => void;
    onDelete?: (paymentMethodId: string) => void;
    defaultPaymentMethodId?: string;
}

// Componente para el icono de la tarjeta
function CardIcon({ brand }: { brand: string }) {
    switch (brand.toLowerCase()) {
        case 'visa':
            return (
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                </div>
            );
        case 'mastercard':
            return (
                <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                </div>
            );
        case 'amex':
        case 'american_express':
            return (
                <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AE</span>
                </div>
            );
        default:
            return <CreditCard className="w-6 h-6 text-muted-foreground" />;
    }
}

// Componente para una tarjeta individual
function PaymentMethodCard({ 
    paymentMethod, 
    isDefault, 
    onSetDefault, 
    onEdit, 
    onDelete 
}: {
    paymentMethod: PaymentMethod;
    isDefault: boolean;
    onSetDefault: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const { card, billing_details } = paymentMethod;
    const cardholderName = billing_details.name || 'No name provided';
    const expiry = `${card.exp_month.toString().padStart(2, '0')}/${card.exp_year.toString().slice(-2)}`;
    const fundingType = card.funding.charAt(0).toUpperCase() + card.funding.slice(1);

    return (
        <Card className={`relative transition-all duration-200 hover:shadow-md ${isDefault ? 'ring-2 ring-blue-500' : ''}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CardIcon brand={card.brand} />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    •••• •••• •••• {card.last4}
                                </span>
                                {isDefault && (
                                    <Badge variant="secondary" className="text-xs">
                                        <Star className="w-3 h-3 mr-1 fill-current" />
                                        Default
                                    </Badge>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                                {cardholderName} • {fundingType} • Expires {expiry}
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {!isDefault && (
                                <DropdownMenuItem onClick={onSetDefault}>
                                    <Star className="w-4 h-4 mr-2" />
                                    Set as default
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={onEdit}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={onDelete}
                                className="text-red-600 focus:text-red-600"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
}

export default function PaymentMethods({ 
    onSetDefault,
    onEdit,
    onDelete,
    defaultPaymentMethodId 
}: PaymentMethodsProps) {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPaymentMethods = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/payment/payment-methods', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || (() => {
                    switch (response.status) {
                        case 401:
                            return 'Your session has expired. Please log in again.';
                        case 500:
                            return 'Server error. Please try again in a few minutes.';
                        default:
                            return 'Failed to load payment methods. Please try again.';
                    }
                })();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setPaymentMethods(data.paymentMethods || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load payment methods';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const handleSetDefault = (paymentMethodId: string) => {
        onSetDefault?.(paymentMethodId);
        // Actualizar el estado local si es necesario
    };

    const handleEdit = (paymentMethodId: string) => {
        onEdit?.(paymentMethodId);
    };

    const handleDelete = (paymentMethodId: string) => {
        onDelete?.(paymentMethodId);
        // Remover del estado local después de confirmación
        setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
    };

    const handleRefresh = () => {
        fetchPaymentMethods();
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Saved Payment Methods
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Loading payment methods...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Saved Payment Methods
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{error}</span>
                        </div>
                        <Button onClick={handleRefresh} variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Saved Payment Methods
                        {paymentMethods.length > 0 && (
                            <Badge variant="outline" className="ml-2">
                                {paymentMethods.length}
                            </Badge>
                        )}
                    </CardTitle>
                    <Button onClick={handleRefresh} variant="ghost" size="sm">
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {paymentMethods.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">No payment methods saved</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Add a payment method above to get started
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {paymentMethods.map((paymentMethod) => (
                            <PaymentMethodCard
                                key={paymentMethod.id}
                                paymentMethod={paymentMethod}
                                isDefault={paymentMethod.id === defaultPaymentMethodId}
                                onSetDefault={() => handleSetDefault(paymentMethod.id)}
                                onEdit={() => handleEdit(paymentMethod.id)}
                                onDelete={() => handleDelete(paymentMethod.id)}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}