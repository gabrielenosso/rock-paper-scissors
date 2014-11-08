describe('utils', function () {
    describe('managing CSS classes', function () {
        // Create a div DOM element
        var d = document.createElement('div');

        it('should add a class to a div that doesn\'t have any class', function() {
            app.utils.addClass(d, 'test-class');

            // Check if the class was correctly added
            expect(d.className).toEqual('test-class');
        });

        it('should add a class to a div that just have a class', function() {
            app.utils.addClass(d, 'test-class2');

            // Check if the class was correctly added
            expect(d.className).toEqual('test-class test-class2');
        });

        it('shouldn\'t add a class if the div just have that class', function() {
            app.utils.addClass(d, 'test-class');

            // Check if the class wasn't added
            expect(d.className).toEqual('test-class test-class2');
        });

        it('should remove a specified class', function() {
            app.utils.removeClass(d, 'test-class');

            // Check if the class was correctly removed
            expect(d.className).toEqual('test-class2');
        });
    });

    describe('managing event handlers', function () {
        var d,         // A div (DOM element)
            callback1, // Fake callback function (a spy)
            callback2, // Fake callback function (a spy)
            event;     // Custom event

        // Create a div DOM element
        d = document.createElement('div');

        // Create spies as callbacks
        callback1 = jasmine.createSpy('eventHandler');
        callback2 = jasmine.createSpy('eventHandler');

        // Create a custom event, add an handler and fire the event
        event = document.createEvent('HTMLEvents');
        event.initEvent('customEvent', true, true);

        it('should invoke a registered event handler when the event is fired', function() {           
            app.utils.addHandler(d, 'customEvent', callback1);
            d.dispatchEvent(event);

            // Check if the callback was correctly invoked
            expect(callback1).toHaveBeenCalled();
        });

        it('should remove an event handler previously added', function() {
            app.utils.addHandler(d, 'customEvent', callback2);
            app.utils.removeHandler(d, 'customEvent', callback2);
            d.dispatchEvent(event);

            // Check if the callback was correctly invoked
            expect(callback2).not.toHaveBeenCalled();
        });
    });
});