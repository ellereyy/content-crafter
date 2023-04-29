import axios from 'axios';

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }


/* AUTHORIZATION REQUESTS - POSTS
------------------------------------------------------------------------ */

// option 1
export async function getContent() {
  const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
  console.log('✨ getting content')
  const { data } = await axios.get('/api/posts', authHeader);
  return data;
}

// option 2
export async function postContent(post) {
  const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
  console.log('✨ posting content')
  const { data } = await axios.post('/api/posts', post, authHeader)
  return data;
}

export async function updateContent(post, id) {
  const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
  console.log('✨ updating content')
  const { data } = await axios.put(`/api/posts/${id}`, post, authHeader)
  return data;
}

export async function deleteContent(id) {
  const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
  console.log('✨ deleting content')
  const { data } = await axios.delete(`/api/posts/${id}`, authHeader)
  return data;
}

/* AUTHORIZATION REQUESTS - USER
------------------------------------------------------------------------ */

export async function updateCurrentUser(user, id) {
  console.log('✨ updating user')
  const { data } = await axios.put(`/api/users/${id}`, user);
  return data;
}


export async function getCurrentUser() {
  const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
  console.log('✨ getting user')
  const { data } = await axios.get('/api/users', authHeader)
  return data;
}


/* AUTHENTICATION REQUESTS
------------------------------------------------------------------------ */

export async function signUp(user) {
  const { data } = await axios.post('/api/users/signup', user)
  return data
}

export async function logIn(user) {
  const { data } = await axios.post('/api/users/login', user)
  return data
}



export async function getPost(id) {
  console.log('✨ getting individual content')
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
}