import {Verdict} from "./game-const";
export class ActionResult {
  /**
   * @param {Verdict} verdict
   * @param {string} message
   * @param {number} time
   * @param {GameScreen} destination
   */
  constructor({verdict = Verdict.NOOP, message = '', time = 0, destination = null}) {
    this.verdict = verdict;
    this.message = message;
    this.time = 0;
    this.destination = destination;
  }
}


export class GameScreen {
  /**
   * @param {string} disposition
   * @param {Map.<Command, ActionResult>} commands
   */
  constructor(disposition = ``, commands = new Map()) {
    this.disposition = disposition;
    this.commands = commands;
  }
}
