/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NetoForm from "./components/NetoForm";
import NetoHeader from "./components/NetoHeader";
import NetoList from "./components/NetoList";
import NetoLogout from "./components/NetoLogout";
import NetoPlug from "./components/NetoPlug";
import NetoError from "./components/NetoError";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAuth, fetchGetUser } from "./store/middleware";
import { stateReset } from "./store/listReducers";
import NetoLoader from "./components/NetoLoader";

export default function App() {
  const [input, setInput] = useState({
    login: '',
    password: ''
  });
  const token = JSON.parse(localStorage.getItem('token'));
  const state = useSelector(state => state.listReducers);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, news, error, loading } = state;

  useEffect(() => {
    if (token) {
      dispatch(fetchGetUser(token));
    };
  }, []);

  useEffect(() => {
    if (loading.news) {
      navigate("/news");
    };
  }, [loading.news]);

  function handleInputLogin(ev) {
    setInput((prev) => ({...prev, login: ev.target.value}));
  };

  function handleInputPassword(ev) {
    setInput((prev) => ({...prev, password: ev.target.value}));
  };

  function handleClickIn(ev) {
    if (input.login !== '' && input.password !== '') {
      dispatch(fetchPostAuth(input));
      ev.preventDefault();
      setInput({
        login: '',
        password: ''
      });
    };
  };

  function handleClickOut() {
    localStorage.removeItem('token');
    dispatch(stateReset());
  };

  if (loading.token || loading.user) {
    return (
      <>
        <NetoHeader>
          <NetoLoader styleName={"loader-auth"}/>
        </NetoHeader>
        <NetoPlug/>
      </>
    );
  };


  if (error) {
    return (
      <>
        <NetoHeader>
          <NetoForm
            login={input.login}
            password={input.password}
            handleInputLogin={handleInputLogin}
            handleInputPassword={handleInputPassword}
            handleClickIn={handleClickIn}/>
        </NetoHeader>
        <NetoError error={error}/>
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NetoHeader>
            <NetoForm
              login={input.login}
              password={input.password}
              handleInputLogin={handleInputLogin}
              handleInputPassword={handleInputPassword}
              handleClickIn={handleClickIn}/>
          </NetoHeader>
          <NetoPlug/>
        </>
      }/>
      <Route path="/news" element={!loading.news ? (
          <>
            <NetoHeader>
              <NetoLogout
                user={user}
                handleClickOut={handleClickOut}/>
            </NetoHeader>
            <NetoList news={news} />
          </>
          ) : (token ? <NetoLoader/> :
              <NetoError error={error}/>)
        }/>
      <Route path="*" element={<NetoError error={error}/>}/>
    </Routes>
  );
};
