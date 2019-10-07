import React from 'react'
import {Link } from 'react-router-dom';
import {Menu , Icon } from 'antd';

class Header extends React.Component {
    render() {
        return ( 
                   <header style={{
                        // position: 'fixed',
                         zIndex: 1, width: '100%', padding: 0 }}>
      <div className="logo" />
      <Menu
        theme="white"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to={`/tape`} >
        <Icon type="instagram" className="big-font" /></Link></Menu.Item>
        <Menu.Item key="2"><Link to={`/users`} ><Icon type="compass" /></Link> </Menu.Item>
        {/* <Menu.Item key="3"><Link to={`/users`} ><Icon type="heart" /></Link></Menu.Item> */}
        <Menu.Item key="4"><Link to={`/myProfile`} ><Icon type="user" /></Link></Menu.Item>
        <Menu.Item key="5"><Link to={`/newPost`} ><Icon type="plus-square" /></Link></Menu.Item>
      </Menu>
    </header>
        )
    }
}

export default Header