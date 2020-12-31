<template>
  <div class="home">
    <div class="home__movie movie" v-for="movie in movies" :key="movie.id">
      <div class="movie__image-wrapper">
        <img class="movie__image" :src="movie.poster" alt="Poster">
      </div>

      <div class="movie__text">
        <div class="movie__text-title">{{ movie.title }}</div>
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
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: 'Home',
  components: {},

  data: () => {
    return {
      movies: null,
      params: '',
      load: false,
      error: '',
    }
  },

  methods: {
    getList() {
      this.load = true;
      axios.get('https://floating-sierra-20135.herokuapp.com/api/movies', {params: this.params})
          .then(response => (this.movies = response.data.data))
          .catch((error) => {
            this.data = null;
            this.error = error.response.data.error;
          })
          .finally(() => setTimeout(() => this.load = false, 5000));
    },
  },

  mounted() {
    this.getList()
  }
}
</script>
