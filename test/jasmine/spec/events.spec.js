describe('events', function () {
    describe('managing events', function () {
        it('should invoke a handler after it is registered and the event is fired', function() {
            // Create a handler as a spy
            var handler = jasmine.createSpy();

            // Register the handler on a "test" event
            app.events.on('test', handler);

            // Fire the event
            app.events.emit('test');

            // Check if the handler was correctly invoked
            expect(handler).toHaveBeenCalled();
        });

        it('should invoke a handler passing the arguments', function() {
            // Create a handler as a spy
            var handler = jasmine.createSpy();

            // Register the handler on a "test" event
            app.events.on('test', handler);

            // Fire the event
            app.events.emit('test', ['dog', 4 , true]);

            // Check if the handler was correctly invoked
            expect(handler).toHaveBeenCalledWith('dog', 4 , true);
        });
    });
});