var app = app || {};

app.handlers = (function (utils, ui, events) {
    'use strict';

    var endMatchMenu,       // End match menu (DOM element)
        mainMenu,           // Main menu (DOM element)
        valuesMenu;         // Values menu (DOM element)

    // Define values menu button handler
    function valuesButtonHandler(e) {
        var target; // The event target

        e = e || window.event;              // Get the event  in a cross-browser compatible way
        target = e.target || e.srcElement;  // Get the target in a cross-browser compatible way

        // Check if the target is a button
        if (utils.hasClass(target, 'rps-value-button')) {
            // Emit the event
            events.emit('valueSelected', [target.getAttribute('data-value')]);
        }
    }

    // Define menu button handler
    function menuButtonHandler(e) {
        var target; // The event target

        e = e || window.event;              // Get the event  in a cross-browser compatible way
        target = e.target || e.srcElement;  // Get the target in a cross-browser compatible way

        // Check if the target is a button
        if (utils.hasClass(target, 'rps-menu-button')) {
            // Emit the event
            events.emit(target.getAttribute('data-option'));
        }
    }

    // Add handlers to game values buttons (using event delegation on the values menu)
    valuesMenu = ui.getValuesMenu();
    utils.addHandler(valuesMenu, 'click', valuesButtonHandler);

    // Add handlers to end match menu buttons (using event delegation on the menu)
    endMatchMenu = ui.getEndMatchMenu();
    utils.addHandler(endMatchMenu, 'click', menuButtonHandler);

    // Add handlers to main menu buttons (using event delegation on the menu)
    mainMenu = ui.getMainMenu();
    utils.addHandler(mainMenu, 'click', menuButtonHandler);

    // Public properties
    return {
    };
}(app.utils, app.ui, app.events));