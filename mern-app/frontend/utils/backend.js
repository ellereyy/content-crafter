import axios from 'axios';

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }


/* AUTHORIZATION REQUESTS - POSTS
------------------------------------------------------------------------ */

export async function getContent() {
  const { data } = await axios.get('/api/posts', authHeader);
  return data;
}

export async function postContent(content) {
  const { data } = await axios.post('/api/posts', content, authHeader)
  return data;
}

export async function updateContent(post, id) {
  const { data } = await axios.put(`/api/posts/${id}`, post, authHeader)
  return data;
}

export async function deleteContent(id) {
  const { data } = await axios.delete(`/api/posts/${id}`, authHeader)
  return data;
}

/* AUTHORIZATION REQUESTS - USER
------------------------------------------------------------------------ */

export async function updateCurrentUser(user, id) {
  console.log('backend.js function')
  console.log(user, id);
  const { data } = await axios.put(`/api/users/${id}`, user);
  return data;
}


export async function getCurrentUser() {
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



// export async function getPost(id) {
//   const { data } = await axios.get(`/api/posts/${id}`);
//   return data;
// }