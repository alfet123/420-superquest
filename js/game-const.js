/** @enum {string} */
export const Command = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  LEFT: 'left',
  RIGHT: 'right',
  JUMP: 'jump',
  HELP: 'help',
  RESTART: 'restart',
  UNKNOWN: '',
  STAT: 'stat',
  INFO: 'info'
};


/** @enum {number} */
export const Verdict = {
  NOOP: 0,
  GOTO: 1,
  DIE: 2,
  WIN: 3
};
