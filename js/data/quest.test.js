import assert from 'assert';
import {changeLevel} from './quest';

describe('Changing level', () => {
  it('changeLevel should set passed level', () => {
    assert.deepEqual(changeLevel({}, 1), {
      level: 1
    });
  });
});
