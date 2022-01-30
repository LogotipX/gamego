<template>
  <div :class="player" class="goStone"></div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    player: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.goStone {
  display: block;
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.--white {
  background-color: #fff;
  border: 3px inset #000;
}
.--black {
  background-color: #000;
  border: 3px inset #fff;
}
</style>
