var app = app || {};

app.events = (function () {
    'use strict';

    var eventsMap = {}; // The events map. It stores events and registered callbacks.
                        // Each event is an array that contains its handlers.

    // Public properties
    return {
        // Adds an event and a handler to the map
        on: function (eventName, handler) {
            var eventObject;    // Event object (item of the events map)

            // Get the passed event
            eventObject = eventsMap[eventName];

            // Add the event to the events map if it doesn't exist yet
            if (typeof eventObject === 'undefined') {
                eventsMap[eventName] = [];
                eventObject = eventsMap[eventName];
            }

            // Push the handler into the map
            eventObject.push(handler);
        },

        // Invoke all handlers of the event registered in the events map
        // The handlers will be invoked with the arguments passed in the second parameter (that is an array)
        emit: function (eventName, args) {
            var self = this,    // Own reference
                eventObject,    // Event object (item of the events map)
                j,              // Loop counter
                len;            // Loop length

            // Get the passed event
            eventObject = eventsMap[eventName];

            // If the event doesn't exist in the map, exit
            if (typeof eventObject === 'undefined') {
                return;
            }

            // If no arguments were passed, just create an empty array
            if (typeof args === 'undefined' || args === null) {
                args = [];
            }

            // Invoke all registered handlers
            len = eventObject.length;
            for (j = 0; j < len; j += 1) {
                // Invoke handler, passing passed arguments
                eventObject[j].apply(self, args);
            }
        }
    };
}());