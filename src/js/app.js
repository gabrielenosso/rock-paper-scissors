var app = app || {};

(function (utils, ui, animations, game, ai, events) {
    'use strict';

    var gameValues,   // Available game values
        state;        // State of the app

    // Manages the execution of a match
    function playMatch(value1, value2) {
        var result, // Match result
            winner; // Number of the player who win the match

        // If value1 isn't defined, use AI to get it
        // (it means that the computer is playing as player 1)
        if (typeof value1 === 'undefined' || value1 === null) {
            value1 = ai.play(gameValues);
        }

        // If value2 isn't defined, use AI to get it
        // (it means that the computer is playing as player 2)
        if (typeof value2 === 'undefined' || value2 === null) {
            value2 = ai.play(gameValues);
        }

        // Get match result
        result = game.getResult(value1, value2);

        // Get winner and update its score
        if (result > 0) {
            winner = 1;
        } else if (result < 0) {
            winner = 2;
        }
        game.playerWin(winner); // Update player score

        // Play match animation
        animations.playMatch(value1, value2, function () {
            // Update result message
            ui.updateResultMessage(result);

            // Update score in UI
            ui.updateScore();

            // Show match result
            animations.showResult(winner);

            // Emit an event
            events.emit('matchEnd', [winner]);
        });
    }

    // Initialize UI
    ui.init();

    // Get game values
    gameValues = game.getGameValues();

    // Register Event: show main menu when requested
    events.on('mainMenu', function () {
        // Show main menu
        game.resetScore();
        ui.updateScore();
        animations.showMainMenu();
    });

    // Register Event: show values menu when player select player vs cpu option
    events.on('playerVsCpu', function () {
        // Update app state
        state = 'playerVsCpu';

        // Show values menu
        animations.showValuesMenu();
    });

    // Register Event: start cpu vs cpu match when selected
    events.on('CpuVsCpu', function () {
        // Update app state
        state = 'CpuVsCpu';

        // Reset UI state
        animations.resetState();

        // Start match
        playMatch();
    });

    // Register Event: start player vs cpu match when user select its value
    events.on('valueSelected', function (value) {
        // Start match with passed value
        playMatch(value);
    });

    // Register Event: show relative menu when a match ends
    events.on('matchEnd', function () {
        // Show end match menu
        animations.showEndMatchMenu();
    });

    // Register Event: restart match when user choose to play again
    events.on('playAgain', function () {
        // Emit an event with the current state of the app, so that it returns to the start match state
        // (player vs cpu   or   cpu vs cpu)
        events.emit(state);
    });

    // Start the app
    events.emit('mainMenu');

    /*eventsMap = {
        'playerVsCpu': animations.showValuesMenu.bind(animations),
        'CpuVsCpu': animations.showMainMenu.bind(animations),
        'playAgain': animations.showValuesMenu.bind(animations),
        'mainMenu': animations.showMainMenu.bind(animations)
    };*/

    

    

    
    
}(app.utils, app.ui, app.animations, app.game, app.ai, app.events));