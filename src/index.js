import dva from 'dva';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
import './g2';
import onError from './error';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './index.less';

import FetchMock from 'react-fetch-mock';

window.fetch = new FetchMock(require('./__mocks__')).fetch;

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError,
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
FastClick.attach(document.body);
