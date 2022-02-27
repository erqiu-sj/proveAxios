#/bin/bash


run() {
  cd $1
  echo "准备打包 $2"
  yarn run build:esm
  yarn run build:node
}
cd package
cd proveAxios
# cd cancel
run cancel 'cancel'
# cd ../retryAfterTimeout
run ../retryAfterTimeout 'retryAfterTimeout '
# cd ../userAuthorization
run ../userAuthorization 'userAuthorization '
# cd .. 
run .. 'proveAxios'