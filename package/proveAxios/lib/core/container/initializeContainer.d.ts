import { AxiosInstance } from 'axios';
import { DebuggerProps } from '..';
import { filterEmptyInterceptorReturns, InitializeContainerUtils } from './InitializeContainerUtils';
export interface initializeContainerProps<C = any> {
    containerList: C[];
}
export interface InitializeContainerProps extends DebuggerProps {
}
export declare class InitializeContainer extends InitializeContainerUtils {
    protected instanceList: filterEmptyInterceptorReturns[];
    constructor(res?: InitializeContainerProps);
    collect(List: initializeContainerProps['containerList']): this;
    protected checkEmptyList(): void;
    get(index: number): AxiosInstance;
    delete(index: number): filterEmptyInterceptorReturns[];
}
