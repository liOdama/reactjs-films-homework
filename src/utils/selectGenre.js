const selectGenre = function selectGenre(e) {
  const { genres, fetchMoviesOnGenre } = this.props || this;
  const genre = e.target.value || e.target.textContent.replace(/[^A-Za-z]/g, '');
  let genreId;
  genres.some((a) => {
    if (genre === a.name) { genreId = a.id; return true; }
    return false;
  });
  fetchMoviesOnGenre(genreId);
};

export default selectGenre;
