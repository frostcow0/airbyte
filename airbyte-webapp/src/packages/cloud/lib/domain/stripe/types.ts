type WorkspaceId = string;
type Credits = number;

// This may need to be rewritten if we can start generating _all_ cloud API client code
// from the openAPI spec, because the java code generator has no graceful way of handling
// union types. Until then, in return for having to hand-write them, we get to have nice things.
export type StripeCheckoutSessionCreate = StripePaymentCheckoutSessionCreate | StripeSetupCheckoutSessionCreate;

export interface StripePaymentCheckoutSessionCreate {
  workspaceId: WorkspaceId;
  /** The Airbyte URL that the user should be redirected to upon payment success */
  successUrl: string;
  /** The Airbyte URL that the user should be redirected to upon payment cancellation */
  cancelUrl: string;
  /** For payment mode only. Optional quantity of credits to use in the Stripe Checkout Session (can still be adjusted by the user). If unspecified, a default quantity will be set */
  quantity?: Credits;
  /** Optional 'mode' parameter passed to the Stripe Checkout Session API. If unspecified, default to 'payment' */
  stripeMode: "payment";
}

export interface StripeSetupCheckoutSessionCreate {
  workspaceId: WorkspaceId;
  /** The Airbyte URL that the user should be redirected to upon payment success */
  successUrl: string;
  /** The Airbyte URL that the user should be redirected to upon payment cancellation */
  cancelUrl: string;
  /** Optional 'mode' parameter passed to the Stripe Checkout Session API. If unspecified, default to 'payment' */
  stripeMode: "setup";
}

export interface StripeCheckoutSessionRead {
  stripeUrl: string;
}
