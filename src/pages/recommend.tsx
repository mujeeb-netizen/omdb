import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Recommend.module.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ['latin'] })
interface Data {
  Title: string;
  Poster: string;
  imdbID: string;
}
export default function Recommend() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    fetchData("horror");
  },[]);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      if (currentDate >= nextDay) {
        const randomSearch = refresh();
        fetchData(randomSearch);
      }
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const refresh = () => {
    const randomWords = ["action", "comedy"];
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    return randomWords[randomIndex];
  };
  const fetchData = async (search: string) => {
    // TODO implement search functionality
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=850569bb&s=${search}&page=${1}`
      );
      if (response.data.Response === "True") {
        setData(response.data.Search);
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

  
  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
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
           
          </div>
        )}
      </main>
    </>
  )
}
