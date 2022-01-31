import { AxiosResponse } from 'axios';
export interface userAuthorizationConf<S = unknown> {
    authorizationRequired?: boolean;
    statusExpirationCode?: number;
    refreshToken?: ((response: AxiosResponse<S>) => void | Promise<void>) | null;
}
