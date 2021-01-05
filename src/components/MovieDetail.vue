<template>
  <div class="movie-detail-wrapper">
    <div class="movie-detail home__movie movie" v-if="movie">
      <div class="movie__image-wrapper">
        <img class="movie__image" :src="movie.poster" alt="Poster">
      </div>
      <div class="movie__text">
        <div class="movie__text-time-wrapper" v-if="movie.collapse.duration">
          <span class="movie__text-time">{{ movie.collapse.duration[0] }}</span>
        </div>
        <h2 class="movie__text-title">{{ movie.title }}</h2>
        <div class="movie__text-inner">
          <span class="movie__text-year">{{ movie.year }}, </span>
          <span class="movie__text-genres">
          <span class="movie__text-genre" v-for="(genre, key) in movie.genres" :key="key">{{ genre }}, </span>
        </span>
        </div>
        <div class="movie__text-directors">
          <span class="movie__text-director-description">режиссёр: </span>
          <span class="movie__text-director" v-for="(director, key) in movie.directors" :key="key">{{ director }}</span>
        </div>
        <div class="movie__text-actors">
          <span class="movie__text-actor-description">Актёры: </span>
          <span class="movie__text-actor" v-for="(actor, key) in movie.actors" :key="key">{{ actor }}, </span>
        </div>
        <div class="movie__text-description" v-if="movie.description">{{ movie.description }}</div>
      </div>
    </div>
    <div class="about__no-id" v-else>
      К сожалению, по вашему запросу ничего не найдено...
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from "axios"

export default {
  name: "MovieDetail",
  data: () => {
    return {
      movie: {}
    }
  },

  props: {
    movieId: {
      required: true,
    }
  },

  methods: {
    ...mapActions(['fetchMovies']),

    getMovieFromId() {
      axios.get('https://floating-sierra-20135.herokuapp.com/api/movie/' + this.movieId)
          .then(response => (this.movie = response.data.data))
    },

    thisMovie: function () {
      let movie = this.getMovies.find(m => m.id === this.movieId)
      if (movie) return this.movie = movie
      this.getMovieFromId()
    },
  },

  mounted() {
    this.thisMovie()
  },

  computed: {
    ...mapGetters(['getMovies']),
  }
}
</script>

<style scoped>

</style>
