import axios from 'axios';

export async function getContent(url) {
  const data = await axios.get(url);
  return data;
}