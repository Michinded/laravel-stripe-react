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
        // Optional: show success notification or other action
    };

    const handlePaymentError = (error: string) => {
        // Optional: show error notification or handle error
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Management" />
            <div className="container mx-auto p-4 space-y-8 max-w-7xl">
                {/* Header Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your payment methods and billing information securely.
                    </p>
                </div>

                {/* Add Payment Method Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Info Section - Se muestra arriba en mobile */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Accepted Payment Methods</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm font-medium">Credit Cards (Visa, MasterCard, American Express)</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm font-medium">Debit Cards</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Security Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium">Secure Processing</p>
                                        <p className="text-xs text-muted-foreground mt-1">All payments are processed securely via Stripe</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium">Data Protection</p>
                                        <p className="text-xs text-muted-foreground mt-1">Your card information is never stored on our servers</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium">Full Control</p>
                                        <p className="text-xs text-muted-foreground mt-1">You can manage your payment methods at any time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form Section */}
                    <div className="order-1 lg:order-2">
                        <AddPaymentMethod
                            stripeKey={stripeKey}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                        />
                    </div>
                </div>

                {/* Saved Payment Methods Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Saved Payment Methods</h2>
                        <p className="text-muted-foreground">
                            View and manage your saved payment methods.
                        </p>
                    </div>
                    <div className="relative min-h-[200px] overflow-hidden rounded-xl border bg-card p-6">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">No payment methods saved</p>
                                <p className="text-xs text-muted-foreground">Add a payment method above to get started</p>
                            </div>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10 -z-10" />
                    </div>
                </div>

                {/* Billing History Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Billing History</h2>
                        <p className="text-muted-foreground">
                            View your transaction history and download invoices.
                        </p>
                    </div>
                    <div className="relative min-h-[200px] overflow-hidden rounded-xl border bg-card p-6">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">No billing history</p>
                                <p className="text-xs text-muted-foreground">Your transaction history will appear here</p>
                            </div>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10 -z-10" />
                    </div>
                </div>

                {/* Payment Settings Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Payment Settings</h2>
                        <p className="text-muted-foreground">
                            Configure your payment preferences and billing information.
                        </p>
                    </div>
                    <div className="relative min-h-[150px] overflow-hidden rounded-xl border bg-card p-6">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Settings coming soon</p>
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