export interface MovieDetaill {
    id: number
    movies: Moviee
    directorName: string
    actors: Actorr[]
    trailer: string
    movieDate: string | Date
    content: string
}

export interface Actorr {
    id: number
    actorName: string
}

export interface Moviee {
    id: number
    banner: string
    movieName: string
    duration: number
    releaseDate: string | Date
    movieTypes: MovieTypee[]
    [key: string]: any
}

export interface MovieTypee {
    id: number
    movieTypeName: string
}

export interface Theaterr {
    id: number
    theaterName: string
    location: string
    province: string
}

export interface CinamaRoomm {
    id: number
    cinemaRoomName: string
    theaters: Theaterr
}