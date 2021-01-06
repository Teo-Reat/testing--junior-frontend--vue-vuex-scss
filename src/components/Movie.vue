<template>
  <div class="home__movie movie">

    <div class="movie__image-wrapper">
      <img class="movie__image" :src="movie.poster" alt="Poster">
    </div>

    <div class="movie__text">
      <div class="movie__text-time-wrapper" v-if="movie.collapse.duration">
        <span class="movie__text-time">{{ movie.collapse.duration[0] }}</span>
      </div>
      <router-link class="movie__text-title" :to="{ name: 'Detail', params: { id: movie.id }}">{{ movie.title }}</router-link>
      <div class="movie__text-inner">
        <span class="movie__text-year">{{ movie.year }}, </span>
        <span class="movie__text-genres">
          <span class="movie__text-genre" v-for="(genre, key) in movie.genres" :key="key">{{ genre }}</span>
        </span>
      </div>
      <div class="movie__text-directors">
        <span class="movie__text-director-description">режиссёр: </span>
        <span class="movie__text-director" v-for="(director, key) in movie.directors" :key="key">{{ director }}</span>
      </div>
      <div class="movie__text-actors">
        <span class="movie__text-actor-description">Актёры: </span>
        <span class="movie__text-actor" v-for="(actor, key) in movie.actors" :key="key">{{ actor }}</span>
      </div>
      <div class="movie__text-description" v-if="movie.description">{{ movie.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
