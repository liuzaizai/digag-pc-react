/**
 * Created by Yuicon on 2017/6/25.
 */
import React, {Component} from 'react';
import {Button, Input, Menu, Dropdown, Notification} from "element-react";
import RegisterDialog from '../../components/Header/RegisterDialog';
import LoginDialog from '../../components/Header/LoginDialog';
import {connect} from "react-redux";
import {registerAction, loginAction} from '../../redux/action/users';
import './Header.css';
import portrait from '../../assets/images/portrait.jpg';

@connect(
  (state) => {
    return ({
      users: state.users,
      auth: state.auth,
    });
  },
  {registerActions: registerAction, loginActions: loginAction}
)
export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      registerDialog: false,
      loginDialog: false,
    };
  }

  handleSelect = (index) => {
    switch (index) {
      case 'edit':
        this.props.history.push('/submit-entry');
        break;
      case 'index':
        this.props.history.push('/');
        break;
      default:
        console.log(index);
    }
  };

  handleIconClick = () => {
    console.log('handleIconClick', this.state.searchInput);
  };

  handleRegisterDialogClose = () => {
    return () => {
      this.setState({registerDialog: false});
    }
  };

  handleLoginDialogClose = () => {
    return () => {
      this.setState({loginDialog: false});
    }
  };

  handleRedirect = () => {
    console.log('handleRedirect');
    this.setState((state) => ({
      registerDialog: !state.registerDialog,
      loginDialog: !state.loginDialog
    }));
  };

  handleLogin = () => {
    this.setState({loginDialog: true})
  };

  handleRegister = () => {
    this.setState({registerDialog: true})
  };

  handleCommand = (command) => {
    switch (command) {
      case 'index':
        console.log(command);
        break;
      case 'logout':
        localStorage.removeItem('token');
        Notification({
          title: '退出登陆',
          message: '你已退出登陆'
        });
        this.forceUpdate();
        break;
      default:
        console.log(command);
    }
  };

  renderMenu() {
    if (localStorage.getItem('token')) {
      return (
        <div style={{display: 'flex'}}>
          <Menu.Item index="edit">
            <i className="el-icon-plus"/>
          </Menu.Item>
          <Menu.Item index="8">
            <i className="el-icon-message"/>
          </Menu.Item>
          <Menu.Item index="9">
            <Dropdown onCommand={this.handleCommand} trigger="click" menu={(
              <Dropdown.Menu>
                <Dropdown.Item command="index">我的主页</Dropdown.Item>
                <Dropdown.Item command="logout">退出登陆</Dropdown.Item>
              </Dropdown.Menu>
            )}>
             <img src={portrait} alt="头像" className="portrait"/>
            </Dropdown>
          </Menu.Item>
        </div>
      )
    } else {
      return (
        <div style={{display: 'flex'}}>
          <Menu.Item index="7">
            <Button type="text" icon="edit"
                    className="contribute"
                    onClick={this.handleLogin}>
              投稿
            </Button>
          </Menu.Item>
          <Menu.Item index="8">
            <Button type="text" className="login-btn"
                    onClick={ this.handleLogin }>登录</Button>
            <Button type="text" onClick={ this.handleRegister }>注册</Button>
          </Menu.Item>
        </div>
      )
    }
  };

  render() {
    return (
      <div className="App-header">
        <header className="main-header visible">
          <div className="container">
            <a href="/" className="logo">
              <img src="//gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金" className="logo-img"/>
            </a>
            <div className="nav-menu">
              <Menu defaultActive="1" mode="horizontal" onSelect={this.handleSelect}>
                <Menu.Item index="index">首页</Menu.Item>
                <Menu.Item index="2">专栏</Menu.Item>
                <Menu.Item index="3">收藏集</Menu.Item>
                <Menu.Item index="4">发现</Menu.Item>
                <Menu.Item index="5">标签</Menu.Item>
                <Menu.Item index="6">
                  <Input
                    size="small"
                    icon="search"
                    placeholder="搜索掘金"
                    onIconClick={this.handleIconClick}
                    onChange={(value) => this.setState({searchInput: value})}
                  />
                </Menu.Item>
                {this.renderMenu()}
              </Menu>
            </div>
          </div>
          <RegisterDialog visible={this.state.registerDialog} onClose={this.handleRegisterDialogClose()}
                          registerActions={this.props.registerActions} users={this.props.users}
                          onRedirect={this.handleRedirect}
          />
          <LoginDialog visible={this.state.loginDialog} onClose={this.handleLoginDialogClose()}
                       loginActions={this.props.loginActions} auth={this.props.auth}
                       onRedirect={this.handleRedirect}
          />
        </header>
      </div>
    )
  }
}
