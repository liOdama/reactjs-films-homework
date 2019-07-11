import itemsIsLoadingAction from '../modules/isLoading/isLoadingAction';
import { itemsFetchDataSuccess, fetchVideoSuccess, clearResults } from '../modules/root/rootAction';
import setMainMovieDetails from '../modules/mainMovie/mainMovieAction';
import itemsHasErrored from '../modules/Error/errorAction';

const KEY = '75331f1a740385460b25b56203149aa8';

const requestsFilms = {
  fetchListMovies: (dispatch, query) => {
    let url;
    // const id = query.replace(/\/[genre]/g);
    switch (query) {
      case 'coming_soon':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`;
        break;
      case 'trending':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
        break;
      case '/':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
        break;
      case 'top_rated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`;
        break;
      default:
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${query}`;
    }
    dispatch(itemsIsLoadingAction(true));
    return fetch(url)
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoadingAction(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        return dispatch(
          itemsFetchDataSuccess({
            page: data.page,
            results: data.results,
          }),
        );
      })
      .catch(err => dispatch(itemsHasErrored(err)));
  },
  getMainMovieDetails: (dispatch, id) => {
    dispatch(itemsIsLoadingAction(true));
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=75331f1a740385460b25b56203149aa8&language=en-US`,
    )
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoadingAction(false));
        if (data.ok === false) {
          throw new Error('Something wrong');
        }
        return dispatch(setMainMovieDetails(data));
      })
      .catch(err => dispatch(itemsHasErrored(err)));
  },

  fetchVideo: (dispatch, id) => {
    dispatch(itemsIsLoadingAction(true));
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`)
      .then(resp => resp.json())
      .then((data) => {
        dispatch(itemsIsLoadingAction(false));
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
      })
      .catch(err => dispatch(itemsHasErrored(err)));
  },

  fetchSearchResults: (dispatch, query) => {
    dispatch(itemsIsLoadingAction(true));
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query.replace(
        '%20',
        '',
      )}&page=1&include_adult=false`,
    )
      .then(resp => resp.json())
      .then((data) => {
        if (data.results.length === 0) {
          dispatch(clearResults());
          throw new Error('Nothing found');
        }
        dispatch(itemsIsLoadingAction(false));
        return dispatch(
          itemsFetchDataSuccess({
            page: data.page,
            results: data.results,
          }),
        );
      })
      .catch(err => dispatch(itemsHasErrored(err.message)));
  },
};

export default requestsFilms;
