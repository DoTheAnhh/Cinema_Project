export const LOCALHOST = "http://localhost:8080";

export const REQUEST_MAPPING = {
  HOME: "/home",
  MOVIE: "/movies",
  MOVIE_TYPE: "/movie-types",
  MOVIE_DETAIL: "/movie-details",
  ACTOR: "/actors",
  THEATER: "/theaters",
  CINEMA_ROOM: "/cinema-rooms",
  SHOW_TIME: "/show-times",
  CUSTOMER: "/customers",
  SEAT: "/seats",
  FOOD: "/foods",
  SEAT_CINEMA_ROOM: '/seat-cinema-rooms'
};

export const API = {
  MOVIE: {
    GETALL_MOVIE: "",
    INSERT_MOVIE: "/insert-movie",
    EDIT_MOVIE: "/edit-movie",
    DELETE_MOVIE: "/delete-movie",
    SEARCH_MOVIE: "/search-movies",
  },
  MOVIE_TYPE: {
    GETALL_MOVIE_TYPE: "",
    INSERT_MOVIE_TYPE: "/insert-movie-type",
    EDIT_MOVIE_TYPE: "/edit-movie-type",
    SEARCH_MOVIE_TYPE: "/search-movie-type",
  },
  MOVIE_DETAIL: {
    GETALL_MOVIE_DETAIL: "",
    INSERT_MOVIE_DETAIL: "/insert-movie-detail",
    EDIT_MOVIE_DETAIL: "/edit-movie-detail",
    SEARCH_MOVIE_DETAIL: "/search-movie-details",
  },
  ACTOR: {
    GETALL_ACTOR: "",
    INSERT_ACTOR: "/insert-actor",
    EDIT_ACTOR: "/edit-actor",
    DELETE_ACTOR: "/delete-actor",
    SEARCH_ACTOR: "/search-actors",
  },
  THEATER: {
    GETALL_THEATER: "",
    INSERT_THEATER: "/insert-theater",
    EDIT_THEATER: "/edit-theater",
    DELETE_THEATER: "/delete-theater",
    SEARCH_THEATER: "/search-theaters",
  },
  CINEMA_ROOM: {
    GETALL_CINEMA_ROOM: "",
    INSERT_CINEMA_ROOM: "/insert-cinema-room",
    EDIT_CINEMA_ROOM: "/edit-cinema-room",
    DELETE_CINEMA_ROOM: "/delete-cinema-room",
    SEARCH_CINEMA_ROOM: "/search-cinema-rooms",
  },
  SHOW_TIME: {
    GETALL_SHOW_TIME: "",
    INSERT_SHOW_TIME: "/insert-show-time",
    EDIT_SHOW_TIME: "/edit-show-time",
    DELETE_SHOW_TIME: "/delete-show-time",
    SEARCH_SHOW_TIME: "/search-show-times",
  },
  CUSTOMER: {
    GETALL_CUSTOMER: "",
    INSERT_CUSTOMER: "/insert-customer",
    EDIT_CUSTOMER: "/edit-customer",
    DELETE_CUSTOMER: "/delete-customer",
    SEARCH_CUSTOMER: "/search-customers",
  },
  SEAT: {
    GET_ALL_SEAT: "",
    GET_SEAT_BY_CINEMA_ROOM: "/cinema-room",
    BOOK_SEAT: "/book",
    CHECK_STATUSS: '/check-statuss'
  },
  FOOD: {
    GET_ALL_FOOD: "",
    INSERT_FOOD: "/insert-food",
    EDIT_FOOD: "/edit-food",
    UPDATE_QUANTITY_FOOD:'/update-quantity-food'
  },
  SEAT_CINEMA_ROOM: {
    GETALL_SEAT_CINEMA_ROOM: "",
    INSERT_SEAT_CINEMA_ROOM: "/insert-seat-cinema-room",
    EDIT_SEAT_CINEMA_ROOM: "/edit-seat-cinema-room",
    DELETE_SEAT_CINEMA_ROOM: "/delete-seat-cinema-room",
    SEARCH_SEAT_CINEMA_ROOM: "/search-seat-cinema-rooms",
  },
};
