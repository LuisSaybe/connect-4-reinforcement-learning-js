import { Board } from "src/common/Board";

export class Environment {
  static AGENT_COLOR = 1;
  static ADVERSARY_COLOR = 2;
  static NONE = 0;
  static LOSE_REWARD = -1;
  static WIN_REWARD = 1;
  static DEFAULT_REWARD = 0;

  static getActions() {
    return Board.ACTIONS;
  }

  static getActionsAvailableInState(state) {
    const board = new Board();

    for (let index = 0; index < state.length; index++) {
      let color;
      const environmentColor = Number(state[index]);

      if (environmentColor === Environment.AGENT_COLOR) {
        color = Board.YELLOW;
      } else if (environmentColor === Environment.ADVERSARY_COLOR) {
        color = Board.RED;
      } else if (environmentColor === Environment.NONE) {
        color = Board.NONE;
      }

      board.place(
        Math.floor(index / Board.COLUMNS),
        index % Board.COLUMNS,
        color,
      );
    }

    return board.getAvailableActions();
  }

  static serializeWithAgentColor(game, agentColor) {
    const result = [];

    for (let x = 0; x < game.getRows(); x++) {
      const row = [];
      result.push(row);

      for (let y = 0; y < game.getColumns(); y++) {
        const color = game.get(x, y);
        let serialization;

        if (color === agentColor) {
          serialization = Environment.AGENT_COLOR;
        } else if (color === Board.NONE) {
          serialization = Environment.NONE;
        } else {
          serialization = Environment.ADVERSARY_COLOR;
        }

        row.push(serialization);
      }
    }

    return result;
  }
}
