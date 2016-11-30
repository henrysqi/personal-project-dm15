import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';

const ROOT_URL = 'http://localhost:3000/';



export function signUpUser(props){
  const request = axios.post(`${ROOT_URL}api/users`, props);

  return {
    type: SIGN_UP_USER,
    payload: request
  }
}

export function loginUser(creds){
  const request = axios.post(`${ROOT_URL}auth`, creds);

  return {
    type: LOGIN_USER,
    payload: request
  }
}
