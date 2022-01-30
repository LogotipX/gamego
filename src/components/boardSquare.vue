<template>
  <div @click="step(rowNumber, colNumber, steppedPlayer)" class="cols">
    <!-- {{ player }} -->
    <go-stone :player="player" class="goStone" />
  </div>
</template>

<script>
import goStone from "@/components/goStone.vue";

export default {
  components: {
    goStone,
  },

  data() {
    return {
      stepped: false,
      minSquare: 0,
    };
  },

  props: {
    steppedPlayer: {
      type: [Boolean, null],
      required: true,
      default: null,
    },

    rowNumber: Number,
    colNumber: Number,
  },

  emits: {
    currentCoords: Array(3),
  },

  computed: {
    player() {
      if (this.steppedPlayer === null) return "";
      if (this.steppedPlayer) {
        // return "O";
        return "--white";
      } else {
        return "--black";
        // return "X";
      }
    },
  },

  methods: {
    step(rowNumber, colNumber) {
      if (this.stepped) return;
      this.stepped = true;

      this.$store.commit("addStepCoords", {
        currentRow: rowNumber,
        currentCol: colNumber,
      });
      this.$store.commit("changePlayer");

      this.$emit("currentCoords", [rowNumber, colNumber]);
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
  .goStone {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
