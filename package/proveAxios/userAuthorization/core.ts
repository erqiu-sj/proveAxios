import { dynamicModule, priority, dynamicModuleSuccessInstall, decisionInstaller, interceptorsResponseSuccess } from '@zealforchange/proveaxios'
import axios, { AxiosResponse } from 'axios'
import { userAuthorizationConf } from './type'

const h: userAuthorizationConf = {
  statusExpirationCode: 401,
  refreshToken: null,
  authorizationRequired: false,
}

@dynamicModule({ priority: priority.TOP })
export class UserAuthorization {
  @interceptorsResponseSuccess()
  static async res(resp: AxiosResponse) {
    await h.refreshToken?.(resp)
    const latestAuthorizationResult = await axios(resp.config)
    return Promise.resolve(latestAuthorizationResult)
  }

  @dynamicModuleSuccessInstall(decisionInstaller.installResSuc)
  static installSuc(res: AxiosResponse<{ code: number }>) {
    if (!h.authorizationRequired) return false
    if (res.data.code === h.statusExpirationCode) {
      return true
    }
    return false
  }
}

export function useUserAuthorizationHelper<S>(conf: userAuthorizationConf) {
  h.statusExpirationCode = conf.statusExpirationCode
  h.refreshToken = conf.refreshToken || null
  h.authorizationRequired = conf.authorizationRequired
}
