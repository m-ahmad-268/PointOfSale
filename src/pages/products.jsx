import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getAllProduct, logout } from "../services/commonService";
import { Content, Header } from "antd/es/layout/layout";
import { Layout, message } from "antd";
import { Table, Tag, Button } from 'antd';

const Products = () => {
    // return (
    //     <>
    //       <h1>hello parent</h1>
    //         <Outlet />
    //     </>
    // );
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => handleEdit(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'iPhone 14',
            category: 'Smartphone',
            price: 999,
            stock: 5,
        },
        {
            key: '2',
            name: 'MacBook Pro',
            category: 'Laptop',
            price: 1999,
            stock: 2,
        },
    ]);
    const handleEdit = (product) => {
        console.log('Edit product:', product);
        // Open modal or redirect to edit page
    };

    useEffect(() => {
        // debugger
        getAllProducts();

    }, []);


    const getAllProducts = async () => {

        try {
            const data = await getAllProduct();
            if (data && data?.code == 1 && data?.additionalDetail && data?.additionalDetail.length) {
                setDataSource(data.additionalDetail);

                message.success(data?.additionalDetail || 'User logout successfully')
            } else {
                setDataSource([]);
                message.error(data?.additionalDetail || 'Something went wrong')
            }
            // dispatch(hideLoader());
        } catch (error) {
            console.error('Error fetching user:', error);
            // dispatch(hideLoader());
        }
    }


    return (
        <>
            <Header className="flex bg-white p-0 pl-2 items-center">
                <span className="text-2xl">
                    Products
                </span>
            </Header>
            <div className="grid grid-cols-1 p-4">
                <div className="flex bg-white justify-end p-2">
                    <Button type="primary" onClick={() => { debugger }}>
                        Add Products
                    </Button>
                </div>
                <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
                {/* <div className="bg-red-200">
                    hellokjashdjklsa asdlk
                </div> */}
            </div>

            {/* <Outlet /> */}
        </>
    );
};


export default Products;