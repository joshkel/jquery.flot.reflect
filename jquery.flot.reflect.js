/**Flot plugin for reflecting ("enveloping") data
 *
 * Copyright (c) 2016 Windrock, Inc.
 * Licensed under the MIT License.
 *
 * - Reflects data.  Currently, only reflecting (negating) the Y value is supported.
 * - Reflected portion is appended to current data so Flot won't treat the reflection as another line.
 */
(function($) {
    var options = {
        data: {
            reflectY: false
        }
    };

    function reflectDataY(data) {
        var i,
            loopTo = data.length;
        // TODO: Flot docs say to look at datapoints.pointsize, instead of
        // assuming 2, but this works for the plot formats we use.
        data.push(null);
        data.push(null);
        for (i = 0; i < loopTo; i +=2 ) {
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
