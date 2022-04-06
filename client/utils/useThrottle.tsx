import React, { useCallback } from "react";

export interface ThrottleOptions {
  delay?: number
}

function useThrottle(callback: Function, deps: React.DependencyList, options: ThrottleOptions = {}) {

  const { delay = 200 } = options;

  const cb = useCallback(
    (() => {

      let lastCallTime = 0;

      return (...args) => {

        const now = Date.now();

        if (now - lastCallTime > delay) {
          callback(...args);
          lastCallTime = now;
        }

      }
    })(),
    deps,
  );

  return cb
}

export default useThrottle