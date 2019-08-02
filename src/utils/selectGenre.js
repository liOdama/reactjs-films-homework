const selectGenre = function selectGenre(props, e) {
  const genreId = e.target.value;
  props.history.push(`/genre/${genreId}`);
};

export const keydonwGenres = (props, e) => {
  if (e.key === 'Enter') {
    selectGenre(props, e);
  }
  return props;
};

export default selectGenre;
