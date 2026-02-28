import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://yz-wedding.vn.ua/api/docs/json',
  output: 'src/services/client',
  plugins: ['@hey-api/client-axios']
})
