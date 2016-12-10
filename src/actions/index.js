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
export const FETCH_PICTURES = 'FETCH_PICTURES';
export const UPDATE_LIKES = 'UPDATE_LIKES';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FORCE_RENDER = 'FORCE_RENDER';
export const CHANGE_CONVERSATION = 'CHANGE_CONVERSATION';
export const CREATE_NEW_MESSAGE = 'CREATE_NEW_MESSAGE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const CHANGE_NAMESPACE = 'CHANGE_NAMESPACE';
export const DELETE_FRIENDS_BY_ID = 'DELETE_FRIENDS_BY_ID';
export const DELETE_POST = 'DELETE_POST';


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
    payload: props
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

export function getPictures(){
  const request = axios({
    url: `${ROOT_URL}api/pictures`,
    method: 'get'
  })

  return {
    type: FETCH_PICTURES,
    payload: request
  }
}

export function updateLikes(postid){
  const request = axios({
    url: `${ROOT_URL}api/${postid}/likes`,
    method: 'put'
  })

  return {
    type: UPDATE_LIKES,
    payload: request
  }
}

export function createComment(props) {
  const request = axios({
    url: `${ROOT_URL}api/comments`,
    method: 'post',
    data: props
  })

  return {
    type: CREATE_COMMENT,
    payload: request
  }
}

export function getComments(){
  const request = axios({
    url: `${ROOT_URL}api/comments`,
    method: 'get'
  })

  return {
    type: FETCH_COMMENTS,
    payload: request
  }
}

export function forceRender() {
  return {
    type: FORCE_RENDER,
    payload: 'Render!'
  }
}

export function changeConversation(userid) {
  const request = axios({
    url: `${ROOT_URL}api/${userid}`,
    method: 'get'
  })

  return {
    type: CHANGE_CONVERSATION,
    payload: request
  }
}

export function createMessage(props){
  const request = axios({
    url: `${ROOT_URL}api/messages`,
    method: 'post',
    data: props
  })

  return {
    type: CREATE_NEW_MESSAGE,
    payload: request
  }
}

export function getMessages(){
  const request = axios({
    url: `${ROOT_URL}api/messages`,
    method: 'get'
  })

  return {
    type: FETCH_MESSAGES,
    payload: request
  }
}

export function changeNamespace(namespaceid){
  return {
    type: CHANGE_NAMESPACE,
    payload: namespaceid
  }
}

export function deleteFriendsById(props){
  const request = axios({
    url: `${ROOT_URL}api/friends/profile`,
    method: 'delete',
    data: props
  })

  return {
    type: DELETE_FRIENDS_BY_ID,
    payload: request
  }
}

export function deletePost(postid){
  const request = axios({
    url: `${ROOT_URL}api/posts/${postid}`,
    method: 'delete'
  })

  return {
    type: DELETE_POST,
    payload: request
  }
}
