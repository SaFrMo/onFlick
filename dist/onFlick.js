'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(callback, options) {
        _classCallCheck(this, _class);

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
        window.addEventListener('mousewheel', function (evt) {
            this.flickHandler(evt);
        }.bind(this), false);
        // Firefox
        window.addEventListener('DOMMouseScroll', function (evt) {
            this.flickHandler(evt);
        }.bind(this), false);
    }

    // Find the average difference in the delta values of our samples


    _createClass(_class, [{
        key: 'getAverage',
        value: function getAverage() {
            var total = 0;
            // Start at 1 so that we can look at the previous sample in each iteration
            for (var i = 1; i < this.samples.length; i++) {
                total += this.samples[i - 1] - this.samples[i];
            }
            return total / this.samples.length;
        }
    }, {
        key: 'flickHandler',
        value: function flickHandler(evt) {
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
                setTimeout(function () {
                    this.locked = false;
                }.bind(this), this.debounce);
            }
        }
    }]);

    return _class;
}();

exports.default = _class;