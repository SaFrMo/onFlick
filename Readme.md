### What
Fire an event on a trackpad or mousewheel flick. Scroll values on trackpads can have inertia and take a long time to come back down to 0 - this plugin smooths out those false positive scroll events. [Demo](http://codepen.io/SaFrMo/pen/BRWrbw?editors=1010)

### How

HTML:

```html
<script src="path/to/onFlick"></script>
```

JS:

```js
new OnFlick( callback, options );
```

Parameters:
* `callback` - Function to run when flick event is triggered. Accepts the mousewheel event as an argument.
* `options` - Optional object. Outlined below.

#### Options

```javascript
{
    debounce: 600, // How long, in ms, to wait after the callback is invoked before it can be invoked again
    threshold: 10 // How fast the user needs to be scrolling in order to trigger the callback. Accepts a number referring to the average scroll delta necessary to trigger the event.
});
```

### How it works
The plugin keeps a running tally of the last 10 scroll deltas. Each frame that the mousewheel event is called, it:
* trims the oldest delta value if necessary
* saves the latest delta value
* averages them together
* tests if the average is above the `threshold` defined in the options.

This is more effective than a debounce function because debounce limits the frequency of a callback, not the conditions for triggering that callback. OnFlick combines the hard time limit of a debounce with an effort to make sure the user is actively moving on the page, not just running off of the inertia of an old trackpad event.

=========

Version 2.0
