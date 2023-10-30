import { UNAUTHORIZED, UNPROCESSABLE_ENTITY } from "http-status";
import { ReactElement, memo, useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import isEqual from "react-fast-compare";
import { Axios } from "rxjs-axios";

import { ErrorFallback } from "./components/common/ErrorFallback";

interface MainErrorBoundaryProps {
  children: ReactElement;
}

export const MainErrorBoundary = memo((props: MainErrorBoundaryProps): ReactElement => {

  const errorHandler = useCallback(({ error }: ErrorEvent): void => {
    if (Axios.isAxiosError(error)) {
      if (!error.response) {
        return alert("Unable to reach network!");
      }

      if (error.response.status === UNAUTHORIZED) {
        const message = error.response.data;

        return alert(typeof message === "string" && message ? message : "Unauthorized!");
      }

      if (error.response.status === UNPROCESSABLE_ENTITY) {
        return alert(String(error.response.data));
      }

      return alert(String(error.response?.data) || error.message);
    }

    return alert("Unexpected error");
  }, []);

  useEffect(() => {
    window.addEventListener("error", errorHandler);

    return () => window.removeEventListener("error", errorHandler);
  }, [errorHandler]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {props.children}
    </ErrorBoundary>
  );
}, isEqual);
