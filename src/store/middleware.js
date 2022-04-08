import {
  postAuthRequest,
  postAuthError,
  postAuthSuccess,
  getUserRequest,
  getUserError,
  getUserSuccess,
  getNewsRequest,
  getNewsError,
  getNewsSuccess,
} from './listReducers';

export function fetchPostAuth(input) {
  return async (dispatch) => {
    dispatch(postAuthRequest());
    await fetch(process.env.REACT_APP_AUTH, {
      method: 'POST',
      body: JSON.stringify(input)
      })
      .then(resp => {
        if(resp.status === 400) {
          localStorage.removeItem('token');
          throw new Error('user not found');
        }
        return resp.json();
      })
      .then(token => {
        dispatch(postAuthSuccess(token));
        localStorage.setItem('token', JSON.stringify(token));
        dispatch(fetchGetUser(token));
      })
      .catch(() => dispatch(postAuthError('user not found')));
  }
}

export function fetchGetUser(token) {
  return (dispatch) => {
    dispatch(getUserRequest());
    fetch(process.env.REACT_APP_ME, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.token
      }
    })
      .then(resp => {
        if(resp.status === 401) {
          localStorage.removeItem('token');
          throw new Error('401 Unauthorized');
        }
        return resp.json();
      })
      .then(json => {
        dispatch(getUserSuccess(json));
        dispatch(fetchGetNews(token));
      })
      .catch(() => dispatch(getUserError('401 Unauthorized')));
  }
}

export function fetchGetNews(token) {
  return (dispatch) => {
    dispatch(getNewsRequest());
    fetch(process.env.REACT_APP_NEWS, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.token
      }
    })
      .then(resp => {
        if(resp.status === 401) {
          localStorage.removeItem('token');
          throw new Error('401 Unauthorized not news');
        };
        return resp.json();
      })
      .then(json => dispatch(getNewsSuccess(json)))
      .catch(() => dispatch(getNewsError('401 Unauthorized not news')));
  }
}