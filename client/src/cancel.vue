<!--
 * @Author: 邱狮杰
 * @Date: 2022-03-22 10:11:09
 * @LastEditTime: 2022-03-22 14:13:08
 * @Description: 
 * @FilePath: /proveAxios/client/src/cancel.vue
-->
<script lang="ts" setup>
import { generateExpirationTime, HEADER_KEY } from '../../package/proveAxios/cancel/src/index'
import { httpHepler } from './service/index'
async function cancelSetup() {
  console.log('cancelSetup')
  console.time()
  await httpHepler({ url: '/weaknet/setDelay', method: 'PUT', data: { start: 10 } })
  httpHepler({
    headers: {
      [HEADER_KEY]: HEADER_KEY,
    },
    url: '/weaknet/delay',
    data: { mark: 'start' },
  })
  httpHepler({
    headers: {
      [HEADER_KEY]: HEADER_KEY,
    },
    url: '/weaknet/delay',
    data: { mark: 'end' },
  })
  console.timeEnd()
}
async function cacheSetup() {
  console.log('cacheSetup')
  console.time()
  await httpHepler({ url: '/weaknet/setDelay', method: 'PUT', data: { start: 10 } })
  httpHepler({ url: '/weaknet/delay', data: { mark: 'start' }, expiration: generateExpirationTime('min', 1) }).then(() => {
    httpHepler({ url: '/weaknet/delay', data: { mark: 'end' }, enableCache: true }).then(res => {
      console.log(res, 'res')
    })
  })
  console.timeEnd()
}
</script>
<template>
  <div>
    <button @click="cancelSetup">cancel</button>
    <button @click="cacheSetup">cacheSetup</button>
  </div>
</template>
<style lang="scss" scoped></style>
