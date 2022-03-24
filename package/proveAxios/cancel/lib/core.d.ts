import { CancelConfig, updateCancelConf } from './index';
export declare const cutter = "$";
export declare const expirationNull = "expirationNull";
export declare const notExpiredCode = "notExpiredCode";
export declare const expirationCode = "expirationCode";
export declare const HEADER_KEY = "extraCancellation";
export declare class AxiosCanceler {
    protected cancelRequestRule: updateCancelConf['cancelRequestRule'];
    constructor(rule: updateCancelConf['cancelRequestRule']);
    setCancelRequestRule(handler: updateCancelConf['cancelRequestRule']): void;
    addPending(config: CancelConfig): void;
    removeAllPending(): void;
    removePending(config: CancelConfig): void;
    getExpiration(url: string): boolean | null;
    reset(): void;
}
