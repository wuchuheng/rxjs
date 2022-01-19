import SubscriptionService from '../index';

class SubscriptionScheduler {
  public static fooObserve = new SubscriptionService<string>('');
}

test('Test Subscription', () => {
  const patchData: string = 'hello';
  SubscriptionScheduler.fooObserve.subscription((value) => {
    expect(value).toBe(patchData);
  });
  SubscriptionScheduler.fooObserve.next(patchData);
});
