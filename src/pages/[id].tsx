import React, { useState, useEffect } from "react";
import styles from "@/styles/MovieDetails.module.css";
import { useRouter } from "next/router";
import axios from "axios";
interface Data {
  Title?: string;
  Poster?: string;
  Released?: string;
  Plot?: string;
  imdbRating?:string
}
const MovieDetails = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<Data>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    fetchData(router.query.id)
  }, [router.query.id]);
  const fetchData = async (id:any) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=850569bb&i=${id}`
      );
      if (response.data.Response === "True") {
        setMovie(response.data);

        setLoading(false);
      } else {
        setErr(response.data.Error);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <img className={styles.poster} src={movie?.Poster} alt={movie?.Title} />
      <div className={styles.info}>
        <h2 className={styles.title}>{movie?.Title}</h2>
        <div className={styles.details}>
          <p className={styles.releaseDate}>
            <span className={styles.label}>Release Date:</span>{" "}
            {movie?.Released}
          </p>
          <p className={styles.description}>{movie?.Plot}</p>
          <p className={styles.rating}>
            <span className={styles.label}>Rating:</span> {movie?.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
