# unresponsive.js

Tired of building responsive layouts? Fed up with media queries? Sick of testing on a bunch of devices? Wish your HTML content could just stretch to fill any window or IFrame?

Unresponsive, the one size fits all tool for unresponsive HTML5 layouts has got your back! 

To use it just include unresponsive.js and call Stage.init after DOM load.

```
    <script type="text/javascript" src="unresponsive.js"></script>
    <script type="text/javascript">
        window.onload = function() {
            Stage.init(543, 234, 'showAll');
        };
    </script>
    ...
    <body>
        HTML content designed for a 543x234 resolution.
    </body>
    ...
```

`Stage.init()` takes `width`, `height`, and Flash-style `scaleMode` and `align` arguments. See the [demo](http://zozuar.org/unresponsive.js/interactive-demo.html) for details.

## Browser compatibility

Doesn't work on IE8 or lower.
