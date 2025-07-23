import { useEffect, useState } from "react";
import "../Home.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Home() {
  const user = JSON.parse(localStorage.getItem("googleUser"));
  const email = localStorage.getItem("emailData");
  const name = user?.name || email || "User";

  const [showWelcome, setShowWelcome] = useState(true);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Show welcome message temporarily
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found.");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    }

    setLoading(false);
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=short`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  return (
    <div className="home">
      {showWelcome && <div className="welcome">Welcome back {name}!</div>}

      <header className="header">
        <div className="logo">
          <img src="/header-logo.png" alt="logo" />
        </div>

        <form
          className={`search-container ${isSearchOpen ? "open" : ""}`}
          onSubmit={handleSearchSubmit}
        >
          <button
            type="button"
            className="search-button"
            onClick={handleSearchToggle}
            aria-label="Toggle search"
          >
            🔍
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <main className="content">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <button onClick={() => fetchMovieDetails(movie.imdbID)}>
                More Info
              </button>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedMovie(null)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedMovie(null)}
              >
                ✖
              </button>
              <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
              <h2>
                {selectedMovie.Title} ({selectedMovie.Year})
              </h2>
              <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
              <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
