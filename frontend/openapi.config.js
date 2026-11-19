import { generateService } from '@umijs/openapi'

generateService({
  schemaPath: 'http://127.0.0.1:8080/v3/api-docs',
  serversPath: './src',
  requestLibPath: "import request from '@/request'",
  projectName: 'api',
})
  .then(() => console.log('接口代码生成完成'))
  .catch(console.error)


