import { createStore } from "vuex";

export default createStore({
  state: {
    rows: 3,
    cols: 3,
    currentPlayer: false,
    boardCoords: Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  },
  mutations: {
    changePlayer(state) {
      state.currentPlayer = !state.currentPlayer;
      // console.log("Change player", state.currentPlayer);
    },
    addStepCoords(state, { currentRow, currentCol }) {
      // console.log(currentRow);
      // console.log(currentCol);
      state.boardCoords[currentRow][currentCol] = state.currentPlayer;
      // console.log(state.boardCoords);
    },
  },
  actions: {},
  modules: {},
});
