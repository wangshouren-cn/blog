import { ThrottleOptions } from "./useThrottle";


export default function throttle(callback: Function, options: ThrottleOptions = {}) {

  const { delay = 200 } = options;

  let lastCallTime = 0;

  return (...args: any[]) => {

    const now = Date.now();

    if (now - lastCallTime > delay) {
      callback(...args);
      lastCallTime = now;
    }

  }
}