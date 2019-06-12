const selectGenre = function selectGenre(e) {
  const { genres, fetchMoviesOnGenre } = this.props || this;
  const genre = e.target.value || e.target.textContent.replace(/[^A-Za-z\s]/g, '');
  let genreId;
  genres.some((a) => {
    if (genre === a.name) { genreId = a.id; return true; }
    return false;
  });
  return fetchMoviesOnGenre(genreId);
};

export const keydonwGenres = (props, e) => {
  if (e.key === 'Enter') {
    selectGenre.call(props, e);
  }
  return props;
};

export default selectGenre;
