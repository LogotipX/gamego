<template>
  <div id="gamego">
    Current player: {{ currentPlayer }}
    <div id="board">
      <div v-for="row in rows" :key="row" ref="rows" class="rows">
        <board-square
          v-for="col in cols"
          :key="col"
          ref="cols"
          :colNumber="col - 1"
          :rowNumber="row - 1"
          @currentCoords="checkAroundSquares"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import boardSquare from "@/components/boardSquare.vue";

export default {
  components: { boardSquare },
  name: "App",
  store: store,

  data() {
    return {
      rows: store.state.rows,
      cols: store.state.cols,
    };
  },

  computed: {
    currentPlayer() {
      if (this.$store.state.currentPlayer) {
        return "O";
      } else {
        return "X";
      }
    },

    previousPlayer() {
      if (this.$store.state.currentPlayer) {
        return "X";
      } else {
        return "O";
      }
    },
  },

  methods: {
    checkAroundSquares(currentCoords) {
      const aroundCoords =
        this.getAllAroundSquares(currentCoords)["allAroundSquares"];

      aroundCoords.forEach((square) => {
        const row = square[0];
        const col = square[1];

        const enemy = this.currentPlayer === "X" ? true : false;

        if (this.$store.state.boardCoords[row][col] === enemy) {
          // console.log(
          //   `This func gonna check around squares. If enemySquare => mb he can become friend?`
          // );
          console.log(`EnemySquare => mb he can become friend?`);
        }
      });
    },

    getAllAroundSquares(coords) {
      let row = coords[0];
      let col = coords[1];

      let aroundRows = [
        row - 1 >= 0 ? row - 1 : 0,
        row,
        row + 1 < this.$store.state.rows ? row + 1 : row,
      ];
      let aroundCols = [
        col - 1 >= 0 ? col - 1 : 0,
        col,
        col + 1 < this.$store.state.cols ? col + 1 : col,
      ];

      let allAroundSquares = [];
      aroundRows.forEach((row) => {
        aroundCols.forEach((col) => {
          if (!(row === coords[0] && col === coords[1])) {
            allAroundSquares.push([row, col]);
          }
        });
      });

      allAroundSquares = allAroundSquares.sort();
      allAroundSquares = allAroundSquares.filter((el, idx) => {
        if (idx <= 0) {
          return true;
        }
        if (
          allAroundSquares[idx - 1][0] !== el[0] ||
          allAroundSquares[idx - 1][1] !== el[1]
        ) {
          return true;
        }
        return false;
      });

      // console.log(allAroundSquares);

      return {
        allAroundSquares: allAroundSquares,
        currentSquare: coords,
      };
    },
  },
};
</script>

<style lang="scss">
$squareSize: 45;
$rows: 3;
$cols: 3;
$board-width: #{$rows * $squareSize}px;
$board-height: #{$cols * $squareSize}px;
$winnerColor: #221e1a;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

#app {
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

#gamego {
  background-color: #e2cdaf;
  width: min-content;
  height: min-content;

  margin: 15px;

  #board {
    display: grid;
    grid-template-rows: repeat($rows, 1fr);
    border: 3px solid black;
    border-radius: 2px;
    width: $board-width;
    height: $board-height;
    font-size: #{$squareSize}px;

    margin-top: 5px;

    .rows {
      display: grid;
      grid-template-columns: repeat($cols, 1fr);
      border-bottom: 1px solid black;
      overflow: hidden;

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
