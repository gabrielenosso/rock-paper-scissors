describe('ai', function () {
    describe('generating a value to play the game', function () {
        // Create an array of values
        var a = [3, 9, 1234, 98642];

        it('should return a value present in the given array', function() {
            // Get a value from ai module
            var v = app.ai.play(a);

            // Check that the value is found in the array
            expect(a.indexOf(v)).toBeGreaterThan(-1);
        });
    });
});