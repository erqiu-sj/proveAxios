import 'reflect-metadata';
import { customConfiguration } from '../instance';
export declare type interceptorsRequestSuccessTypes<C extends object> = (conf: customConfiguration<C>) => customConfiguration<C>;
export declare function interceptorsRequestSuccess<C extends object>(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestSuccessTypes<C>>) => TypedPropertyDescriptor<interceptorsRequestSuccessTypes<C>>;
export declare type interceptorsRequestFailTypes = (error: any) => any;
export declare function interceptorsRequestFail(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestFailTypes>) => TypedPropertyDescriptor<interceptorsRequestFailTypes>;
