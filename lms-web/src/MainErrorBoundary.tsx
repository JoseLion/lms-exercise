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
        return alert("Unathorized!");
      }

      if (error.response.status === UNPROCESSABLE_ENTITY) {
        if (Array.isArray(error.response.data)) {
          const message = error.response.data
            .map(String)
            .join("\n");

          return alert(message);
        }

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
