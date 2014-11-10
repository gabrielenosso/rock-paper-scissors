var app = app || {};

app.ui = (function (game, animations) {
    'use strict';
    
    var endMatchMenu,           // Menu shown when a match ends
        gameValues,             // Available game values
        mainMenu,               // Main menu
        player1Hand,            // Player 1 hand image (img DOM element)
        player1HandContainer,   // Player 1 hand container (div DOM element)
        player2Hand,            // Player 2 hand image (img DOM element)
        player2HandContainer,   // Player 2 hand container (div DOM element)
        player1Score,           // Player 1 score (div DOM element)
        player2Score,           // Player 2 score (div DOM element)
        resultMessage,          // Result message - DOM element
        valuesMenu;             // Menu (container) for values buttons

    // Get available game values
    gameValues = game.getGameValues();

    // Get DOM elements
    endMatchMenu = document.getElementById('rps-endmatch-menu');
    mainMenu = document.getElementById('rps-main-menu');
    player1Hand = document.getElementById('rps-player1-hand');
    player1HandContainer = document.getElementById('rps-player1-hand-container');
    player2Hand = document.getElementById('rps-player2-hand');
    player2HandContainer = document.getElementById('rps-player2-hand-container');
    player1Score = document.getElementById('rps-player1-score');
    player2Score = document.getElementById('rps-player2-score');
    resultMessage = document.getElementById('rps-result');
    valuesMenu = document.getElementById('rps-values-container');

    // Public properties
    return {
        // Returns the end match menu (DOM element)
        getEndMatchMenu: function () {
            return endMatchMenu;
        },

        // Returns the main menu (DOM element)
        getMainMenu: function () {
            return mainMenu;
        },

        // Returns player 1 hand container (DOM element)
        getPlayer1Hand: function () {
            return player1HandContainer;
        },

        // Returns player 2 hand container (DOM element)
        getPlayer2Hand: function () {
            return player2HandContainer;
        },

        // Returns the result message
        getResultMessage: function (result) {
            return resultMessage;
        },

        // Returns the values menu (DOM element)
        getValuesMenu: function () {
            return valuesMenu;
        },

        // Load images and builds the ID: adds the main container to the DOM and the other UI components to it
        init: function () {
            var self = this,   // Own reference
                image,         // img DOM element for the current button (used in loop)
                j,             // Loop counter
                len;           // Loop length

            // Sets the hands images in rest position
            self.resetHands();

            // Load game values images
            len = gameValues.length;
            for (j = 0; j < len; j += 1) {
                // Create an off-screen image element
                image = document.createElement('img');
                image.src = 'img/' + gameValues[j] + '.png';
            }
        },

        // Resets hands images
        resetHands: function () {
            // Set the rest image to both hands
            player1Hand.src = 'img/rest.png';
            player2Hand.src = 'img/rest.png';
        },

        // Update hands images with passed values
        updateHands: function (value1, value2) {
            // For each hand set the image correspondent to passed value
            player1Hand.src = 'img/' + value1 + '.png';
            player2Hand.src = 'img/' + value2 + '.png';
        },

        // Updates the result message
        updateResultMessage: function (result) {
            // Check result and update result message content
            if (result > 0) {
                resultMessage.innerHTML = 'P1 win!';
            } else if (result < 0) {
                resultMessage.innerHTML = 'P2 win!';
            } else {
                resultMessage.innerHTML = 'Draw!';
            }
        },

        // Updates players score
        updateScore: function () {
            var score = game.getScore();

            // Update scores content
            player1Score.innerHTML = score[0];
            player2Score.innerHTML = score[1];
        }
    };
}(app.game, app.animations));