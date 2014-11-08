var app = app || {};

app.game = (function () {
    'use strict';
    
    var gameMap,    // Map of game results
        gameValues, // Array of possible game values
        score,      // Game score (player1 points, player2 points)
        value;      // Current game value (used in for in loop)

    // Set Map of game results
    // For each game value it contains the results for all possible values
    gameMap = {
        rock: {
            rock: 0,
            paper: -1,
            scissors: 1
        },
        paper: {
            rock: 1,
            paper: 0,
            scissors: -1
        },
        scissors: {
            rock: -1,
            paper: 1,
            scissors: 0
        }
    };

    // Build the array of available game values from the map
    gameValues = [];
    for (value in gameMap) {
        gameValues.push(value);
    }

    // Public properties
    return {
        // Returns the available game values
        getGameValues: function () {
            return gameValues;
        },

        // Returns the result of the game giving 2 values
        getResult: function (v1, v2) {
            return gameMap[v1][v2];
        },

        // Returns the score
        getScore: function () {
            return score;
        },

        // Adds a point when a player win.
        // The passed parameter indicates the player: "1" for player 1, "2" for player 2.
        playerWin: function (playerNumber) {
            score[playerNumber - 1] += 1;
        },

        // Resets the score
        resetScore: function () {
            score = [0, 0];
        }
    };
}());