import { AxiosResponse } from 'axios';
import { userAuthorizationConf } from './type';
export declare class UserAuthorization {
    static res(resp: AxiosResponse): Promise<any>;
    static installSuc(res: AxiosResponse<{
        code: number;
    }>): boolean;
}
export declare function useUserAuthorizationHelper<S>(conf: userAuthorizationConf): void;
