import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRouter from "./components/PrivateRouter";
import { Home, Login, Register, MovieDetails } from "./pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
