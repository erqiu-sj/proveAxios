import { initializationAxios, InitializeContainer, instanceAlias, interceptorsResponseSuccess, Module } from '@zealforchange/proveaxios'
import { UserAuthorization, useUserAuthorizationHelper } from '@zealforchange/proveaxios/userAuthorization'
import { AxiosResponse } from 'axios'

jest.setTimeout(150000)

useUserAuthorizationHelper({
  authorizationRequired: true,
  statusExpirationCode: 301,
  refreshToken: async () => {
    const result = await helper({ url: '/refreshToken', params: { next: true } })
  },
})

@Module([UserAuthorization])
@initializationAxios({
  baseURL: 'http://localhost:3000/user',
})
class UserAuth {
  @interceptorsResponseSuccess()
  static response(res: AxiosResponse) {
    return Promise.resolve(res.data)
  }
}

const g = new InitializeContainer().collect([UserAuth])
const helper = g.get(instanceAlias.firstInstance)

it('verify statusExpirationCode', async () => {
  const resultList = await helper({ url: '/getList' })
  expect(resultList).toStrictEqual({ code: 200, data: [1, 2] })
})
