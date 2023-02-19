<template>
    {{ this.$store.state.nr }}
    <input
        type="button"
        class="btn btn-primary"
        value="Increase Number"
        @click="$store.commit('increaseNumber')"
    />
</template>

<script>
export default {
    name: 'press-counter',
}
</script>

<style scoped></style>
