const selectGenre = function selectGenre(props, e) {
  const { genres, error, clearError } = props;
  const genre = e.target.value || e.target.textContent.replace(/[^A-Za-z\s]/g, '');
  let genreId;
  genres.some((a) => {
    if (genre === a.name) {
      genreId = a.id;
      return true;
    }
    return false;
  });
  if (error !== undefined && error !== '') {
    clearError(false);
  }
  props.history.push(`/genre/${genreId}`);
};

export const keydonwGenres = (props, e) => {
  if (e.key === 'Enter') {
    selectGenre(props, e);
  }
  return props;
};

export default selectGenre;
