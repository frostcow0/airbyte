import { useQuery } from "react-query";

import { useDefaultRequestMiddlewares } from "services/useDefaultRequestMiddlewares";
import { useCurrentWorkspaceId } from "services/workspaces/WorkspacesService";

import { webBackendGetFreeConnectorProgramInfoForWorkspace } from "../lib/domain/freeConnectorProgram/api";
import { StripeCheckoutSessionCreate } from "../lib/domain/stripe";
import { useConfig } from "./config";
import { useStripeCheckout } from "./stripe/StripeService";

type StripeSetupCheckoutSessionCreate = Omit<StripeCheckoutSessionCreate, "stripeMode" | "quantity" | "workspaceId">;

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
  const workspaceId = useCurrentWorkspaceId();
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
  } = useStripeCheckout();
  return {
    mutate: (params: StripeSetupCheckoutSessionCreate) =>
      genericMutate({ ...params, stripeMode: "setup", workspaceId }),
    mutateAsync: (params: StripeSetupCheckoutSessionCreate) =>
      genericMutateAsync({ ...params, stripeMode: "setup", workspaceId }),
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
