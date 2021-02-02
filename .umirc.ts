import { IConfig } from 'umi-types';
const HOST_URL='';
// ref: https://umijs.org/config/
const config: IConfig =  {
  alias: {
    '@': require('path').resolve(__dirname, './src'),
    '@components': require('path').resolve(__dirname, './src/components'),
    '@utils': require('path').resolve(__dirname, './src/utils'),
  },
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  proxy: {
    '/api': {
      target: HOST_URL,
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'zkfront',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
