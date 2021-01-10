import React, {useContext, useEffect, useState} from 'react'
import { ActionOrder, Header } from '../../components';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../../context/appContext';
import { API } from "../../config/api";
import './order.scss';
import Table from 'react-bootstrap/Table';


const MyOrder = () => {
    const router = useHistory();
    const [state, dispatch] = useContext(AppContext);
    const {user} = state;
    const [orders, setOrders ] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await API(`/my-order/${user.id}`);
            setOrders(response.data.data.orders);
            console.log(response.data.data.orders.length);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOrder = async (id, typeAction) => {
        console.log("Action id",id);
        console.log("Action", typeAction);
        const body = JSON.stringify({id, status: typeAction});
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
        };
        try {
            const response = await API.patch(`/order/${id}`, body, config);
            fetchOrders();
        } catch (error) {
            console.log(error);
        }
    };

    const toOrder = () => {
        router.push("/myorder");
    };
    const toOffer = () => {
        router.push("/myoffer");
    };
    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="myorder">
            <Header />
            <div className="container mt-4">
                <div className="row">
                        <div className="page-title">
                            <Button className="btn-hire" onClick={toOrder}>My Order</Button>
                            <Button className="btn-follow" onClick={toOffer}>My Offer</Button>
                        </div>
                        <Table striped  hover>
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>My Client</th>
                            <th>Order</th>
                            <th>Start Project</th>
                            <th>End Project</th>
                            <th>Status</th>
                            <th className="d-flex justify-content-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((orderdata,number) => (
                                <ActionOrder 
                                    number = {number}
                                    id = {orderdata.id}
                                    fullname = {orderdata.orderBy.fullname}
                                    title = {orderdata.title}
                                    price = {orderdata.price}
                                    description = {orderdata.description}
                                    startDate = {orderdata.startDate}
                                    endDate = {orderdata.endDate}
                                    status = {orderdata.status}
                                    handleOrder = {handleOrder}
                                    className = "detailorder"
                                /> 
                                )
                        )}
                        </tbody>
                        </Table>
                </div>
            </div>
        </div>
    )
}

export default MyOrder
