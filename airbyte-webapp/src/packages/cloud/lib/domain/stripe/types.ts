type WorkspaceId = string;
type Credits = number;

export interface StripeCheckoutSessionCreate {
  workspaceId: WorkspaceId;
  /** The Airbyte URL that the user should be redirected to upon payment success */
  successUrl: string;
  /** The Airbyte URL that the user should be redirected to upon payment cancellation */
  cancelUrl: string;
  /** For payment mode only. Optional quantity of credits to use in the Stripe Checkout Session (can still be adjusted by the user). If unspecified, a default quantity will be set */
  quantity?: Credits;
  /** Optional 'mode' parameter passed to the Stripe Checkout Session API. If unspecified, default to 'payment' */
  stripeMode?: StripeCheckoutSessionCreateStripeMode;
}

/**
 * Optional 'mode' parameter passed to the Stripe Checkout Session API. If unspecified, default to 'payment'
 */
export type StripeCheckoutSessionCreateStripeMode =
  typeof StripeCheckoutSessionCreateStripeMode[keyof typeof StripeCheckoutSessionCreateStripeMode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StripeCheckoutSessionCreateStripeMode = {
  payment: "payment",
  setup: "setup",
} as const;

export interface StripeCheckoutSessionRead {
  stripeUrl: string;
}
