var app = app || {};

app.compatibility = (function (utils, ui, animations) {
    'use strict';


    // Funcion that tests if CSS3 animations are supported
    function isCSS3AnimSupported() {
        var supported = false, // Flag that says if CSS3 animations are supported
            browserPrefixes,   // Array that stores browser Prefixes
            j,                 // Loop counter
            len;               // Loop length

        // Set browser prefixes
        browserPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];

        // Check if the animation is supported (without any prefix)
        if (document.body.style.animationName !== undefined) {
            supported = true;
        }    

        // Check if animation is supported (using browsers prefixes)
        if (supported === false) {
            len = browserPrefixes.length;
            for (j = 0; j < len; j += 1) {
                if (typeof document.body.style[browserPrefixes[j] + 'AnimationName'] !== 'undefined') {
                    supported = true;
                    break;
                }
            }
        }

        return supported;
    }
    
    // Adds the trim method to Strings (in IE 8 it isn't defined)
    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, ''); 
        };
    }

    // If CSS3 animations aren't supported, overwrite some methods of the "animations" module
    if (!isCSS3AnimSupported()) {
        // Execute the count animation without CSS 3 animations
        app.animations.countAnimation = function (callback) {
            var self = this,              // Own reference
                countDuration,            // Total duration of count animation
                downAnimValue = '0',     // CSS value for count animation (when hand is down)
                halfCountSingleDuration,  // Duration of a single count animation (there are 3 counts)
                j = 0,                    // Recursion counter (used in animateHands())
                player1Hand,              // Player 1 hand (DOM element)
                player2Handm,             // Player 2 hand (DOM element)
                upAnimValue = '-20%';     // CSS value for count animation (when hand is up)

            // Function that animate hands (using other functions) and then invoke the callback
            function animateHands() {
                if (j % 2 === 0) {
                    setHandsUp();
                } else {
                    setHandsDown();
                }

                j += 1;

                // Check if the animation is ended
                if (j > 5) {
                    // If a callback was specified, invoke it
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    // Continue animation (Recursion)
                    setTimeout(animateHands, halfCountSingleDuration);
                }
            }

            // Function that sets the hands down
            function setHandsDown() {
                player1Hand.firstChild.style.marginTop = downAnimValue;
                player2Hand.firstChild.style.marginTop = downAnimValue;
            }

            // Function that sets the hands up
            function setHandsUp() {
                player1Hand.firstChild.style.marginTop = upAnimValue;
                player2Hand.firstChild.style.marginTop = upAnimValue;
            }

            // Get total count animation duration
            countDuration = animations.getCountDuration();

            // Calculate single count animation half duration
            halfCountSingleDuration = countDuration / 3 / 2;

            // Get players hands
            player1Hand = ui.getPlayer1Hand();
            player2Hand = ui.getPlayer2Hand();

            // Run the animation
            animateHands();
        };
    }

}(app.utils, app.ui, app.animations));


