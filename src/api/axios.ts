import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://thebetter.bsgroup.eu',
});

export default instance;
