import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_SEARCH = 'FETCH_SEARCH';

const ROOT_URL = 'http://localhost:3000/';



export function signUpUser(props){
  const request = axios({
    url: `${ROOT_URL}api/users`,
    method: 'post',
    data: props
  });

  return {
    type: SIGN_UP_USER,
    payload: request
  }
}

export function loginUser(creds){
  const request = axios({
    url: `${ROOT_URL}auth`,
    method: 'post',
    data: creds
  });

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function fetchSearchResults(term){
  if (term === undefined){
    term = "";
  }
  const request = axios({
    url: `${ROOT_URL}api/search?search=${term}`,
    method: 'get'
  });

  return {
    type: FETCH_SEARCH,
    payload: request
  }
}
