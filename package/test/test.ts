import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { InitializeContainer, dynamicModule, initializationAxios, interceptorsRequestFail, interceptorsRequestSuccess, interceptorsResponseFail, interceptorsResponseSuccess, Module, priority } from '../proveAxios/index'

@dynamicModule({
  priority: 1,
})
class B {}
@dynamicModule({
  priority: 10,
})
class C {}

@dynamicModule({
  priority: priority.TOP,
})
class D {}

@dynamicModule({
  priority: priority.INTERMEDIATE,
})
class F {}

@dynamicModule({
  priority: 5,
})
class G {}

@dynamicModule({
  priority: priority.INTERMEDIATE,
})
class H {}
@dynamicModule({
  priority: 2,
})
class I {
  @interceptorsRequestSuccess()
  static interceptorsRequestSuccessCb(conf: AxiosRequestConfig) {
    return conf
  }
}

@Module([B, C, D, F, G, H, I])
@initializationAxios({})
class A {
  @interceptorsRequestSuccess()
  static interceptorsRequestSuccessCb(conf: AxiosRequestConfig) {
    return conf
  }

  @interceptorsRequestFail()
  static fail(err: any) {
    return err
  }

  @interceptorsResponseSuccess()
  static async rs(response: AxiosResponse) {
    return Promise.resolve(response)
  }

  @interceptorsResponseFail()
  static re(err: any) {}
}

new InitializeContainer().collect([A])
