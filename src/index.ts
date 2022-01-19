import { useEffect, useState } from 'react';

type SubscriptionHandler = number;

interface SubscriptionServiceInterface<T> {
  value: T;

  next(patchData: T): boolean;

  subscription(patchDataCallback: (patchData: T) => void): SubscriptionHandler;

  unSubscription(subscriptionHandler: SubscriptionHandler): boolean;

  complete(): void;
}

export default class SubscriptionService<T> implements SubscriptionServiceInterface<T> {
  history: { time: Date; data: T }[] = [];
  private subscriptions: Map<number, (patchData: T) => void> = new Map<number, (patchData: T) => void>();
  value: T;

  isComplete: boolean = false;

  constructor(value: T) {
    this.value = value;
  }

  next(patchData: T): boolean {
    if (this.isComplete) {
      return false;
    }
    this.history = [...this.history, { time: new Date(), data: this.value }];
    this.value = patchData;
    this.subscriptions.forEach((callback) => callback(this.value));

    return true;
  }

  subscription(patchDataCallback: (patchData: T) => void): SubscriptionHandler {
    const subscriptionHandler = this.subscriptions.size + 1;
    this.subscriptions.set(subscriptionHandler, patchDataCallback);

    return subscriptionHandler;
  }

  unSubscription(subscriptionHandler: SubscriptionHandler): boolean {
    return !this.subscriptions.has(subscriptionHandler) ? false : this.subscriptions.delete(subscriptionHandler);
  }

  complete(): void {
    this.isComplete = true;
    this.subscriptions.clear();
  }
}

export const useObserve = <T>(observe: SubscriptionService<T>): [T, SubscriptionService<T>] => {
  const [value, setValue] = useState<T>(observe.value);
  useEffect(() => {
    const subscriptionHandler = observe.subscription((newValue) => setValue(newValue));

    return () => {
      observe.unSubscription(subscriptionHandler);
    };
  }, []);

  return [value, observe];
};
