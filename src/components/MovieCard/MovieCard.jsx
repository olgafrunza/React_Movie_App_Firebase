import classes from "./MovieCard.module.css";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/noimage.jpg";

const MovieCard = (props) => {
  const { title, poster_path, overview, vote_average, id } = props.movie;
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const setVoteColor = (vote) => {
    if (vote >= 8) return "green";
    else if (vote >= 6.5) return "goldenrod";
    else return "red";
  };

  return (
    <div className={classes.movie} onClick={() => navigate(`/details/${id}`)}>
      {poster_path && <img src={`${imgUrl}${poster_path}`} alt="" />}
      {!poster_path && <img src={noImage} alt="" />}
      <div
        className="text-center p-2 text-white"
        style={{ borderTop: "1px solid white" }}
      >
        <h5>{title}</h5>
        {currentUser && (
          <span
            className={classes.vote}
            style={{ backgroundColor: setVoteColor(vote_average) }}
          >
            {vote_average}
          </span>
        )}
      </div>
      <div className={classes.overview}>
        <h2>Overview</h2>
        <h5>{title}</h5>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
