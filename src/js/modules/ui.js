var app = app || {};

app.ui = (function (game, animations) {
    'use strict';
    
    var button,                 // Current button - DOM element (used in loop)
        endMatchMenu,           // Menu shown when a match ends
        endMatchMenuOptions,    // End match menu options
        gameValues,             // Available game values
        j,                      // Loop counter
        len,                    // Loop length
        mainContainer,          // Main game container
        mainMenu,               // Main menu
        mainMenuOptions,        // Main menu options
        option,                 // Current option (used in loop)
        player1Hand,            // Player 1 hand (img DOM element)
        player2Hand,            // Player 2 hand (img DOM element)
        player1HandContainer,   // Player 1 hand container (div DOM element)
        player2HandContainer,   // Player 2 hand container (div DOM element)
        player1Score,           // Player 1 score (div DOM element)
        player2Score,           // Player 2 score (div DOM element)
        resultMessage,          // Result message - DOM element
        value,                  // Current game value (used in loop)
        valuesButtons,          // Buttons to let player choose a value
        valuesMenu;             // Menu (container) for values buttons

    // Creates and returns a new DOM element, with the details passed as parameters
    function createDOMElement(type, id, className) {
        var element;    // The new DOM element

        // Create the DOM element
        element = document.createElement(type);

        // Set id if specified
        if (typeof id === 'string' && id !== '') {
            element.id = id;
        }

        // Set CSS class if specified
        if (typeof className === 'string' && className !== '') {
            element.className = className;
        }

        return element;
    }

    // Creates DOM elements from an array of options (with properties "id" and "title") passed as parameter
    function createDOMMenu(options) {
        var j,                      // Loop counter
            len,                    // Loop length
            option;                 // Current option (used in loop)

        len = options.length;
        for (j = 0; j < len; j += 1) {
            option = options[j]; // Get current option

            // Create DOM element for current option
            button = createDOMElement('div', null, 'rps-menu-button');  // Create a <div> DOM element
            button.setAttribute('data-option', option.id);              // Set "data-value" attribute
            button.innerHTML = option.title;                            // Set content (the text)

            // Save a reference to the DOM element in the object
            option.button = button;
        }
    }

    // Create main game container
    mainContainer = createDOMElement('div', 'rps-main-container');

    // Create main menu and its options
    mainMenu = createDOMElement('div', 'rps-main-menu', 'rps-menu');
    mainMenuOptions = [
        {id: 'playerVsCpu', title: 'Player vs CPU'},
        {id: 'CpuVsCpu', title: 'CPU vs CPU'}
    ];
    createDOMMenu(mainMenuOptions);

    // Create end match menu and its options
    endMatchMenu = createDOMElement('div', 'rps-endmatch-menu', 'rps-menu');
    endMatchMenuOptions = [
        {id: 'playAgain', title: 'Play again'},
        {id: 'mainMenu', title: 'Main menu'}
    ];
    createDOMMenu(endMatchMenuOptions);

    // Create player 1 hand and its container
    player1HandContainer = createDOMElement('div', 'rps-player1-hand-container', 'rps-hand-container');
    player1Hand = createDOMElement('img', 'rps-player1-hand', 'rps-hand');

    // Create player 2 hand and its container
    player2HandContainer = createDOMElement('div', 'rps-player2-hand-container', 'rps-hand-container');
    player2Hand = createDOMElement('img', 'rps-player2-hand', 'rps-hand');

    // Create player 1 score
    player1Score = createDOMElement('div', 'rps-player1-score', 'rps-score player1-color-bg');

    // Create player 2 score
    player2Score = createDOMElement('div', 'rps-player2-score', 'rps-score player2-color-bg');

    // Get available game values and create values buttons
    gameValues = game.getGameValues();  // Get game values
    valuesButtons = [];                 // Initialize values buttons array
    len = gameValues.length;
    for (j = 0; j < len; j += 1) {
        // Get game value
        value = gameValues[j];

        // Create DOM element for current button
        button = createDOMElement('img', 'rps-value-' + value, 'rps-value-button');
        button.setAttribute('data-value', value);   // Set "data-value" attribute
        button.src = 'img/' + value + '-btn.png';   // Set "src" attribute
        button.title = value;                       // Set "title" attribute (appears as a tooltip)
        button.alt = value;                         // Set "alt" attribute

        // Add it to the array of values buttons
        valuesButtons[j] = button;
    }

    // Create values container
    valuesMenu = createDOMElement('div', 'rps-values-container');

    // Create the result message container
    resultMessage = createDOMElement('div', 'rps-result');

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
            var self = this,    // Own reference
                image,          // img DOM element for the current button (used in loop)
                value;          // Game value for the current button (used in loop)

            // Sets the hands images in rest position
            self.resetHands();

            // Load game values images
            len = gameValues.length;
            for (j = 0; j < len; j += 1) {
                // Create an off-screen image element
                image = document.createElement('img');
                image.src = 'img/' + gameValues[j] + '.png';
            }

            // Add main container to the DOM
            document.body.appendChild(mainContainer);

            // Add player hands to their containers, and these to the main game container
            player1HandContainer.appendChild(player1Hand);
            player2HandContainer.appendChild(player2Hand);
            mainContainer.appendChild(player1HandContainer);
            mainContainer.appendChild(player2HandContainer);

            // Add values buttons to the values menu
            len = valuesButtons.length;
            for (j = 0; j < len; j += 1) {
                // Set max width CSS attribute
                valuesButtons[j].style.maxWidth = parseInt((100 / len)) + '%';

                // Add the button
                valuesMenu.appendChild(valuesButtons[j]);
            }

            // Add values menu to the main game container
            mainContainer.appendChild(valuesMenu);

            // Add result message to the main game container
            mainContainer.appendChild(resultMessage);

            // Add scores to the main game container
            mainContainer.appendChild(player1Score);
            mainContainer.appendChild(player2Score);

            // Build the main menu, then add it to the main container
            len = mainMenuOptions.length;
            for (j = 0; j < len; j += 1) {
                mainMenu.appendChild(mainMenuOptions[j].button);
            }
            mainContainer.appendChild(mainMenu);

            // Build the end match menu, then add it to the main container
            len = endMatchMenuOptions.length;
            for (j = 0; j < len; j += 1) {
                endMatchMenu.appendChild(endMatchMenuOptions[j].button);
            }
            mainContainer.appendChild(endMatchMenu);
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