import assert from 'assert';
import {initialGame, setLives} from './quest';


describe('Game parameters', () => {
  describe('Character lives', () => {
    describe('Setting', () => {
      it('Number of character\'s lives successfuly changes', () => {
        assert.equal(setLives(initialGame, 3).lives, 3);
      });
    });

    describe('Failures', () => {
      it('setLives throws an error if negative value passed', () => {
        assert.throws(() => setLives(initialGame, -1));
      });
    });
  });
});
