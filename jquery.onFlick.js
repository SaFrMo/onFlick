// onFlick
// Sander Moolin, John Robson
// v1.0
// http://funkhaus.us/
// MIT license

(function($) {

	$.fn.onFlick = function(options, debounce, manualThreshold) {

		// Default callback
		var cb = function(e) {
			console.log('onFlick event fired');
		}
		// Save callback if specified
		if (typeof options == 'function') {
			cb = options;
			options = null;
		}

		// Defaults
		var settings = $.extend({
			callback: cb,
			debounce: debounce || 10,
			threshold: manualThreshold || 'normal'
		}, options);

		// The 10 most recent wheel delta values
		// (the least interesting Buzzfeed article ever)
		var samples = [];
		// If locked, don't invoke the callback
		var locked = false;

		// Find the average difference in the delta values of our samples
		function getAverage() {
			var total = 0;
			// Start at 1 so that we can look at the previous sample in each iteration
			for (var i = 1; i < samples.length; i++) {
				total += samples[i - 1] - samples[i];
			}
			return total / samples.length;
		}

		return this.each(function() {
			// Average delta threshold - below this will not trigger callback
			// The higher the threshold, the harder the event is to trigger
			var threshold = 10;
			if (settings.threshold == 'high') {
				threshold = 20;
			} else if (settings.threshold == 'low') {
				threshold = 5;
			} else if (typeof settings.threshold == 'number') {
				threshold = settings.threshold;
			}

			$(this).on('wheel', function(e) {
				// Save the wheel delta
				var delta = e.originalEvent.deltaY;
				// Keep samples to a manageable length
				if (samples.length > 10) samples.shift();
				// Save latest delta value
				samples.push(delta);
				// Find the average delta of our sample set
				var avg = getAverage();
				// Are we scrolling fast enough (and have we waited long enough)
				// to be able to invoke the callback?
				if (Math.abs(avg) > threshold && !locked) {
					// Invoke the callback - pass the event data
					settings.callback(e);
					// Prevent the callback from firing again until `debounce` ms have passed
					locked = true;
					setTimeout(function() {
						locked = false;
					}, settings.debounce);
				}
			});
		});
	}
}(jQuery));