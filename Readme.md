### What
jQuery plugin to fire an event on a trackpad flick. Trackpads can have inertial scrolling that fires false positives - for example, scrolling on a slideshow can trigger multiple events if the scroll takes a long time to come back down to 0.

### How
Include jQuery first, then include jquery.onFlick.js.

```html
<script src="path/to/jquery"></script>
<script src="path/to/onFlick"></script>
```

Then, pick your level of customization:

#### Default Options

`$('.selector').onFlick(function(e) { console.log('Scroll event: ' + e); });`

Often called on `window` - for example:

`$(window).onFlick( /* options... */ );`

Also accepts any optional parameters (see below for details):

`$('.selector').onFlick( callback, debounce, threshold );`

#### In-Depth Options

```javascript
$('.selector').onFlick({
    callback: function(e) { console.log('onFlick event fired'); }, // Function to call when flick event is triggered. Accepts one variable containing the wheel event data.
    debounce: 10, // How long, in ms, to wait after the callback is invoked before it can be invoked again
    threshold: 'normal' // How fast the user needs to be scrolling in order to trigger the callback. Accepts 'high', 'normal' (default), and 'low' (all referring to the scroll speed necessary to trigger the event), as well as a number (referring to the average scroll delta that needs to be passed to trigger the event).
});
```

=========

Version 1.0
