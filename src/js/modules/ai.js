var app = app || {};

app.ai = (function () {
    'use strict';

    // Public properties
    return {
        // Chooses a value from the passed ones
        // It uses a simple random algorithm
        play: function (values) {
            return values[Math.floor(Math.random() * values.length)];
        }
    };
}());