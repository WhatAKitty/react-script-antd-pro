import dva from 'dva';
import 'moment/locale/zh-cn';
import './polyfill';
import './g2';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';
import './index.less';

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

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
