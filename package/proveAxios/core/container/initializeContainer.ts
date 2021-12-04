import { InitializeContainerUtils } from './InitializeContainerUtils'
export interface initializeContainerProps<C = any> {
  containerList: C[]
}
export class InitializeContainer extends InitializeContainerUtils {
  collect(List: initializeContainerProps['containerList']) {
    console.log(this.initializationList(List))
  }
}
