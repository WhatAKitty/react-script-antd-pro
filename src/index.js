import dva from 'dva';
import 'moment/locale/zh-cn';
import models from './models';
import './polyfill';
import './g2';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';
import './index.less';

import router from './router';
import FetchMock from 'react-fetch-mock';

window.fetch = new FetchMock(require('./__mocks__')).fetch;

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
// app.use({});

// 3. Model move to router
models.forEach((m) => {
  app.model(m);
});

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
