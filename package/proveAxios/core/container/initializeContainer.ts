import { AxiosInstance } from 'axios'
import { DebuggerProps } from '..'
import { filterEmptyInterceptorReturns, InitializeContainerUtils } from './InitializeContainerUtils'
export interface initializeContainerProps<C = any> {
  containerList: C[]
}
export interface InitializeContainerProps extends DebuggerProps {
}

export class InitializeContainer extends InitializeContainerUtils {
  protected instanceList: filterEmptyInterceptorReturns[] = []
  constructor(res?: InitializeContainerProps) {
    super(res as any)
  }
  collect(List: initializeContainerProps['containerList']): this {
    this.instanceList = this.bindingInterceptor(this.filterEmptyInterceptor(this.checkTheInstaller(this.initializationList(List))))
    return this
  }

  protected checkEmptyList() {
    if (!this.instanceList.length) throw new Error('empty instance list')
  }

  get(index: number): AxiosInstance {
    this.checkEmptyList()
    return this.instanceList[index]?.instance
  }
  delete(index: number): filterEmptyInterceptorReturns[] {
    this.checkEmptyList()
    return this.instanceList.splice(index, 1)
  }
}
