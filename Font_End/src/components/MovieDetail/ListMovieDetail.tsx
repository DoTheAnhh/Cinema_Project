import React, { useState } from 'react'
import { Actorr, MovieDetaill, Moviee } from '../Types'
import { useNavigate } from 'react-router-dom'

const ListMovieDetail: React.FC = () => {

  const [movieDetails, setMovieDetails] = useState<MovieDetaill[]>([])

  const [movie, setMovie] = useState<Moviee>()

  const [currentPage, setCurrentPage] = useState<number>(0); // State để theo dõi trang hiện tại
  const [pageSize, setPageSize] = useState<number>(5); // Số mục trên mỗi trang
  const [totalMovie, setTotalMovie] = useState<number>(0); // Tổng số phần tử

  const [actors, setActors] = useState<Actorr[]>([])

  const navigator = useNavigate()

  const fetchMovieDetails = () => {

  }

  return (
    <div>Hi</div>
  )
}

export default ListMovieDetail