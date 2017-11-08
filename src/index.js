import dva from 'dva';
import 'moment/locale/zh-cn';
import models from './models';
import './polyfill';
import './g2';
import { browserHistory } from 'dva/router';
import './index.less';

import router from './router';
import FetchMock from 'react-fetch-mock';

window.fetch = new FetchMock(require('./__mocks__')).fetch;

// 1. Initialize
const app = dva({
  history: browserHistory,
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
