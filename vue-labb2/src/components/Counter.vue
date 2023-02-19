<template>
  {{this.$store.state.nr}}
  <input type="button" value="Increase Number" @click="$store.commit('increaseNumber')">
</template>

<script>
export default {
  name: "Counter",
}
</script>

<style scoped>

</style>