<script setup>
import { ref } from 'vue'

defineProps({
  article: {
    type: Object,
    required: true
  },
  borderColor: {
    type: String,
    default() {
      return 'red'
    }
  }

})


const count = ref(0)

</script>

<template>
  <div class="article" :style="'border: 1px solid ' + borderColor">

  <h2><a :href="article.url">{{article.headline}}</a></h2>
  <p>{{article.summary}}</p>
  <img class="articleImg" :src="article.image" alt="article image">
</div>
</template>

<style scoped>
.articleImg {
  width: 20rem;
}
.article {
  margin-bottom: 2rem;
}
</style>
