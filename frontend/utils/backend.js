import axios from 'axios';

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }


/* AUTHORIZATION REQUESTS - POSTS
------------------------------------------------------------------------ */

// option 1
export async function getContent(auth) {
  console.log(authHeader)
  const { data } = await axios.get('/api/posts', auth);
  return data;
}

// option 2
export async function postContent(content) {
  const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
  const { data } = await axios.post('/api/posts', content, authHeader)
  return data;
}

export async function updateContent(post, id, auth) {
  const { data } = await axios.put(`/api/posts/${id}`, post, auth)
  return data;
}

export async function deleteContent(id, auth) {
  const { data } = await axios.delete(`/api/posts/${id}`, auth)
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


export async function getCurrentUser( auth ) {
  console.log(auth)
  const { data } = await axios.get('/api/users', auth)
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