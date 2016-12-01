import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_SEARCH = 'FETCH_SEARCH';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_NAME_BY_ID = 'FETCH_NAME_BY_ID';

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
///////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////
export function createNewPost(props){
  const request = axios({
    url: `${ROOT_URL}api/posts`,
    method: 'post',
    data: props
  })

  return {
    type: CREATE_POST,
    payload: props
  }
}

export function fetchPosts(props){
  const request = axios({
    url: `${ROOT_URL}api/posts`,
    method: 'get'
  })

  return {
    type: FETCH_POSTS,
    payload: props
  }
}

export function fetchNameById(id){
  const request = axios({
    url: `${ROOT_URL}api/name?id=${id}`,
    method: 'get'
  })

  return {
    type: FETCH_NAME_BY_ID,
    payload: props
  }
}
