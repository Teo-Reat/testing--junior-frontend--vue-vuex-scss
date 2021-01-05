<template>
  <div class="movie-detail-wrapper">
    <div class="movie-detail home__movie movie" v-if="thisMovie">
      <div class="movie__image-wrapper">
        <img class="movie__image" :src="thisMovie.poster" alt="Poster">
      </div>
      <div class="movie__text">
        <div class="movie__text-time-wrapper" v-if="thisMovie.collapse.duration">
          <span class="movie__text-time">{{ thisMovie.collapse.duration[0] }}</span>
        </div>
        <h2 class="movie__text-title">{{ thisMovie.title }}</h2>
        <div class="movie__text-inner">
          <span class="movie__text-year">{{ thisMovie.year }}, </span>
          <span class="movie__text-genres">
          <span class="movie__text-genre" v-for="(genre, key) in thisMovie.genres" :key="key">{{ genre }}, </span>
        </span>
        </div>
        <div class="movie__text-directors">
          <span class="movie__text-director-description">режиссёр: </span>
          <span class="movie__text-director" v-for="(director, key) in thisMovie.directors" :key="key">{{ director }}</span>
        </div>
        <div class="movie__text-actors">
          <span class="movie__text-actor-description">Актёры: </span>
          <span class="movie__text-actor" v-for="(actor, key) in thisMovie.actors" :key="key">{{ actor }}, </span>
        </div>
        <div class="movie__text-description" v-if="thisMovie.description">{{ thisMovie.description }}</div>
      </div>
    </div>
    <div class="about__no-id" v-else>
      К сожалению, по вашему запросу ничего не найдено...
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "MovieDetail",
  data: () => {
    return {
      // id: this.$route.params.id
    }
  },

  props: {
    movieId: {
      required: true,
    }
  },

  computed: {
    ...mapGetters(['getMovies']),

    thisMovie: function () {
      return this.getMovies.find(m => m.id === this.movieId)
    }
  }
}
</script>

<style scoped>

</style>
