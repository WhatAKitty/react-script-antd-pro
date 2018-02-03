const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');

module.exports = function override(config, env) {
  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

  return rewireLess.withLoaderOptions(
    `${env === 'production' ? 'app' : '[local]'}-[hash:base64:8]`,
    {
      modifyVars: {
        '@primary-color': '#1DA57A',
        '@link-color': '#1DA57A',
        '@border-radius-base': '2px',
        '@font-size-base': '14px',
        '@line-height-base': '1.2',
        '@card-actions-background': '#f5f8fa',
      }
    },
    /src/,
  )(config, env);
};
