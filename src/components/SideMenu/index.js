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
import PropTypes from 'prop-types';
import { Menu, Tabs, Icon } from 'antd';
import sideMenu from '../../common/nav';

import styles from './index.less';

const { TabPane } = Tabs;
const { SubMenu, ItemGroup: MenuItemGroup } = Menu;
export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.renderSubMenu = this.renderSubMenu.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.renderSideMenu = this.renderSideMenu.bind(this);
  }

  renderSubMenu(menu) {
    return (
      <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}>
        {
          menu.children.map(item => this.renderMenu(item))
        }
      </SubMenu>
    )
  }

  renderGroup(menu) {
    return (
      <MenuItemGroup key={menu.key} title={menu.title}>
        {
          menu.group.map(item => this.renderMenu(item))
        }
      </MenuItemGroup>
    )
  }

  renderMenu(menu) {
    if (menu.children) {
      return this.renderSubMenu(menu);
    }
    if (menu.group) {
      return this.renderGroup(menu);
    }

    return <Menu.Item key={menu.key}>{menu.title}</Menu.Item>;
  }

  renderTab(nav) {
    return (
      <div className={styles.tab}>
        <Icon type={nav.icon} className={styles.tabicon} />
        <span className={styles.tabtext}>系  统</span>
      </div>
    );
  }

  renderNav(nav) {
    return (
      <TabPane tab={this.renderTab(nav)} key={nav.key} className={styles.tabpane}>
        <Menu
          onClick={this.handleClick}
          /* style={{ width: 260 }} */
          /* defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']} */
          theme="dark"
          mode="inline"
          style={{ margin: 0, overflowX: 'hidden', overflowY: 'auto', height: '100%', borderWidth: 0 }}
        >
          {
            nav.menus.map(menu => this.renderMenu(menu))
          }
        </Menu>
      </TabPane>
    );
  }

  renderSideMenu(navs) {
    return (
      <Tabs
        tabPosition="left"
        className={styles.sidemenu}
        type="card"
        tabBarStyle={{ padding: 0, borderWidth: 0 }}
      >
        {
          navs.map(nav => this.renderNav(nav))
        }
      </Tabs>
    );
  }

  render() {
    return this.renderSideMenu(sideMenu);
  }
}
