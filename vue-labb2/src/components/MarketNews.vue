<script setup>
import NewsCard from './NewsCard.vue'
</script>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            news: [],
            loading: true,
        }
    },
    methods: {
        getNews() {
            axios
                .get(
                    'https://finnhub.io/api/v1/news?category=general&token=bvhkpo748v6olk04ncm0'
                )
                .then((response) => {
                    this.loading = false
                    // get only first n news
                    this.news = response.data.slice(0, this.limit || 20)
                })
        },
    },
    created() {
        this.getNews()
    },
    props: {
        limit: {
            type: String,
        },
    },
}
</script>

<template>
    <h1>Stock Market News</h1>

    <div id="news-container" v-if="news.length !== 0">
        <news-card
            v-for="(article, index) in news"
            :key="index"
            :article="article"
            border-color="red"
        ></news-card>
    </div>

    <h3 v-if="loading">Loading...</h3>
</template>

<style scoped></style>
