import React from 'react';
import { Layout, Affix, Avatar, Menu } from 'antd';

export const Page = (props) => {
    if (props.header) {
        if (props.header === 'sticky') {
            return (
                <Layout className="wrapper">
                    <Affix>
                        <Layout.Header className="header" style={{
                            display: 'flex'
                        }}>
                            <div style={{
                                flex: 1
                            }}>
                                <Avatar/>  LoremIpsum</div>
                            <div>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{
                                    lineHeight: '50px',
                                    position: 'relative',
                                    filter: 'grayscale(100)',
                                    opacity: 0.4
                                }}
                            >
                                <Menu.Item key="1">Lorem Ipsum</Menu.Item>
                                <Menu.Item key="2">Dolor Sit</Menu.Item>
                                <Menu.Item key="3">Amet</Menu.Item>
                            </Menu>
                            </div>
                        </Layout.Header>
                    </Affix>
                    <Layout.Content className="content">
                        <Layout className="wrapper">{props.children}</Layout>
                    </Layout.Content>
                </Layout>
            )
        } else {
            return (
                <Layout className="wrapper">
                    <Layout.Header className="header">
                        Layout Header!
                    </Layout.Header>
                    <Layout.Content className="content">
                        <Layout className="wrapper">{props.children}</Layout>
                    </Layout.Content>
                </Layout>
            )
        }
    } else {
        return (
            <Layout className="wrapper">
                {props.children}
            </Layout>
        )
    }
}

export const Sidebar = (props) => {
    return <Layout.Sider width={320} {...props} className="sidebar">{props.children}</Layout.Sider>
}

export const Content = (props) => {
    let style;
    if (props.maxWidth) {
        style = {
            maxWidth: props.maxWidth,
        }
    }

    return (
        <Layout.Content {...props}>
            <div className="content" style={style}>
                {props.children}
            </div>
        </Layout.Content>
    )
}