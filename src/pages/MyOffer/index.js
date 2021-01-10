import React, {useContext, useEffect, useState} from 'react'
import { ActionOffer,Header } from '../../components';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../../context/appContext';
import { API } from "../../config/api";
import Table from 'react-bootstrap/Table';

const MyOffer = () => {
    const router = useHistory();
    const [state, dispatch] = useContext(AppContext);
    const {user} = state;
    const [offers, setOffers ] = useState([]);

    const fetchOffers = async () => {
        try {
            const response = await API(`/my-offer/${user.id}`);
            setOffers(response.data.data.orders);
        } catch (error) {
            console.log(error);
        }
    }
    
    const toOrder = () => {
        router.push("/myorder");
    };
    const toOffer = () => {
        router.push("/myoffer");
    };

    useEffect(() => {
        fetchOffers();
    }, [])


    return (
        <div className="myorder">
            <Header />
            <div className="container mt-4">
                <div className="row">
                        <div className="page-title">
                            <Button className="btn-follow" onClick={toOrder}>My Order</Button>&nbsp;
                            <Button className="btn-hire" onClick={toOffer}>My Offer</Button>
                        </div>
                        <Table striped  hover>
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Artist</th>
                            <th>Order</th>
                            <th>Start Project</th>
                            <th>End Project</th>
                            <th>Status</th>
                            <th className="d-flex justify-content-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map((offerdata,number) =>(
                                <ActionOffer 
                                id = {offerdata.id}
                                number = {number}
                                fullname = {offerdata.orderTo.fullname}
                                title = {offerdata.title}
                                startDate = {offerdata.startDate}
                                endDate = {offerdata.endDate}
                                status = {offerdata.status}
                                fetchOffers = {fetchOffers}
                            />
                        ))}
                        </tbody>
                        </Table>
                </div>
            </div>
        </div>
    )
}

export default MyOffer
