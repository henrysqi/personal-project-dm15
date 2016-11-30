import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';

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
