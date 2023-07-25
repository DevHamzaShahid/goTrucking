import axios from 'axios';
import { config } from '../config';

// Set config defaults when creating the instance

export const Axios = axios.create({
  baseURL: `${config.SERVER_IP}`,
});

// Add a request interceptor
Axios.interceptors.request.use(
  request => {
    const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmQ3Njc0NmI5ZTZlMDAyMTM5NWRmNyIsImlhdCI6MTY5MDI2NjA2OX0.Lc749CylwXQJPjyOMl1FO-Wt6Soe0mHoDCxfRtgmviI"
    // const AUTH_TOKEN =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDVjMjY5NjE5YzdkMDAyMzZlZjczNSIsImlhdCI6MTY2NTU3MjA3NX0.Qgqp2N9mweDuoQBiFG17baQAbQJ7x2Q-HOWU0SEl6yo';
    console.log(request);
    request.headers = {
      ...request.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: AUTH_TOKEN,
      Authorization: `Bearer ${AUTH_TOKEN}`,
    };

    // Do something before request is sent
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  response => {
    console.log(response);

    return response;
  },
  error => {
    console.log('response error');

    return Promise.reject(error);
  },
);
