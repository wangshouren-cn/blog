import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/base.less'
        )}";`
      }
    }
    },
    server:{
      host:'0.0.0.0'
    } 
})
