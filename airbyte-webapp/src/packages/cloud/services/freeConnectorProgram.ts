import { useQuery } from "react-query";

import { useDefaultRequestMiddlewares } from "services/useDefaultRequestMiddlewares";
import { useCurrentWorkspaceId } from "services/workspaces/WorkspacesService";

import { webBackendGetFreeConnectorProgramInfoForWorkspace } from "../lib/domain/freeConnectorProgram/api";
import { StripeCheckoutSessionCreate } from "../lib/domain/stripe";
import { useConfig } from "./config";
import { useStripeCheckout } from "./stripe/StripeService";

export const useFreeConnectorProgramInfo = () => {
  const workspaceId = useCurrentWorkspaceId();
  const { cloudApiUrl } = useConfig();
  const config = { apiUrl: cloudApiUrl };
  const middlewares = useDefaultRequestMiddlewares();
  const requestOptions = { config, middlewares };

  return useQuery(["freeConnectorProgramInfo", workspaceId], () =>
    webBackendGetFreeConnectorProgramInfoForWorkspace({ workspaceId }, requestOptions)
  );
};

export const useFreeConnectorEnrollmentGenerator = () => {
  const createCheckoutMutation = useStripeCheckout();
  const {
    mutateAsync: genericMutateAsync,
    mutate: genericMutate,
    status,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    data,
    error,
    reset,
  } = createCheckoutMutation;
  return {
    mutate: (params: Omit<StripeCheckoutSessionCreate, "stripeMode" | "quantity">) =>
      genericMutate({ ...params, stripeMode: "setup" }),
    mutateAsync: (params: Omit<StripeCheckoutSessionCreate, "stripeMode" | "quantity">) =>
      genericMutateAsync({ ...params, stripeMode: "setup" }),
    status,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    error,
    data,
    reset,
  };
};
