var app = app || {};

app.utils = (function () {
    'use strict';

    // Public properties
    return {
        // Adds to the passed DOM element the passed CSS class
        addClass: function (element, className) {
            var self = this;    // Own reference

            // Check that the element hasn't the class yet
            if (!self.hasClass(element, className)) {
                // Add the class
                element.className = (element.className.trim() + ' ' + className).trim();
            }
        },

        // Adds an event handler in a cross-browser compatible way (Conditional Advance Loading) 
        addHandler: (function () {
            // Check if the method addEventListener is defined in current browser
            if (typeof document.body.addEventListener !== 'undefined') {
                // If addEventListener is defined, use it
                return function (target, eventName, handler) {
                    target.addEventListener(eventName, handler);
                };
            } else {
                // If addEventListener isn't defined, use attachEvent
                return function (target, eventName, handler) {
                    target.attachEvent('on' + eventName, handler);
                };
            }
        }()),

        // Checks if the passed DOM element has the passed CSS class
        hasClass: function (element, className) {
            return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > (-1);
        },

        // Removes from the passed DOM element the passed CSS class
        removeClass: function (element, className) {
            var self = this,    // Own reference
                classes,
                i,
                newClassName = '';

            // Check that the element has the class
            if (self.hasClass(element, className)) {
                // Concatenate all classes name, excluding the one to remove
                classes = element.className.split(' ');
                for (i = 0; i < classes.length; i += 1) {
                    if(classes[i] !== className) {
                        newClassName += classes[i] + ' ';
                    }
                }

                // Set the new class to the element
                element.className = newClassName.trim();
            }
        },

        // Removes an event handler in a cross-browser compatible way (Conditional Advance Loading) 
        removeHandler: (function () {
            // Check if the method removeEventListener is defined in current browser
            if (typeof document.body.removeEventListener !== 'undefined') {
                // If removeEventListener is defined, use it
                return function (target, eventName, handler) {
                    target.removeEventListener(eventName, handler);
                };
            } else {
                // If removeEventListener isn't defined, use detachEvent
                return function (target, eventName, handler) {
                    target.detachEvent('on' + eventName, handler);
                };
            }
        }())
    };
}());