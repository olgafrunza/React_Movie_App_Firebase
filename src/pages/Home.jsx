import MovieCard from "../components/MovieCard/MovieCard";
import { useMovie } from "../context/Movies";
const Home = () => {
  const { movies } = useMovie();

  return (
    <div
      className="page d-flex justify-content-center flex-wrap"
      style={{ backgroundColor: "#555" }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
