import { createSlice } from "@reduxjs/toolkit";

export const listReducers = createSlice({
  name: 'listReducers',
  initialState: {
    user: null,
    news: [],
    loading: {
      token: false,
      user: false,
      news: false
    },
    error: null
  },
  reducers: {
    postAuthRequest: (state) => {
      state.loading.token = true;
      state.error = null;
    },
    postAuthError: (state, action) => {
      state.loading.token = false;
      state.error = action.payload;
    },
    postAuthSuccess: (state, action) => {
      state.loading.token = false;
      state.error = null;
    },
    getUserRequest: (state) => {
      state.loading.user = true;
      state.error = null;
    },
    getUserError: (state, action) => {
      state.loading.user = false;
      state.error = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.loading.user = false;
      state.error = null;
      state.user = action.payload;
    },
    getNewsRequest: (state) => {
      state.loading.news = true;
      state.error = null;
    },
    getNewsError: (state, action) => {
      state.loading.news = false;
      state.error = action.payload;
    },
    getNewsSuccess: (state, action) => {
      state.loading.news = false;
      state.error = null;
      state.news = action.payload;
    },
    stateReset: (state) => {
      state = {
        user: null,
        news: [],
        loading: {
          token: false,
          user: false,
          news: false
        },
        error: null
      };
    }
  }
});

export const {
  postAuthRequest,
  postAuthError,
  postAuthSuccess,
  getUserRequest,
  getUserError,
  getUserSuccess,
  getNewsRequest,
  getNewsError,
  getNewsSuccess,
  stateReset
} = listReducers.actions;
export default listReducers.reducer;