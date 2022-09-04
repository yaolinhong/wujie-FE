import { LoginParams, LoginResult, XcolorParams, XcolorResult } from './models/userModel';
import request from '@/utils/request';
import Domain from '@/api/domain';

enum Api {
  getUserId = '/base/appLogin' // 获取用户userid
}
// get params会拼接到url后面
// post data不会拼

// 根据code获取userid / token
export function getUserId(data: LoginParams) {
  return request<LoginResult>({
    url: Api.getUserId,
    method: 'post',
    data
  });
}
// 随机获取颜色接口
export function getRankList(params: XcolorParams) {
  console.log('🚀 ~ file: user.ts ~ line 24 ~ getRankList ~ data', params);
  return request<XcolorResult>({
    url: Domain.interface.login.fetchColor,
    method: 'get',
    params
  });
}
