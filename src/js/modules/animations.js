var app = app || {};

app.animations = (function (utils, ui) {
    'use strict';
    
    var countDuration = 2400, // Duration of the total count animation (Depends on CSS animations)
        fadeDuration = 300;   // Duration of a fading animation (Depends on CSS animations)

    // Public properties
    return {
        // Manages the count animation.
        // It invokes a callback, if specified, at the end of the animation
        countAnimation: function (callback) {
            var self = this,         // Own reference
                countAnimationClass, // CSS animation for count animation
                player1Hand,         // Player 1 hand (DOM element)
                player2Hand;         // Player 2 hand (DOM element)

            // Set count animation CSS class
            countAnimationClass = 'count-animation';

            // Get players hands
            player1Hand = ui.getPlayer1Hand();
            player2Hand = ui.getPlayer2Hand();

            // Add the CSS class to run the animation
            utils.addClass(player1Hand, countAnimationClass);
            utils.addClass(player2Hand, countAnimationClass);

            // Wait the end of the animation
            setTimeout(function () {
                // Remove hands animation class
                utils.removeClass(player1Hand, countAnimationClass);
                utils.removeClass(player2Hand, countAnimationClass);

                // If a callback was specified, invoke it
                if (typeof callback === 'function') {
                    callback();
                }
            }, countDuration);
        },

        // Returns the count animation duration
        getCountDuration: function () {
            return countDuration;
        },

        // Hides the passed DOM element
        hideElement: function (element) {
            element.style.display = 'none';
        },

        // Hides all menus
        hideMenus: function () {
            var self = this;  // Own reference

            // Hide main menu
            self.hideElement(ui.getMainMenu());

            // Hide end match menu
            self.hideElement(ui.getEndMatchMenu());
        },

        // Plays match animation
        playMatch: function (value1, value2, callback) {
            var self = this;         // Own reference

            // Hide values menu
            self.hideElement(ui.getValuesMenu());

            // Start the count animation
            self.countAnimation(function () {
                // Update hands with new values images
                ui.updateHands(value1, value2);

                // Show result message
                self.showResult();

                // If a callback was specified, invoke it
                if (typeof callback === 'function') {
                    callback();
                }
            });
        },

        // Reset UI state, hiding menus, result message and resetting hands
        resetState: function () {
            var self = this;    // Own reference

            // Hide all menus
            self.hideMenus();

            // Hide result message
            self.hideElement(ui.getResultMessage());

            // Reset hands state
            ui.resetHands();
        },

        // Shows the passed DOM element
        showElement: function (element) {
            element.style.display = 'block';
        },

        // Shows the end match menu
        showEndMatchMenu: function () {
            var self = this,    // Own reference
                endMatchMenu;

            // Hide all menus
            self.hideMenus();

            // Get the menu (DOM element) and show it
            endMatchMenu = ui.getEndMatchMenu();
            self.showElement(endMatchMenu);
        },

        // Shows main menu
        showMainMenu: function () {
            var self = this,    // Own reference
                mainMenu;

            // Reset UI state
            self.resetState();

            // Get the menu (DOM element) and show it
            mainMenu = ui.getMainMenu();
            self.showElement(mainMenu);
        },

        // Shows the match result
        showResult: function (winner) {
            var self = this,    // Own reference
                resultMessage;  // The result message - DOM element

            // Get result message and show it
            resultMessage = ui.getResultMessage();                        // Get result message (updated)
            resultMessage.className = '';                                 // Reset CSS classes
            utils.addClass(resultMessage, 'player' + winner + '-color');  // Add player color class
            self.showElement(resultMessage);                              // Show result message
        },

        // Show the menu to let the player select its value, hiding other UI components
        showValuesMenu: function () {
            var self = this;    // Own reference

            // Reset UI state
            self.resetState();

            // Show values menu
            self.showElement(ui.getValuesMenu());
        }
    };
}(app.utils, app.ui));