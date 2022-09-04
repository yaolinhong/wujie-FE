// 用户登录参数
export interface LoginParams {
  account: string;
  password: string;
}

/**
 * @description 登录成功返回结果
 */
export interface LoginResult {
  username: string;
  avatar: string;
  token: string;
}
export interface XcolorParams {
  number: string;
}
export type XcolorResult = Array<{
  hex: string;
  hsl: string;
  rgb: string;
}>;
