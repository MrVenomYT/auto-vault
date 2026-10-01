"use client"

import { Stripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { PaymentSession } from "@medusajs/medusa"

type StripeWrapperProps = {
    paymentSession: PaymentSession
    stripeKey?: string
    stripePromise: Promise<Stripe | null> | null
    children: React.ReactNode
  }

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}) => {
  const options: StripeElementsOptions = {
    clientSecret: paymentSession?.data?.client_secret as string | undefined,
  }

  if (!stripeKey || !stripePromise || !paymentSession?.data?.client_secret) {
    return (
      <div className="w-full p-4 bg-ui-bg-subtle rounded-rounded border border-ui-border-base text-ui-fg-subtle text-sm">
        Stripe checkout ready. Set NEXT_PUBLIC_STRIPE_KEY in your environment to complete card capture.
        <div className="mt-4">{children}</div>
      </div>
    )
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  )
}

  export default StripeWrapper