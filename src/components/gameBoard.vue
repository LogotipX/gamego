<template>
  <div id="board">
    <div v-for="row in rows" :key="row" class="rows">
      <board-square
        v-for="col in cols"
        :key="col"
        :steppedPlayer="$store.state.boardCoords[row - 1][col - 1]"
        :rowNumber="row - 1"
        :colNumber="col - 1"
        @currentCoords="stepOnSquare"
      />
    </div>
  </div>
</template>

<script>
import boardSquare from "@/components/boardSquare.vue";

export default {
  components: { boardSquare },

  data() {
    return {
      rows: this.$store.state.rows,
      cols: this.$store.state.cols,
    };
  },

  props: {
    currentPlayer: Boolean,
  },

  emits: {
    winner: Boolean,
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

    isFillBoard() {
      // if (this.maxSteps > 0) return false;
      // return true;

      let board = this.$store.state.boardCoords; // It's faster...
      let isFindNull;
      board.forEach((arr) => {
        if (isFindNull) return;
        isFindNull = arr.find((i) => i === null);
        if (isFindNull === null) isFindNull = true;
      });
      return !isFindNull;
    },
  },

  methods: {
    stepOnSquare(coords) {
      this.checkAroundSquares(coords);

      if (this.isFillBoard) {
        this.$emit("winner", this.winner);
      }
    },

    checkAroundSquares(currentCoords) {
      const aroundCoords =
        this.getAllAroundSquares(currentCoords)["allAroundSquares"];

      aroundCoords.forEach((square) => {
        const row = square[0];
        const col = square[1];

        const enemy = !this.currentPlayer;

        if (this.$store.state.boardCoords[row][col] === enemy) {
          const enemyCoords = [row, col];
          console.log("asd");
          this.enemyLineLengthCoords(currentCoords, enemyCoords);
        }
      });
    },

    enemyLineLengthCoords(startSelfPos, startEnemyPos) {
      const differenceCoords = [
        startEnemyPos[0] - startSelfPos[0],
        startEnemyPos[1] - startSelfPos[1],
      ];

      let enemyLineCoords = [startEnemyPos];

      let nextEnemyPos = [
        startEnemyPos[0] + differenceCoords[0],
        startEnemyPos[1] + differenceCoords[1],
      ];
      while (
        nextEnemyPos[0] >= 0 &&
        nextEnemyPos[1] >= 0 &&
        nextEnemyPos[0] < this.rows &&
        nextEnemyPos[1] < this.cols &&
        this.$store.state.boardCoords[nextEnemyPos[0]][nextEnemyPos[1]] !== null
      ) {
        if (
          this.$store.state.boardCoords[nextEnemyPos[0]][nextEnemyPos[1]] ===
          this.$store.state.boardCoords[startSelfPos[0]][startSelfPos[1]]
        ) {
          this.$store.commit("changeEnemySquare", {
            changedCoords: enemyLineCoords,
            player:
              this.$store.state.boardCoords[startSelfPos[0]][startSelfPos[1]],
          });
          return;
        }

        /* BUGFIX */
        nextEnemyPos[0] += differenceCoords[0];
        nextEnemyPos[1] += differenceCoords[1];

        enemyLineCoords.push([
          nextEnemyPos[0] - differenceCoords[0],
          nextEnemyPos[1] - differenceCoords[1],
        ]);

        /* I DON'T KNOW WHY IT'S BROKEN */
        // enemyLineCoords.push(nextEnemyPos);
        // debugger; // eslint-disable-line no-debugger
        // nextEnemyPos[0] += differenceCoords[0];
        // nextEnemyPos[1] += differenceCoords[1];
      }
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

      allAroundSquares = allAroundSquares.sort().filter((el, idx) => {
        if (idx <= 0) return true;

        if (
          allAroundSquares[idx - 1][0] !== el[0] ||
          allAroundSquares[idx - 1][1] !== el[1]
        ) {
          return true;
        }
        return false;
      });

      return {
        allAroundSquares: allAroundSquares,
        currentSquare: coords,
      };
    },
  },
};
</script>
