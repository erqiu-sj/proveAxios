import { customConfiguration } from '@zealforchange/proveaxios'
import Axios, { AxiosInstance } from 'axios'
import { retryAfterTimeoutOps } from './type'

type config = {
    config: customConfiguration<retryAfterTimeoutOps<object>>
}

type checkFieldConf = {
    field: keyof retryAfterTimeoutOps<object>
    message: string
}

export class RetryCore {
    private conf: config | unknown
    constructor(conf: config | unknown, instance?: AxiosInstance) {
        this.conf = conf
    }
    private checkField({ message, field }: checkFieldConf): this {
        const conf = this.conf as { config: customConfiguration<retryAfterTimeoutOps<object>> }
        if (!conf?.config?.[field]) throw new Error(message)
        return this
    }
    async runCallBack(cbKey: keyof Omit<retryAfterTimeoutOps<object>, 'numberOfRetries'>, payload?: any): Promise<this> {
        this.checkNumberOfRetries()
        const checkedConf = this.conf as config
        if (!checkedConf?.config?.[cbKey]) return this
        await checkedConf?.config?.[cbKey]?.(payload)
        return this
    }
    async retryBeforeCbCb(): Promise<this> {
        this.checkNumberOfRetries()
        const checkedConf = this.conf as config
        if (!checkedConf?.config?.['retryBeforeCb']) return this
        if ((this?.conf as config)?.config) {
            const conf = await checkedConf?.config?.['retryBeforeCb']?.(checkedConf.config) as config['config'];
            this.setConf(conf)
            return this
        }
        return this
    }
    private setConf(params: config['config']) {
        if (!this.conf) throw new Error('the configuration cannot be empty');
        (this.conf as config).config = params
    }
    async retrying(): Promise<unknown> {
        const conf = this.conf as config
        const returnVal = []
        for (let index = 0; index < <number>conf.config?.numberOfRetries; index++) {
            const result = await Promise.allSettled([Axios({ ...conf.config })])
            if (result[0].status === 'rejected') { continue }
            returnVal.push(result[0].value)
            break
        }
        return returnVal[0]
    }
    private checkNumberOfRetries() {
        this.checkField({ field: 'numberOfRetries', message: "to retry numberOfRetries is required" })
    }

}