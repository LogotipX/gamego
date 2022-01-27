<template>
  <div @click="step(colNumber, rowNumber, steppedPlayer)" class="cols">
    {{ steppedPlayer }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      steppedPlayer: null,
      stepped: false,
      minSquare: 0,
    };
  },

  props: {
    colNumber: Number,
    rowNumber: Number,
  },

  emits: {
    currentCoords: Array(3),
  },

  computed: {
    winner() {
      let board = this.$store.state.boardCoords;
      let squares = [];
      board.forEach((arr) => (squares = [...squares, ...arr]));
      let winner = 0;
      squares.forEach((i) => {
        i ? (winner += 1) : (winner -= 1);
      });
      return winner ? "X" : "O";
    },
  },

  methods: {
    step(colNumber, rowNumber) {
      if (this.stepped) return;

      this.stepped = true;

      this.$store.state.currentPlayer
        ? (this.steppedPlayer = "O")
        : (this.steppedPlayer = "X");
      // console.log(`${rowNumber}:${colNumber}`);

      this.$store.commit("changePlayer");
      this.$store.commit("addStepCoords", {
        currentRow: rowNumber,
        currentCol: colNumber,
      });

      this.$emit("currentCoords", [rowNumber, colNumber]);

      if (this.isFillBoard()) {
        console.log("Winner:", this.winner);
        return this.winner;
      }
    },

    isFillBoard() {
      let board = this.$store.state.boardCoords;
      let isFindNull;
      board.forEach((arr) => {
        if (isFindNull) return;
        isFindNull = arr.find((i) => i === null);
        if (isFindNull === null) isFindNull = true;
      });
      return !isFindNull;
    },
  },
};
</script>

<style scoped lang="scss">
.cols {
  display: inline;
  border-right: 1px solid black;
  overflow: hidden;
  cursor: pointer;

  &:last-child {
    border-right: 0;
  }
}
</style>
