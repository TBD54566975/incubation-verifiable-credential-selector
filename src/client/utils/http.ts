import axios from 'axios';

import broker from './broker';
import mockData from './mockData';

const prefix = '';
let meta = ''; // a temporary metadata token for this session

axios.interceptors.response.use(undefined, function (err) {
  broker.postMessage({ error: (err.response || {}).status });
  return Promise.reject(err);
});

export default {
  post<TReturn>(url: string, data: any): Promise<TReturn> {
    if ((<any>window).mock) {
      return new Promise((resolve) => {
        console.log(`Mocking: ${url}`);
        if ((<any>mockData)[url]) {
          const mockedData = (<any>mockData)[url]();
          console.log(`returning:${JSON.stringify(mockedData)}`);
          resolve(mockedData);
        } else {
          resolve({} as TReturn);
        }
      });
    }
    return axios.post(prefix + url, data, { headers: { meta } }).then((res) => {
      if (res.headers.meta) {
        meta = res.headers.meta;
      }
      return res.data;
    });
  },
};
