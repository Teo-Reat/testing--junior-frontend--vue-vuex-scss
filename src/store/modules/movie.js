import axios from "axios";

export default {
	actions: {
		async fetchMovies(ctx) {
			let load = true, movies;
			ctx.commit('updateLoad', load)

			await axios.get('https://floating-sierra-20135.herokuapp.com/api/movies')
				.then(response => (movies = response.data.data))
				.finally(() => {
					load = false;
					ctx.commit('updateLoad', load)
				});
			ctx.commit('updateMovies', movies)
		},
	},

	getters: {
		getMovies: (state) => state.movies,
		getLoader: (state) => state.load,
	},

	mutations: {
		updateMovies: (state, movies) => { state.movies = movies },
		updateLoad: (state, load) => { state.load = load }
	},
	state: {
		movies: [],
		load: false
	}
}
