import { createStore } from "vuex";
// import Vue from "vue";

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
      // console.log(currentRow);
      // console.log(currentCol);
      state.boardCoords[currentRow][currentCol] = state.currentPlayer;
      // console.log(state.boardCoords);
    },
    changePlayer(state) {
      state.currentPlayer = !state.currentPlayer;
      // console.log("Change player", state.currentPlayer);
    },
  },
  actions: {},
  modules: {},
});
