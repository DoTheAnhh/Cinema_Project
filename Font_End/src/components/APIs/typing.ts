export const LOCALHOST = 'http://localhost:8080'

export const REQUEST_MAPPING = {
    HOME: '/home',
    MOVIE: '/movies',
    MOVIE_TYPE: '/movie-type',
    MOVIE_DETAIL: '/movie-details',
    ACTOR: '/actors'
}

export const API = {
    MOVIE: {
        GETALL_MOVIE: '',
        INSERT_MOVIE: '/insert-movie',
        EDIT_MOVIE: '/edit-movie',
        DELETE_MOVIE: '/delete-movie',
        SEARCH_MOVIE: '/search-movies'
    },
    MOVIE_TYPE: {
        GETALL_MOVIE_TYPE: '',
        INSERT_MOVIE_TYPE: '/insert-movie-type',
        EDIT_MOVIE_TYPE: '/edit-movie-type',
        SEARCH_MOVIE_TYPE: '/search-movie-type'
    },
    MOVIE_DETAIL: {
        GETALL_MOVIE_DETAIL: '',
        INSERT_MOVIE_DETAIL: '/insert-movie-detail',
        EDIT_MOVIE_DETAIL: '/edit-movie-detail',
        SEARCH_MOVIE_DETAIL: '/search-movie-details'
    },
    ACTOR: {
        GETALL_ACTOR: '',
        INSERT_ACTOR: '/insert-actor',
        EDIT_ACTOR: '/edit-actor',
        DELETE_ACTOR: '/delete-actor',
        SEARCH_ACTOR: '/search-actors'
    }
}
