<template>
  <!-- enemy: {{ this.currentPlayer === "X" ? "O" : "X" }} -->
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
    currentPlayer: String,
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
  },

  methods: {
    stepOnSquare(coords) {
      this.checkAroundSquares(coords);

      if (this.isFillBoard()) {
        this.$emit("winner", this.winner);
      }
    },

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

          const enemyCoords = [row, col];
          this.enemyLineLengthCoords(currentCoords, enemyCoords);
          // this.checkAroundSquares([row, col]);
        }
      });
    },

    enemyLineLengthCoords(startSelfPos, startEnemyPos) {
      // console.log("selfPos:", startSelfPos);
      // console.log("enemyPos:", startEnemyPos);
      const differenceCoords = [
        startEnemyPos[0] - startSelfPos[0],
        startEnemyPos[1] - startSelfPos[1],
      ];
      // console.log("differenceCoords", differenceCoords);

      // console.log("nextEnemyPos", nextEnemyPos);
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
          console.log(
            "friend finded on",
            [...nextEnemyPos],
            this.$store.state.boardCoords[nextEnemyPos[0]][nextEnemyPos[1]],
            this.$store.state.boardCoords[startSelfPos[0]][startSelfPos[1]]
          );
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

      if (
        this.$store.state.boardCoords[nextEnemyPos[0]] === undefined ||
        this.$store.state.boardCoords[nextEnemyPos[0]][nextEnemyPos[1]] !== null
      )
        console.log("enemyPos out of limit");
      else console.log("Null square", ...nextEnemyPos);
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

      // console.log(allAroundSquares);

      return {
        allAroundSquares: allAroundSquares,
        currentSquare: coords,
      };
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
