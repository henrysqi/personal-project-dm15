import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';

const ROOT_URL = 'http://localhost:3000/';



export function signUpUser(props){
  const request = axios.post(`${ROOT_URL}api/users`, props)

  return {
    type: SIGN_UP_USER,
    payload: request
  }
}

export function loginUser(props){
  const request = axios.post(`${ROOT_URL}auth`, props).then((res) => {
    console.log(res)
    sessionStorage.setItem('myToken', res.data.token);
    console.log(sessionStorage)
  })

  return {
    type: LOGIN_USER,
    payload: request
  }
}
