<template>
  <div class="home">

    <div class="home__subtitle">
      Фильмы
    </div>
    <div class="home__filters filters">
      <div class="filters__checkbox-wrapper">
        <!--          С чекбоксами немного не ясно, если они не могут быть зажаты одновременно, то логичнее делать radio-->
        <div class="filters__checkbox-inner">
          <input class="filters__checkbox"
                 type="checkbox"
                 id="sort-by-name"
                 name="sort-by-name"
                 v-model="sortBy"
                 true-value="title"
                 false-value="unsorted">
          <label class="filters__checkbox-label" for="sort-by-name">Отсортировать по названию</label>
        </div>
        <div class="filters__checkbox-inner">
          <input class="filters__checkbox"
                 type="checkbox"
                 id="sort-by-year"
                 name="sort-by-year"
                 v-model="sortBy"
                 true-value="year"
                 false-value="unsorted">
          <label class="filters__checkbox-label" for="sort-by-year">Отсортировать по году</label>
        </div>
      </div>
    </div>
    <div class="home__loader loader" v-if="getLoader">
      <img class="loader__image" src="../assets/loader.svg" alt="Loader">
    </div>
    <div class="home__movie movie" v-else v-for="movie in sortedList" :key="movie.id">

      <div class="movie__image-wrapper">
        <img class="movie__image" :src="movie.poster" alt="Poster">
      </div>

      <div class="movie__text">
        <div class="movie__text-time-wrapper" v-if="movie.collapse.duration">
          <span class="movie__text-time">{{ movie.collapse.duration[0] }}</span>
        </div>
        <router-link class="movie__text-title" :to="{ name: 'About', params: { id: movie.id }}">{{ movie.title }}</router-link>
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

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {},

  data: () => {
    return {
      sortBy: 'unsorted',
      params: '',
    }
  },

  methods: {
    ...mapActions(['fetchMovies']),

    sortMoviesByTitle (d1, d2) {
      return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;
    },
    sortMoviesByYear (d1, d2) {
      return (d1.year > d2.year) ? 1 : -1;
    }
  },

  computed: {
    ...mapGetters(['getMovies', 'getLoader']),

    sortedList: function() {
      let mapped = JSON.parse(JSON.stringify(this.getMovies))

      switch(this.sortBy){
        case 'title': return mapped.sort(this.sortMoviesByTitle);
        case 'year': return mapped.sort(this.sortMoviesByYear);
        default: return this.getMovies;
      }
    },
  },

  mounted() {
    this.fetchMovies()
  }
}
</script>
