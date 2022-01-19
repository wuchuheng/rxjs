<h1 align="center">Reactive extension for javascript.</h1>

## Description
This is a library for communication between components, similar to redux, but it is simpler and easier to use.

## Installing

```shell
$ npm i @wuchuheng/rxjs
```

## Usage

### step1 declare Scheduler for communication between components
``` typescript
import SubscriptionService from "@wuchuheng/rxjs";

// This is a scheduler where all the subscribers will be stored
class Scheduler {
    public static chatGroupObserve = new SubscriptionService<string>('');
}

```

### step2 usage directly in components

``` typescript 
import {useObserve} from "@wuchuheng/rxjs";

const componentA = () => {
    const [message, dispatcher] = useObserve(Scheduler.chatGroupObserve); 
    // a new message will be dispatch here. 
    return <input onchange={e => dispatcher.next(e.target.value)} />
}

const componentB = () => {
    // This hook will subscribe to the new message.
    const [message] = useObserve(Scheduler.chatGroupObserve);
    return <>{message}</>
}

```

You can contribute in one of three ways:

1. File bug reports using the [issue tracker](https://github.com/wuchuheng/rxjs/issues).
2. Answer questions or fix bugs on the [issue tracker](https://github.com/wuchuheng/rxjs/issues).
3. Contribute new features or update the wiki.

_The code contribution process is not very formal. You just need to make sure that you follow the PSR-0, PSR-1, and PSR-2 coding guidelines. Any new code contributions must be accompanied by unit tests where applicable._

## License

MIT