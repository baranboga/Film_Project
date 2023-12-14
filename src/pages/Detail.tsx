import React, { useEffect, useState } from "react";
import { GetFilmById, GetFilmImageId } from "../requests/filmrequests";
import { useParams } from "react-router-dom";
import FilmCard from "../components/FilmCard";

function Detail() {
  const { filmId } = useParams();
  const [film, setfilm] = useState();
  const [filmimages, setfilmimages] = useState();

  useEffect(() => {
    GetFilmById(filmId).then((item: any) => {
      if (item != null) {
        setfilm(item);
       
      }
      GetFilmImageId(item.id).then((item: any) => {
        setfilmimages(item);
      });
    });
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <FilmCard
        item={film && film}
        itemimage={filmimages && filmimages}
      ></FilmCard>
      ;
    </div>
  );
}

export default Detail;
