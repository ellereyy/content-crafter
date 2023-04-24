import axios from 'axios';
import openai from 'openai';

export async function getContent() {
  const { data } = await axios.get('/api/posts');
  return data;
}

export async function postContent(content) {
  const { data } = await axios.post('/api/posts', content)
  return data;
}

export async function updateContent(content) {
  const { data } = await axios.put('/api/posts', content)
  return data;
}

export async function deleteContent(content) {
  const { data } = await axios.delete('/api/posts', content)
  return data;
}