import { retryAfterTimeoutOps } from './type';
declare const retryAfterTimeoutDisplayName = "retryAfterTimeout";
export declare class RetryAfterTimeout {
    static resErr(err: unknown): Promise<unknown>;
    static resErrInstall(err: any): boolean;
}
export { retryAfterTimeoutDisplayName };
export type { retryAfterTimeoutOps };
