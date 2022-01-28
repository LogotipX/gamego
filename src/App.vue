<template>
  <div id="gamego">
    Current player: {{ currentPlayer }}
    <game-board :currentPlayer="currentPlayer" />
  </div>
</template>

<script>
import gameBoard from "@/components/gameBoard.vue";

export default {
  name: "App",

  components: {
    gameBoard,
  },

  data() {
    return {};
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

  methods: {},
};
</script>

<style lang="scss">
$squareSize: 45;
$rows: 8;
$cols: 8;
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
