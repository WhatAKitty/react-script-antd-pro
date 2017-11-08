/*
 * *****************************************************************************
 *  杭州高网，机密
 *  __________________
 *
 *  [2016] - [2017] 杭州高网信息技术有限公司
 *  版权所有。
 *
 *  注意：此处包含的所有信息均为杭州高网信息技术有限公司的财产。知识和技术理念
 *  包含在内为杭州高网信息技术有限公司所有，可能受中国和国际专利，以及商业秘密
 *  或版权法保护。严格禁止传播此信息或复制此材料，除非事先获得来自杭州高网信
 *  息技术有限公司的书面许可。
 *
 */

import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'dva';

import SideMenu from '../component/SideMenu';

const { Header, Content, Sider } = Layout;
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout
        style={{ height: '100%' }}
      >
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={280} style={{ background: '#fff' }}>
            <SideMenu />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
