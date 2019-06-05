import { itemsHasErrored, itemsIsLoading } from '../modules/isLoading/isLoadingAction';
import { itemsFetchDataSuccess, fetchVideoSuccess } from '../modules/root/rootAction';
import setMainMovieDetails from '../modules/mainMovie/mainMovieAction';

const KEY = '75331f1a740385460b25b56203149aa8';

const requestsFilms = {
  fetchComingSoon: () => (dispatch) => {
    dispatch(itemsIsLoading(true));
    return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1')
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoading(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        return dispatch(itemsFetchDataSuccess({
          page: data.page, results: data.results,
        }));
      }).catch(err => dispatch(itemsHasErrored(err)));
  },
  fetchMoviesOnGenre: id => (dispatch) => {
    dispatch(itemsIsLoading(true));
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${id}`)
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoading(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        return dispatch(itemsFetchDataSuccess({
          page: data.page, results: data.results,
        }));
      }).catch(err => dispatch(itemsHasErrored(err)));
  },
  getTopRated: () => (dispatch) => {
    dispatch(itemsIsLoading(true));
    return fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1')
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoading(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        return dispatch(itemsFetchDataSuccess({
          page: data.page, results: data.results,
        }));
      }).catch(err => dispatch(itemsHasErrored(err)));
  },
  fetchPopular: () => (dispatch) => {
    dispatch(itemsIsLoading(true));
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`)
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoading(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        return dispatch(itemsFetchDataSuccess({
          page: data.page, results: data.results,
        }));
      }).catch(err => dispatch(itemsHasErrored(err)));
  },
  getMainMovieDetails: id => dispatch => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=75331f1a740385460b25b56203149aa8&language=en-US`)
    .then(resp => resp.json())
    .then((data) => {
      if (data.ok === false) {
        throw new Error('Something wrong');
      }
      return dispatch(setMainMovieDetails(data));
    }).catch(err => dispatch(itemsHasErrored(err))),

  fetchVideo: id => (dispatch) => {
    dispatch(itemsIsLoading(true));
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`)
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoading(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        let videoId = '';
        data.results.some((curr) => {
          if (curr.type === 'Trailer') {
            videoId = curr.key;
            return true;
          }
          return false;
        });
        return dispatch(fetchVideoSuccess(videoId));
      }).catch(err => dispatch(itemsHasErrored(err)));
  },
};

export default requestsFilms;
