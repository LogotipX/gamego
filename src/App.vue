<template>
  <div id="gamego">
    <!-- <span v-if="winner">Winner: {{ winner ? "White" : "Black" }}</span> -->
    <!-- <span v-if="!winner"
      >Current player: {{ currentPlayer ? "White" : "Black" }}</span
    > -->
    <span v-if="winner !== null">
      Winner:
      <go-stone
        :player="winner ? '--white' : '--black'"
        style="display: inline-block; vertical-align: middle"
      />
    </span>
    <span v-if="winner === null">
      Current player:
      <go-stone
        :player="currentPlayer ? '--white' : '--black'"
        style="display: inline-block; vertical-align: middle"
      />
    </span>
    <game-board :currentPlayer="currentPlayer" @winner="printWinner" />
  </div>
</template>

<script>
import gameBoard from "@/components/gameBoard.vue";
import goStone from "@/components/goStone.vue";

export default {
  name: "App",

  components: {
    gameBoard,
    goStone,
  },

  data() {
    return {
      winner: null,
    };
  },

  computed: {
    currentPlayer() {
      return this.$store.state.currentPlayer;
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
    printWinner(winner) {
      this.winner = winner;
    },
  },
};
</script>

<style lang="scss">
$squareSize: 45;
$rows: 19;
$cols: 19;
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
