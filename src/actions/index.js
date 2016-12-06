import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_SEARCH = 'FETCH_SEARCH';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_NAME_BY_ID = 'FETCH_NAME_BY_ID';
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const UPDATE_FRIENDS_RESOLVED = 'UPDATE_FRIENDS_RESOLVED';
export const DELETE_FRIENDS = 'DELETE_FRIENDS';
export const UPDATE_PROFILE_PIC = 'UPDATE_PROFILE_PIC';
export const UPDATE_COVER_PHOTO = 'UPDATE_COVER_PHOTO';
export const CREATE_PICTURE = 'CREATE_PICTURE';


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

export function fetchPosts(){
  const request = axios({
    url: `${ROOT_URL}api/posts`,
    method: 'get'
  })

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchNameById(id){
  const request = axios({
    url: `${ROOT_URL}api/name?id=${id}`,
    method: 'get'
  })

  return {
    type: FETCH_NAME_BY_ID,
    payload: request
  }
}

export function fetchUserById(id){
  const request = axios({
    url: `${ROOT_URL}api/${id}`,
    method: 'get'
  })

  return {
    type: FETCH_USER_BY_ID,
    payload: request
  }
}

export function friendRequest(props){
  const request = axios({
    url: `${ROOT_URL}api/friends`,
    method: 'post',
    data: props
  })

  return {
    type: FRIEND_REQUEST,
    payload: request
  }
}

export function fetchFriends(){
  const request = axios({
    url: `${ROOT_URL}api/friends/all`,
    method: 'get'
  })

  return {
    type: FETCH_FRIENDS,
    payload: request
  }
}

export function updateFriendsResolved(props){
  const request = axios({
    url: `${ROOT_URL}api/friends`,
    method: 'put',
    data: props
  })

  return {
    type: UPDATE_FRIENDS_RESOLVED,
    payload: props
  }
}

export function deleteFriends(pair){
  const request = axios({
    url: `${ROOT_URL}api/friends`,
    method: 'delete',
    data: pair
  })

  return {
    type: DELETE_FRIENDS,
    payload: request
  }
}

export function updateProfilePic(id, props){
  const request = axios({
    url: `${ROOT_URL}api/${id}/profilepic`,
    method: 'put',
    data: props
  })

  return {
    type: UPDATE_PROFILE_PIC,
    payload: request
  }
}

export function updateCoverPhoto(id, props){
  const request = axios({
    url: `${ROOT_URL}api/${id}/coverphoto`,
    method: 'put',
    data: props
  })

  return {
    type: UPDATE_COVER_PHOTO,
    payload: request
  }
}

export function createPicture(id, props) {
  const request = axios({
    url: `${ROOT_URL}api/${id}/pictures`,
    method: 'post',
    data: props
  })

  return {
    type: CREATE_PICTURE,
    payload: request
  }
}
