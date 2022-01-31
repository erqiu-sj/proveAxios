import { AxiosResponse } from 'axios'

export interface userAuthorizationConf<S = unknown> {
  authorizationRequired?: boolean
  statusExpirationCode?: number
  refreshToken?: ((response: AxiosResponse<S>) => void | Promise<void>) | null
}

export declare class UserAuthorization {
  static res(resp: AxiosResponse): Promise<AxiosResponse<any, any>>
  static installSuc(
    res: AxiosResponse<{
      code: number
    }>
  ): boolean
}

export declare function useUserAuthorizationHelper<S>(conf: userAuthorizationConf): void
