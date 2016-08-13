/**Flot plugin for reflecting ("enveloping") data
 *
 * Copyright (c) 2016 Windrock, Inc.
 * Licensed under the MIT License.
 *
 * - Reflects data.  Currently, only reflecting (negating) the Y value is supported.
 * - Reflected portion is appended to current data so Flot won't treat the reflection as another line.
 * - Since it is one line, the reflected portion has to start from the end; otherwise Flot would draw
 *     a line across the data to link the end of the line and the beginning of the reflection.
 *     Note that this line between the original data and its reflection is still drawn on the
 *     right side of the screen, but it is in the least noticeable/obtrusive way until
 *     a better solution can be found.
 */
(function($) {
    var options = {
        data: {
            reflectY: false
        }
    };

    function reflectDataY(data) {
        var i;
        // TODO: Flot docs say to look at datapoints.pointsize, instead of
        // assuming 2, but this works for the plot formats we use.
        for (i = data.length - 2; i >= 0; i -= 2) {
            data.push(data[i]);
            data.push(data[i + 1] * -1.0);
        }
    }

    function init(plot) {
        plot.hooks.processDatapoints.push(function(plot, series, datapoints) {
            if (series.reflectY) {
                reflectDataY(datapoints.points);
            }
        });
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'reflect',
        version: '1.0'
    });

})(jQuery);
