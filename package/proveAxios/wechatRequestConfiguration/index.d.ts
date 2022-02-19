import { customConfiguration } from '@zealforchange/proveaxios'

export declare interface wechatRequestConfigurationConfig {
  isFormDate: boolean
  legalMayToWorkWithFormdate: customConfiguration<object>['method'][]
}

export declare class wechatRequestConfiguration {
  static req(conf: customConfiguration<Partial<wechatRequestConfigurationConfig>>): customConfiguration<Partial<wechatRequestConfigurationConfig>>
  static installer(conf: customConfiguration<object>): boolean
}
