import 'reflect-metadata';
import { AxiosResponse, AxiosInstance } from 'axios';
export declare type interceptorsResponseSuccessTypes = (conf: AxiosResponse) => Promise<AxiosResponse>;
export declare function interceptorsResponseSuccess(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseSuccessTypes>) => TypedPropertyDescriptor<interceptorsResponseSuccessTypes>;
export declare type interceptorsResponseFailTypes = (error: any, instance?: AxiosInstance) => any;
export declare function interceptorsResponseFail(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseFailTypes>) => TypedPropertyDescriptor<interceptorsResponseFailTypes>;
