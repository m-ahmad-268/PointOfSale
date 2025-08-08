import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import Header from "../components/header";
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LogoutOutlined, InboxOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, message, theme } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/commonService";
import { reestData } from "../slices/authSlice";
const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));

const Dashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const userDetail = useSelector(state => state.counter.userDetail);
    const token = useSelector(state => state.counter.token);
    const loader = useSelector(state => state.common.loader);
    const dispatch = useDispatch();
    const arr = [
        {
            id: 1,
            key: 'products',
            icon: React.createElement(InboxOutlined),
            label: 'Products',
            children: [
                {
                    key: 'allProducts',
                    label: `All Products`,
                }
            ]
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
        },

    ]
    const items2 = [...[InboxOutlined].map((icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: Array.from({ length: 6 }).map((_, j) => {
                const subKey = index * 6 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    }),
    {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
    },

    ];

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            getLogout();
        }
        else if (key === 'allProducts') {
            navigate('allProducts');
        }

        else {
            console.log('Menu item clicked:', key);
        }
    };


    const getLogout = async () => {
        if (!token)
            return;

        // dispatch(showLoader());
        try {
            const data = await logout(null, { token: token });
            if (data && data?.code == 1 && data?.additionalDetail) {
                dispatch(reestData());
                message.success(data?.additionalDetail || 'User logout successfully')
            } else {
                message.error(data?.additionalDetail || 'Something went wrong')

            }
            // dispatch(hideLoader());
        } catch (error) {
            console.error('Error fetching user:', error);
            // dispatch(hideLoader());
        }



        // navigate('/dashboard');
    };
    return (
        <>
            {/* <Header /> */}
            <Layout>
                <Header className="flex justify-center items-center justify-between">
                    {/* <div className="demo-logo" /> */}
                    {/* <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        items={items1}
                        style={{ flex: 1, minWidth: 0 }}
                    /> */}
                    <a className="text-xl font-bold text-blue-600" onClick={() => navigate('/dashboard')}>
                        MY POS
                    </a>
                    <a className="flex items-center space-x-4" >
                        <span className="text-sm text-white hidden sm:block">Hi, {userDetail?.username || ''}</span>
                        <img
                            src={`https://ui-avatars.com/api/?name=${userDetail?.username}+&background=0D8ABC&color=fff`}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </a>

                </Header>
                <Layout>
                    <Sider width={200} style={{ background: colorBgContainer }}>
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={['1']}
                            onClick={handleMenuClick}
                            // defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderInlineEnd: 0 }}
                            items={arr}
                        />
                    </Sider>
                    <Layout className="m-5">
                        {/* <Breadcrumb
                            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                            style={{ margin: '16px 0' }}
                        /> */}
                        <Content
                            style={{
                                padding: 10,
                                margin: 0,
                                minHeight: '100vh',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};
export default Dashboard;