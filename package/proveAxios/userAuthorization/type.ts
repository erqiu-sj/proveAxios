import { AxiosResponse } from 'axios'

export interface userAuthorizationConf<S = unknown> {
  authorizationRequired?: boolean // 是否需要授权token
  statusExpirationCode?: number // 状态过期码
  refreshToken?: ((response: AxiosResponse<S>) => void | Promise<void>) | null // 刷新token
}
