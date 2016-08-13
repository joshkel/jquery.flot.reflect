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
        for (i = data.length - 1; i >= 0; i--) {
            data.push([data[i][0], data[i][1] * -1.0]);
        }
    }

    function reflectAllData(all_data) {
        var i;
        for (i = 0; i < all_data.length; i++) {
            if (all_data[i].reflectY) {
                reflectDataY(all_data[i].data);
            }
        }
        return all_data;
    }

    function init(plot) {
        plot.hooks.draw.push(function(plot, newCtx) {
            plot.setData(reflectAllData(plot.getData()));
        });
    }

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'reflect',
        version: '1.0'
    });

})(jQuery);
