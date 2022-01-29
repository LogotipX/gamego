import { createStore } from "vuex";

export default createStore({
  state: {
    rows: 8,
    cols: 8,
    currentPlayer: false,
    boardCoords: Array(8)
      .fill(null)
      .map(() => Array(8).fill(null)),
  },
  mutations: {
    addStepCoords(state, { currentRow, currentCol }) {
      state.boardCoords[currentRow][currentCol] = state.currentPlayer;
    },
    changePlayer(state) {
      state.currentPlayer = !state.currentPlayer;
    },
    changeEnemySquare(state, { changedCoords, player }) {
      changedCoords.forEach((coords) => {
        state.boardCoords[coords[0]][coords[1]] = player;
      });
    },
  },
  actions: {},
  modules: {},
});
