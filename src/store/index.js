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
    changeEnemySquare(state, { changedCoords, player }) {
      // let cloneBoardCoords = state.boardCoords.map(function func(el) {
      //   if (Object.prototype.toString.call(el) == "[object Array]") {
      //     return el.map(func);
      //   }
      //   return el;
      // });
      // state.boardCoords = null;

      //   console.log("changeEnemySquare");

      //   const cloneBoardCoords = state.boardCoords.map((coords) =>
      //     Object.assign(coords)
      //   );
      // console.log(state.boardCoords);
      // console.log("changedCoords", changedCoords);
      changedCoords.forEach((coords) => {
        // console.log(
        //   `${coords}: ${state.boardCoords[coords[0]][coords[1]]} to ${player}`
        // );
        state.boardCoords[coords[0]][coords[1]] = player;
        // state.boardCoords.splice(coords[0], 1, [].splice(coords[1], 1, player));
      });

      //   console.log("cloneBoardCoords", cloneBoardCoords);
      //   state.boardCoords = Array(8)
      //     .fill(null)
      //     .map(() => Array(8).fill(null));

      //   state.boardCoords = cloneBoardCoords.map((coords, idx) =>
      //     Object.assign({ index: idx }, coords)
      //   );
      //   console.log("state.boardCoords", state.boardCoords);

      // this.$nextTick(() => {
      // state.boardCoords = cloneBoardCoords.map(function func(el) {
      //   if (Object.prototype.toString.call(el) == "[object Array]") {
      //     return el.map(func);
      //   }
      //   return el;
      // });
      console.log(state.boardCoords);
      // });
    },
  },
  actions: {},
  modules: {},
});
