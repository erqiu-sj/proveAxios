import { AxiosInstance } from 'axios'
import { filterEmptyInterceptorReturns, InitializeContainerUtils } from './InitializeContainerUtils'
export interface initializeContainerProps<C = any> {
  containerList: C[]
}
export class InitializeContainer extends InitializeContainerUtils {
  protected instanceList: filterEmptyInterceptorReturns[] = []

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
