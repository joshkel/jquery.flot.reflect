/**Flot plugin for reflecting ("enveloping") data
 *
 * Copyright (c) 2016 Windrock, Inc.
 * Licensed under the MIT License.
 *
 * - Reflects data by extending data series with mirrored X and/or Y values.
 * - Reflected portion is appended to current data so Flot won't treat the reflection as another line.
 */
(function($) {
    var options = {
        data: {
            reflectX: false,
            reflectY: false
        }
    };

    function reflectDataY(data, pointsize, reflectX, reflectY) {
        var i,
            loopTo = data.length;
        for (i = 0; i < pointsize; i++) {
            data.push(null);
        }
        for (i = 0; i < loopTo; i++) {
            if ((i % pointsize == 0 && reflectX) || (i % pointsize == 1 && reflectY)) {
                data.push(data[i] * -1.0);
            } else {
                data.push(data[i]);
            }
        }
    }

    function init(plot) {
        plot.hooks.processDatapoints.push(function(plot, series, datapoints) {
            if (series.reflectX || series.reflectY) {
                reflectDataY(datapoints.points, datapoints.pointsize, series.reflectX, series.reflectY);
            }
        });
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'reflect',
        version: '1.1'
    });

})(jQuery);
