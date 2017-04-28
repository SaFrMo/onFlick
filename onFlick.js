class OnFlick {

    constructor( callback, options ){

        this.callback = callback;
        this.options = options || {};

        // shortcuts to options
        this.debounce = this.options.debounce === null ? 10 : this.options.debounce;
        this.threshold = this.options.threshold || 10;

        // internal values
        this.samples = [];
        this.locked = false;

        // prep event listener for IE9, Chrome, Safari, Opera
        // see http://stackoverflow.com/questions/14926366/mousewheel-event-in-modern-browsers
        window.addEventListener("mousewheel", function(evt){ this.flickHandler(evt); }.bind(this), false);
        // Firefox
        window.addEventListener("DOMMouseScroll", function(evt){ this.flickHandler(evt); }.bind(this), false);

    }

    // Find the average difference in the delta values of our samples
    getAverage() {
        var total = 0;
        // Start at 1 so that we can look at the previous sample in each iteration
        for (var i = 1; i < this.samples.length; i++) {
            total += this.samples[i - 1] - this.samples[i];
        }
        return total / this.samples.length;
    }

    flickHandler(evt){
        // Save the wheel delta
        var delta = evt.deltaY;
        // Keep samples to a manageable length
        if (this.samples.length > 10) this.samples.shift();
        // Save latest delta value
        this.samples.push(delta);
        // Find the average delta of our sample set
        var avg = this.getAverage();
        // Are we scrolling fast enough (and have we waited long enough)
        // to be able to invoke the callback?
        if (Math.abs(avg) > this.threshold && !this.locked) {
            // Invoke the callback - pass the event data
            this.callback(evt);

            // Prevent the callback from firing again until `debounce` ms have passed
            this.locked = true;
            setTimeout(function() {
                this.locked = false;
            }.bind(this), this.debounce);
        }
    }
}

/**
 * Export function that supports AMD, CommonJS and Plain Browser.
 */
(function (root, factory){
    if (typeof exports !== 'undefined') {
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.OnFlick = factory;
    }
})(this, OnFlick);
