import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AddPaymentMethod from './components/add-payment-method';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payment Management',
        href: '/payment',
    },
];

interface PaymentIndexProps {
    stripeKey: string;
}

export default function PaymentIndex({ stripeKey }: PaymentIndexProps) {
    const handlePaymentSuccess = () => {
        console.log('Payment method added successfully!');
        // Aquí puedes agregar lógica para refrescar la página o mostrar un mensaje de éxito
    };

    const handlePaymentError = (error: string) => {
        console.error('Payment error:', error);
        // Aquí puedes agregar lógica para mostrar el error al usuario
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Payments" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {/* Header Section */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">Payment Management</h1>
                    <p className="text-muted-foreground">
                        Manage your payment methods and billing information securely.
                    </p>
                </div>

                {/* Add Payment Method Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Info Section */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-foreground">Accepted Payment Methods</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Credit Cards (Visa, MasterCard, American Express)
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Debit Cards
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-foreground">Important Information</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    All payments are processed securely via Stripe
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Your card information is never stored on our servers
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    You can manage your payment methods at any time
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Payment Form Section */}
                    <div>
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                            {/* AddPaymentMethodForm component */}
                            <AddPaymentMethod
                                stripeKey={stripeKey}
                            />
                        </div>
                    </div>
                </div>

                {/* Saved Payment Methods Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-foreground">Saved Payment Methods</h2>
                        <p className="text-sm text-muted-foreground">
                            View and manage your saved payment methods.
                            {/* Ver los metodos de pago */}
                        </p>
                    </div>
                    <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">No payment methods saved</p>
                                <p className="text-xs text-muted-foreground">Add a payment method above to get started</p>
                            </div>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10 -z-10" />
                    </div>
                </div>

                {/* Billing History Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-foreground">Billing History</h2>
                        <p className="text-sm text-muted-foreground">
                            View your transaction history and download invoices.
                        </p>
                    </div>
                    <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">No billing history</p>
                                <p className="text-xs text-muted-foreground">Your transaction history will appear here</p>
                            </div>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10 -z-10" />
                    </div>
                </div>

                {/* Payment Settings Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-foreground">Payment Settings</h2>
                        <p className="text-sm text-muted-foreground">
                            Configure your payment preferences and billing information.
                        </p>
                    </div>
                    <div className="relative min-h-[150px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Settings coming soon</p>
                                <p className="text-xs text-muted-foreground">Payment preferences and billing settings</p>
                            </div>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10 -z-10" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}