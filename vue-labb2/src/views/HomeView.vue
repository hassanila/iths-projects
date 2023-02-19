<script setup>
import MarketNews from '../components/MarketNews.vue'
import Counter from '../components/Counter.vue'
</script>

<template>
    <main>
        <Counter />
        <MarketNews :limit="$route.params.limit" />
    </main>
</template>
