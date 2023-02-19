<template>
    <div v-if="data !== null">
        <h2>Entered form data:</h2>

        <p id="data">{{ data }}</p>
    </div>
</template>

<script>
export default {
    name: 'contactForm',
    props: {
        data: Object,
    },
}
</script>

<style scoped>
form input,
form textarea {
    display: block;
}
#error,
#invalidForm {
    font-size: 2.5rem;
    color: red;
}
</style>
