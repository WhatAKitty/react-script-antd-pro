
import { Mock } from 'react-fetch-mock';
import { getRule, postRule } from './rule';
import { getActivities, getNotice, getFakeList } from './api';
import { getFakeChartData } from './chart';
import { getProfileBasicData } from './profile';
import { getProfileAdvancedData } from './profile';
import { getNotices } from './notices';

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': () => {
    return {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png',
      userid: '00000001',
      notifyCount: 12,
    }
  },
  // GET POST 可省略
  'GET /api/users': () => {
    return [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }]
  },
  'GET /api/project/notice': () => getNotice,
  'GET /api/activities': () => getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': (obj) => {
    return postRule({
      ...obj, urlparams: {
        pageSize: {
          desc: '分页',
          exp: 2,
        },
      }
    });
  },
  'POST /api/forms': () => {
    return {};
  },
  'GET /api/tags': () => {
    return Mock.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
    });
  },
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': () => getFakeChartData,
  'GET /api/profile/basic': () => getProfileBasicData,
  'GET /api/profile/advanced': () => getProfileAdvancedData,
  'POST /api/login/account': ({ params }) => {
    const { password, userName, type } = params;
    if (password === '888888' && userName === 'admin') {
      return {
        type,
        currentAuthority: 'admin',
      };
    }
    if (password === '123456' && userName === 'user') {
      return {
        type,
        currentAuthority: 'user',
      };
    }
    return {
      status: 401,
      data: {
        type,
        currentAuthority: 'guest',
      }
    };
  },
  'POST /api/login/mobile': () => {
    return {
      type: 'mobile'
    };
  },
  'POST /api/register': () => {
    return { currentAuthority: 'user' };
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    return ({
      "status": 500,
      data: {
        "timestamp": 1513932555104,
        "error": "error",
        "message": "error",
        "path": "/base/category/list"
      }
    });
  },
  'GET /api/404': (req, res) => {
    return ({
      "status": 404,
      data: {
        "timestamp": 1513932643431,
        "error": "Not Found",
        "message": "No message available",
        "path": "/base/category/list/2121212"
      }
    });
  },
  'GET /api/403': (req, res) => {
    return ({
      "status": 403,
      data: {
        "timestamp": 1513932555104,
        "error": "Unauthorized",
        "message": "Unauthorized",
        "path": "/base/category/list"
      },
    });
  },
  'GET /api/401': (req, res) => {
    return ({
      "status": 401,
      data: {
        "timestamp": 1513932555104,
        "error": "Unauthorized",
        "message": "Unauthorized",
        "path": "/base/category/list"
      }
    });
  }
}
