import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
// TODO fix
// import { showToast, showLoadingToast, closeToast } from 'vant';
import { ContentTypeEnum } from './httpEnum';
import Domain from '@/api/domain';
// import { useUserStore } from '@/store/modules/user';
import router from '@/router';

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
});
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean;
}

interface BaseResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

// request拦截器 request interceptor
service.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 不传递默认开启loading
    if (!config.hideLoading) {
      // loading
      showLoadingToast({ message: '加载中', forbidClick: true });
    }
    // const userStore = useUserStore();
    // console.log(userStore, "store.getters['user']");
    // if (userStore.token && config.headers) {
    //   config.headers['X-Token'] = userStore.token;
    // }
    const contentType = config.headers?.['content-type'] || config.headers?.['Content-Type'];
    const data = config.data;
    if (config.method?.toLocaleUpperCase() == 'POST' && data) {
      if (ContentTypeEnum.FORM_DATA == contentType) {
        const fd = new FormData();
        Object.keys(data).forEach((key) => fd.append(key, data[key]));
        config.data = fd;
      } else if (ContentTypeEnum.FORM_URLENCODED == contentType) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    closeToast();
    const res = response.data;
    if (res.code && res.code !== 200) {
      // 登录超时,重新登录
      if (res.code === 401) {
        // store.dispatch('FedLogOut').then(() => {
        //   location.reload()
        // })
        router.replace('/error');
      } else {
        Toast.fail(res.msg || '服务器访问出错了~');
      }
      return Promise.reject(res || 'error');
    } else {
      return Promise.resolve(response);
    }
  },
  (error: Error) => {
    if (error.message?.includes('timeout')) {
      Toast.fail('请求超时!');
    }
    console.log(`err${error}`); // for debug
    return Promise.reject(error);
  }
);

const mapUrl = (config) => {
  const domainList = Object.keys(Domain.Proxy.domain);
  console.log('🚀 ~ file: request.ts ~ line 90 ~ mapUrl ~ domainList', domainList);
  const requestDomain = config.url && config.url.split('/')[1];
  console.log('🚀 ~ file: request.ts ~ line 92 ~ mapUrl ~ requestDomain', requestDomain);
  console.log(
    '🚀 ~ file: request.ts ~ line 92 ~ mapUrl ~ domainList.includes(requestDomain)',
    domainList.includes(requestDomain)
  );
  console.log('🚀 ~ file: request.ts ~ line 92 ~ mapUrl ~ config.url', config.url);
  console.log('🚀 ~ file: request.ts ~ line 92 ~ mapUrl ~ requestDomain', requestDomain);
  if (config.url && requestDomain && domainList.includes(requestDomain)) {
    const tmp = config.url.split('/');
    tmp.splice(0, 2);
    config.url = `${Domain.Proxy.domain[requestDomain][import.meta.env.VITE_ENV]}/${tmp.join('/')}`;
    console.log('🚀 ~ file: request.ts ~ line 98 ~ mapUrl ~ config.url', config.url);
  }
};

const request = <T = any>(config: CustomAxiosRequestConfig): Promise<BaseResponse<T>> => {
  // 生产环境
  if (import.meta.env.PROD) {
    console.log(
      '🚀 ~ file: request.ts ~ line 101 ~ request ~ import.meta.env.PROD',
      import.meta.env.PROD
    );
    mapUrl(config);
    console.log('🚀 ~ file: request.ts ~ line 95 ~ mapUrl ~ config.url', config.url);
  }
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export default request;
