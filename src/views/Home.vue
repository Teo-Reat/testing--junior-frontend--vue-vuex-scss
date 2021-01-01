<template>
  <div class="home">

    <div class="home__subtitle">
      Фильмы
    </div>
    <div class="home__filters filters">
      <div class="filters__checkbox-wrapper">
        <!--          С чекбоксами немного не ясно, если они не могут быть зажаты одновременно, то логичнее делать radio-->
        <div class="filters__checkbox-inner">
          <input class="filters__checkbox" type="checkbox" id="sort-by-name" name="sort-by-name" value="yes">
          <label class="filters__checkbox-label" for="sort-by-name">Отсортировать по названию</label>
        </div>
        <div class="filters__checkbox-inner">
          <input class="filters__checkbox" type="checkbox" id="sort-by-year" name="sort-by-year" value="yes">
          <label class="filters__checkbox-label" for="sort-by-year">Отсортировать по году</label>
        </div>
      </div>
    </div>

    <div class="home__button-wrapper">
      <button class="home__button" type="button">Назад к списку</button>
    </div>

    <div class="home__loader loader" v-if="load">
      <img class="loader__image" src="../assets/loader.svg" alt="Loader">
    </div>

    <div class="home__movie movie" v-else v-for="movie in sortedArray" :key="movie.id">

      <div class="movie__image-wrapper">
        <img class="movie__image" :src="movie.poster" alt="Poster">
      </div>

      <div class="movie__text">
        <div class="movie__text-time-wrapper" v-if="movie.collapse.duration">
          <span class="movie__text-time">{{ movie.collapse.duration[0] }}</span>
        </div>
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
