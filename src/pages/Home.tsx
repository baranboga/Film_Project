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
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  FilmType,
  GetEnFilms,
  GetFilmsBySearch,
  GetTrFilms,
  getFilms,
  getTopFilms,
} from "../requests/filmrequests";
import { İmageUrl } from "../requests/apiConfig";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { selectKeyword } from "../redux/slice";
import Dateİcon from "@mui/icons-material/CalendarToday";
import Starİcon from "@mui/icons-material/Star";

const ExampleComponent: React.FC = () => {
  const [films, setfilms] = useState<FilmType[]>([]);
  const [TopFilms, setTopFilms] = useState<FilmType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let keyy = useSelector(selectKeyword);

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

  useEffect(() => {
    if (keyy.length > 2) {
      GetFilmsBySearch(keyy).then((films: any) => {
        setfilms(films.results);
      });
    }

    if (keyy === "") {
      getFilms()
        .then((item) => {
          setfilms(item.results);
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [keyy]);

  function truncateString(str: any, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: window.innerWidth > 768 ? 5 : 3,
    slidesToScroll: window.innerWidth > 768 ? 4 : 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const Latest = () => {
    getFilms().then((item: any) => {
      const filmsWithDates = item.results.map(
        (film: { release_date: string | number | Date }) => ({
          ...film,
          release_date: new Date(film.release_date),
        })
      );

      const sortedFilms = filmsWithDates.sort(
        (a: any, b: any) => b.release_date - a.release_date
      );

      setfilms(sortedFilms);
    
    });
  };

  const Oldest = () => {
    getFilms().then((item: any) => {
      const filmsWithDates = item.results.map(
        (film: { release_date: string | number | Date }) => ({
          ...film,
          release_date: new Date(film.release_date),
        })
      );

      const sortedFilms = filmsWithDates.sort(
        (a: any, b: any) => a.release_date - b.release_date
      );

      setfilms(sortedFilms);
    
    });
  };

  const BestVote = () => {
    getFilms().then((item: any) => {
      const sortedFilms = item.results.sort(
        (a: any, b: any) => b.vote_average - a.vote_average
      );

      setfilms(sortedFilms);
      
    });
  };

  const WorstVote = () => {
    getFilms().then((item: any) => {
      const sortedFilms = item.results.sort(
        (a: any, b: any) => a.vote_average - b.vote_average
      );

      setfilms(sortedFilms);
    
    });
  };

  const TrFilms = () => {
    GetTrFilms().then((item: any) => {
      setfilms(item.results);
    });
  };

  const EnFilms = () => {
    GetEnFilms().then((item: any) => {
      setfilms(item.results);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        marginBottom: "150px",
      }}
    >
      <div style={{ marginBottom: "100px" }}>
        <Slider {...settings}>
          {TopFilms.map((film, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                onClick={() => navigate(`detail/${film.id}`)}
                style={{
                  height: "300px",
                  width: "200px",
                  borderRadius: "150px",
                  transition: "transform 0.3s",
                }}
                src={İmageUrl + film.poster_path}
                alt={film.title}
                onMouseEnter={(e) => {
                  if (e.target instanceof HTMLImageElement) {
                    e.target.style.transform = "scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (e.target instanceof HTMLImageElement) {
                    e.target.style.transform = "scale(1)";
                  }
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="d-flex">
        <div className="dropdown me-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Türe Göre
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  TrFilms();
                }}
              >
                Yerli
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  EnFilms();
                }}
              >
                Yabancı
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown me-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tarihe Göre
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  Latest();
                }}
              >
                En Yeni
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  Oldest();
                }}
                className="dropdown-item"
                href="#"
              >
                En Eski
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown me-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Puana göre
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  BestVote();
                }}
              >
                En Yüksek Puan
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  WorstVote();
                }}
                className="dropdown-item"
                href="#"
              >
                En Düşük Puan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Grid
        container
        spacing={2}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {films != null
          ? films.map((film, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <CardHeader
                    title={truncateString(
                      film.title ? film.title : film.name,
                      22
                    )}
                  />
                  <div
                    className="card-media-container"
                    onClick={() => navigate(`detail/${film.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      width="100%"
                      image={İmageUrl + film.poster_path}
                      alt={film.title}
                      style={{
                        objectFit: "cover", // Resmin içindeki div'e sığmasını sağlar
                        width: "100%", // Resmin genişliğini tamamen doldurması için
                        height: "100%",
                      }}
                    />
                  </div>

                  <CardContent>
                    <Dateİcon></Dateİcon>

                    {film.release_date
                      ? new Date(film.release_date).toLocaleDateString()
                      : new Date(film.first_air_date).toLocaleDateString()}
                  </CardContent>
                  <CardActions className="ms-2">
                    <Starİcon sx={{ color: "yellow" }}></Starİcon>
                    {parseFloat(film.vote_average).toFixed(2)}
                  </CardActions>
                </Card>
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
};

export default ExampleComponent;
