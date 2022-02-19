import { interceptorsRequestSuccess, dynamicModule, dynamicModuleSuccessInstall, priority, customConfiguration, decisionInstaller } from '@zealforchange/proveaxios'
import { PostData } from 'taro-axios'
import { wechatRequestConfigurationConfig } from './type'

function formDataHandler(conf: customConfiguration<Partial<wechatRequestConfigurationConfig>>): [customConfiguration<Partial<wechatRequestConfigurationConfig>>, boolean] {
  if (!conf.isFormDate) return [conf, false]
  if (!conf.legalMayToWorkWithFormdate) return [conf, false]
  if (conf.legalMayToWorkWithFormdate.includes(conf.method)) {
    if (!conf.data) return [conf, false]
    conf.data = new PostData({ ...conf.data })
    return [{ ...conf, data: { ...conf.data } }, true]
  }
  return [conf, false]
}
@dynamicModule({ priority: priority.TOP })
export class wechatRequestConfiguration {
  @interceptorsRequestSuccess<Partial<wechatRequestConfigurationConfig>>()
  static req(conf: customConfiguration<Partial<wechatRequestConfigurationConfig>>) {
    const [postProcessingConfigurationWithFormDate, whetherToProcessWithFormDate] = formDataHandler(conf)
    if (whetherToProcessWithFormDate) {
      return postProcessingConfigurationWithFormDate
    }
    return conf
  }

  @dynamicModuleSuccessInstall(decisionInstaller.installReqSuc)
  static installer(conf: customConfiguration<object>) {
    return true
  }
}
