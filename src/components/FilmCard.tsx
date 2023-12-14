import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import { İmageUrl } from "../requests/apiConfig";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paid from "@mui/icons-material/Theaters";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { addfavorite } from "../redux/slice";
import Slider from "react-slick";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard: React.FC<any> = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [filmimages, setfilmimages] = React.useState([]);
  const favoriteitem = useSelector((state: any) => state.favoriteitem);
  const [value, setValue] = React.useState<number | null>(2);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const papers = [
    {
      title: "Release date",
      info: props.item ? props.item.release_date : "",
      elevation: 1,
      color: "red",
    },
    {
      title: "Popularity",
      info: props.item ? props.item.popularity : "",
      elevation: 1,
      color: "yellow",
    },
    {
      title: "Budget",
      info: props.item ? props.item.budget + "$" : "",
      elevation: 1,
      color: "green",
    },
    {
      title: "Language",
      info: props.item ? props.item.original_language.toUpperCase() : "",
      elevation: 1,
      color: "purple",
    },
    {
      title: "İmbd Id",
      info: props.item ? props.item.imdb_id : "",
      elevation: 1,
      color: "grey",
    },
  ];

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);

    dispatch(addfavorite(props.item));
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: window.innerWidth > 768 ? 3 : 3,
    slidesToScroll: window.innerWidth > 768 ? 3 : 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  React.useEffect(() => {}, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div style={{ marginTop: "5rem", marginBottom: "10rem" }}>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            {props.item && (
              <Card sx={{ maxWidth: 445, marginLeft: "50px" }}>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={props.item.original_title}
                  subheader={props.item.release_date}
                />
                <CardMedia
                  component="img"
                  height="450"
                  image={İmageUrl + props.item.poster_path}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {props.item.overview}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    onClick={handleToggleFavorite}
                    aria-label="add to favorites"
                  >
                    {isFavorite ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteIcon />
                    )}
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            )}
          </div>
          <div className="col-md-12 col-lg-6 p-1">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 128,
                  height: 128,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {papers.map((paper, index) => (
                <>
                  <Paid />
                  <Paper
                    key={index}
                    elevation={paper.elevation}
                    style={{ backgroundColor: paper.color, overflow: "hidden" }}
                  >
                    <Typography
                      style={{ marginBottom: "40px", fontStyle: "italic" }}
                      variant="subtitle1"
                    >
                      {paper.title}
                    </Typography>
                    <Typography
                      style={{ marginBottom: "10px" }}
                      variant="subtitle1"
                    >
                      {paper.info}
                    </Typography>
                  </Paper>
                </>
              ))}
            </Box>
            <div>
              <Slider {...settings}>
                {props.itemimage &&
                  props.itemimage.posters
                    .slice(0, 5)
                    .map((film: any, index: any) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          style={{
                            height: "300px",
                            width: "200px",
                            borderRadius: "150px",
                            transition: "transform 0.3s",
                          }}
                          src={İmageUrl + film.file_path}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeReviewCard;
