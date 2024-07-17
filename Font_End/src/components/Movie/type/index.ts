export interface Moviee {
    banner: string;
    movieName: string;
    duration: number;
    releaseDate: string | Date;
    movieTypes: MovieType[]
    [key: string]: any
}

export interface MovieType {
    id: number
    movieTypeName: string
  }