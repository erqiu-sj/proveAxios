import {AxiosResponse} from 'axios'
import {initializationAxios, InitializeContainer, interceptorsResponseSuccess} from '@zealforchange/proveaxios'

jest.setTimeout(10000)

@initializationAxios({
    baseURL: 'http://localhost:3000',
})
class CheckAxios {
    @interceptorsResponseSuccess()
    static response(res: AxiosResponse) {
        return Promise.resolve(res.data)
    }
}

const g = new InitializeContainer().collect([CheckAxios])

it('getInstance', down => {
    expect(g.get(1)).toBeUndefined()
    expect(g.get(0)).not.toBeNull()
    down()
})

it('Hello World! proveAxios', async () => {
    const result = await g.get(0).get('/weaknet/hello')
    expect(result).toBe('Hello World! proveAxios')
})
