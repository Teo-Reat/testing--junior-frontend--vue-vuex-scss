<template>
  <div class="about">
    <div class="home__button-wrapper">
      <router-link class="home__button" to="/">Назад к списку</router-link>
    </div>
    <movie-detail :movie-id="$route.params.id" v-if="$route.params.id"></movie-detail>
  </div>
</template>

<script>
import MovieDetail from "@/components/MovieDetail";

export default {
  components: {
    MovieDetail
  },
}
</script>
