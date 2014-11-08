describe('game', function () {
    describe('calculting match results', function () {
        it('should return -1 if the match is rock vs paper (paper wins)', function() {
            var result = app.game.getResult('rock', 'paper');
            expect(result).toEqual(-1);
        });

        it('should return 0 if the match is rock vs rock (draw)', function() {
            var result = app.game.getResult('rock', 'rock');
            expect(result).toEqual(0);
        });

        it('should return 1 if the match is rock vs scissors (rock wins)', function() {
            var result = app.game.getResult('rock', 'scissors');
            expect(result).toEqual(1);
        });

        it('should return -1 if the match is scissors vs rock (rock wins)', function() {
            var result = app.game.getResult('scissors', 'rock');
            expect(result).toEqual(-1);
        });

        it('should return 0 if the match is scissors vs scissors (draw)', function() {
            var result = app.game.getResult('scissors', 'scissors');
            expect(result).toEqual(0);
        });

        it('should return 1 if the match is scissors vs paper (scissors wins)', function() {
            var result = app.game.getResult('scissors', 'paper');
            expect(result).toEqual(1);
        });

        it('should return -1 if the match is paper vs scissors (scissors wins)', function() {
            var result = app.game.getResult('paper', 'scissors');
            expect(result).toEqual(-1);
        });

        it('should return 0 if the match is paper vs paper (draw)', function() {
            var result = app.game.getResult('paper', 'paper');
            expect(result).toEqual(0);
        });

        it('should return 1 if the match is paper vs rock (paper wins)', function() {
            var result = app.game.getResult('paper', 'rock');
            expect(result).toEqual(1);
        });
    });

    describe('resetting scores', function () {
        it('should reset scores to 0-0', function() {
            app.game.resetScore();

            // Check score
            expect(app.game.getScore()[0]).toEqual(0);
            expect(app.game.getScore()[1]).toEqual(0);
        });
    });

    describe('calculating scores', function () {
        it('should add a point to player 2 if it wins', function() {
            app.game.resetScore();

            // Emulate match
            app.game.playerWin(2);

            // Check score
            expect(app.game.getScore()[1]).toEqual(1);
        });

        it('should give score 4-3 if player1 won 4 times and player2 won 3 times', function() {
            app.game.resetScore();

            // Emulate matches
            app.game.playerWin(1);
            app.game.playerWin(1);
            app.game.playerWin(2);
            app.game.playerWin(1);
            app.game.playerWin(2);
            app.game.playerWin(2);
            app.game.playerWin(1);

            // Check score
            expect(app.game.getScore()[0]).toEqual(4);
            expect(app.game.getScore()[1]).toEqual(3);
        });
    });
});