import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

export interface initializeContainerProps<C = any> {
  containerList: C[]
}
export type customConfiguration<T extends object> = AxiosRequestConfig & T
export declare enum decisionInstaller {
  installReqSuc = 'installReqSuc', // 安装请求成功拦截器
  installReqFail = 'installReqFail', // 安装请求失败拦截器
  installResSuc = 'installResSuc', // 安装响应成功拦截器
  installResFail = 'installResFail', // 安装响应失败拦截器
}
export type instanceConfig = Partial<{
  config?: customConfiguration<object>
  interceptor: {
    request: {
      successCb?: interceptorsRequestSuccessTypes<object>
      failCb?: interceptorsRequestFailTypes
    }
    response: {
      successCb?: interceptorsResponseSuccessTypes
      failCb?: interceptorsResponseFailTypes
    }
  }
}>
/**
 * @description 拦截器联合类型
 */
export type interceptorCollectionTypes<C extends object> = interceptorsResponseFailTypes | interceptorsResponseSuccessTypes | interceptorsRequestFailTypes | interceptorsRequestSuccessTypes<C>
/**
 * @description 安装器联合类型
 */
export type installerCollectionTypes<C extends object> = mergeErrorInstaller | mergeSuccessfulInstaller<customConfiguration<C>> | mergeSuccessfulInstaller<AxiosResponse>

export type mergeErrorInstaller = (err: any) => boolean

export type mergeSuccessfulInstaller<T> = (conf: T) => boolean

export type checkDynamicModuleSuccessInstallType<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object> = T extends decisionInstaller.installReqSuc
  ? mergeSuccessfulInstaller<customConfiguration<C>>
  : mergeSuccessfulInstaller<customConfiguration<C>>

export type dynamicPluginConfig<C extends object> = Partial<{
  priority: number | keyof typeof priority
  interceptor: instanceConfig['interceptor']
  installer: {
    [decisionInstaller.installReqSuc]?: mergeSuccessfulInstaller<customConfiguration<C>>
    [decisionInstaller.installReqFail]?: mergeErrorInstaller
    [decisionInstaller.installResSuc]?: mergeSuccessfulInstaller<AxiosResponse>
    [decisionInstaller.installResFail]?: mergeErrorInstaller
  }
}>
export declare enum instanceAlias {
  firstInstance,
  secondInstance,
  thirdInstance,
  fourthInstance,
  fifthInstance,
  sixthInstance,
}
// 优先级
export declare enum priority {
  LOWEST = 'LOWEST',
  INTERMEDIATE = 'INTERMEDIATE',
  TOP = 'TOP',
}

/**
 * @description 初始化实例配置，并且获取所有拦截器
 */
export declare function initializationAxios<C extends object>(conf?: customConfiguration<C>): (target: Function) => void

export type interceptorsResponseSuccessTypes = (conf: AxiosResponse) => Promise<AxiosResponse>

export declare function interceptorsResponseSuccess(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseSuccessTypes>) => TypedPropertyDescriptor<interceptorsResponseSuccessTypes>

export type interceptorsResponseFailTypes = (error: any, instance: AxiosInstance) => any

export declare function interceptorsResponseFail(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsResponseFailTypes>) => TypedPropertyDescriptor<interceptorsResponseFailTypes>

export type interceptorsRequestSuccessTypes<C extends object> = (conf: customConfiguration<C>) => customConfiguration<C>

export function interceptorsRequestSuccess<C extends object>(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestSuccessTypes<C>>) => TypedPropertyDescriptor<interceptorsRequestSuccessTypes<C>>

export type interceptorsRequestFailTypes = (error: any) => any

export declare function interceptorsRequestFail(): (target: Function, key: string, desc: TypedPropertyDescriptor<interceptorsRequestFailTypes>) => TypedPropertyDescriptor<interceptorsRequestFailTypes>

type moduleTypes = Object[]

export declare function Module(modules: moduleTypes): (target: Object) => void

export declare function dynamicModule<C extends object>(conf: Omit<dynamicPluginConfig<C>, 'interceptor' | 'installer'>): (target: Object) => void

export declare function dynamicModuleErrorInstall(
  type: decisionInstaller.installReqFail | decisionInstaller.installResFail
): (target: Object, key: string, desc: TypedPropertyDescriptor<mergeErrorInstaller>) => TypedPropertyDescriptor<mergeErrorInstaller>

export declare function dynamicModuleSuccessInstall<T extends decisionInstaller.installReqSuc | decisionInstaller.installResSuc, C extends object>(
  type: T
): (target: Object, key: string, desc: TypedPropertyDescriptor<checkDynamicModuleSuccessInstallType<T, C>>) => TypedPropertyDescriptor<checkDynamicModuleSuccessInstallType<T, C>>

export type instanceConfigReturns<C extends object> = { instance: AxiosInstance; conf: instanceConfig; pluginList: dynamicPluginConfig<C>[] }
export type filterEmptyInterceptorReturns = {
  requestSuccessCbList: interceptorsRequestSuccessTypes<object>[]
  requestFailCbList: interceptorsRequestFailTypes[]
  responseSuccessCbList: interceptorsResponseSuccessTypes[]
  responseFailCbList: interceptorsResponseFailTypes[]
} & instanceConfigReturns<object>
export interface DebuggerProps {
  debugger?: boolean
  debugPlugInNameOnly?: string
}

export interface InitializeContainerProps extends DebuggerProps { }

declare class InitializeContainerUtils {
  /**
   * @description 实例化
   * @param List
   * @returns
   */
  protected initializationList(List: initializeContainerProps['containerList']): instanceConfigReturns<object>[]
  /**
   * @description 检查安装器
   * 1. 插件有拦截器 主体没有拦截器 即插件拦截器生效
   *
   */
  protected checkTheInstaller(List: instanceConfigReturns<object>[]): instanceConfigReturns<object>[]
  /**
   * @description 解析拦截器
   * @param List
   * @returns
   */
  protected filterEmptyInterceptor(List: instanceConfigReturns<object>[]): filterEmptyInterceptorReturns[]

  /**
   * @description 绑定拦截器
   * @param List
   */
  protected bindingInterceptor(List: filterEmptyInterceptorReturns[]): filterEmptyInterceptorReturns[]
}

export declare class InitializeContainer extends InitializeContainerUtils {


  protected instanceList: filterEmptyInterceptorReturns[]

  collect(List: initializeContainerProps['containerList']): this

  protected checkEmptyList(): void

  get(index: number): AxiosInstance

  delete(index: number): filterEmptyInterceptorReturns[]
}

// 执行阶段
export declare enum executionPhase {
  checkTheInstallerStage = 'checkTheInstallerStage', // 检查安装器阶段
  executeTheInstallerPhase = 'executeTheInstallerPhase', // 执行安装器阶段
  checkTheInterceptorPhase = 'checkTheInterceptorPhase', // 检查拦截器阶段
  executeTheTnterceptorPhase = 'executeTheTnterceptorPhase' // 执行拦截器阶段
}

export declare enum interceptorsKey {
  interceptorsRequestSuccess = 'interceptorsRequestSuccess',
  interceptorsRequestFail = 'interceptorsRequestFail',
  responseSuccess = 'responseSuccess',
  responseFail = 'responseFail',
}