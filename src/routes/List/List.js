import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {
  static contextTypes = {
    routerData: PropTypes.object,
  };

  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'articles':
        dispatch(routerRedux.push(`${match.url}/articles`));
        break;
      case 'applications':
        dispatch(routerRedux.push(`${match.url}/applications`));
        break;
      case 'projects':
        dispatch(routerRedux.push(`${match.url}/projects`));
        break;
      default:
        break;
    }
  }

  render() {
    const tabList = [{
      key: 'articles',
      tab: '文章',
    }, {
      key: 'applications',
      tab: '应用',
    }, {
      key: 'projects',
      tab: '项目',
    }];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match } = this.props;
    const { routerData } = this.context;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {
            routes.map(path =>
              (
                <Route
                  key={`${match.path}${path}`}
                  path={`${match.path}${path}`}
                  component={routerData[`${match.path}${path}`].component}
                />
              )
            )
          }
          <Redirect exact from={`${match.path}`} to={`${match.path}${routes[0]}`} />
        </Switch>
      </PageHeaderLayout>
    );
  }
}
