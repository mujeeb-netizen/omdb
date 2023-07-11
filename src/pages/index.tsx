import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Search.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
interface Data {
  Title: string;
  Poster: string;
  imdbID: string;
}
export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchData(search);
  }, [offset]);

  const fetchData = async (search: string) => {
    // TODO implement search functionality
    setSearch(search);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=850569bb&s=${search}&page=${offset}`
      );
      if (response.data.Response === "True") {
        setData(response.data.Search);
        setCount(response.data.totalResults);
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
  const handlePreviousPage = () => {
    setOffset((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setOffset((prevPage) => prevPage + 1);
  };
  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => fetchData(e.target.value)}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : data.length === 0 ? (
          <div>{err}</div>
        ) : (
          <div className={styles.container}>
            {data?.map((item: Data, index: number) => (
              <div
                key={index}
                className={styles.container_item}
                onClick={() => router.push(`/${item.imdbID}`)}
              >
                <img
                  className={styles.img}
                  src={
                    item.Poster === "N/A" ? "/static/img_no.png" : item.Poster
                  }
                  alt={item.Title}
                />
                <p>{item.Title}</p>
              </div>
            ))}
            <div className={styles.pagination}>
              <button
                onClick={handlePreviousPage}
                disabled={offset === 1}
                className={styles.paginationButton}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={count && offset * 10 >= Number(count)}
                className={styles.paginationButton}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
