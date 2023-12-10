import axios from 'axios'
import { url } from './index';

export default {
  postUser(data) {
    return axios.post({
      url: url(`users`),
      data
    })
  }
};