import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  CardHeader,
  CardActions,
  Rating,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  FilmType,
  GetFilmsBySearch,
  getFilms,
  getTopFilms,
} from "../requests/filmrequests";
import { İmageUrl } from "../requests/apiConfig";
import { useNavigate } from "react-router-dom";
import { selectFavoriteList } from "../redux/slice";

const ExampleComponent: React.FC = () => {
  const [films, setfilms] = useState<FilmType[]>([]);
  const [TopFilms, setTopFilms] = useState<FilmType[]>([]);;
  let favoritefilms = useSelector(selectFavoriteList);
  const [value, setValue] = React.useState<number | null>(2);

  useEffect(() => {
    getTopFilms().then((films: any) => {
      setTopFilms(films.results);
    });
    getFilms()
      .then((item) => {
        setfilms(item.results);
       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function truncateString(str: any, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{display:"flex",justifyContent:"center",marginLeft:"70px",marginTop:"40px"}}>
          <h3 style={{fontFamily:"monospace",fontStyle:"italic"}} >Favori Filmlerim</h3>
        </div>
   
      <Grid
        container
        spacing={2}
        style={{ paddingTop: "20px", paddingBottom: "20px",marginBottom:"100px" }}
      >
    
        {favoritefilms.length > 0 ? (
          favoritefilms.map((film, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardHeader
                  title={truncateString(
                    film.original_title
                      ? film.original_title
                      : film.original_title,
                    26
                  )}
                />
                <div className="card-media-container">
                  <CardMedia
                    component="img"
                    height="300"
                    width="100%"
                    image={İmageUrl + film.poster_path}
                    alt={film.original_title}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <CardContent>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              marginLeft: "100px",
            }}
          >
            <h4>
              Henüz Favori bir Filminiz bulunmamaktadır. Lütfen ekleyiniz..
            </h4>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default ExampleComponent;
