import { Card, Typography } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';

import { ContextMain } from "./../common/Drawer/ContextMain"

import LazyLoad from 'react-lazyload';
import AppBar from "../common/Drawer/Appbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends React.Component<any,
    {

        data_arr: any,
        redirect: boolean



    }> {

    constructor(props: any) {
        super(props);

        this.state =
        {


            redirect: false,
            data_arr: []
        }
    }

    addToCart = (product: any) => {
        const exist = this.state.data_arr.find((x: any) => x.id === product.id);

        if (exist) {
            this.setState({
                data_arr:
                    this.state.data_arr.map((x: any) =>
                        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                    )

            })
        } else {
            this.setState({ data_arr: [...this.state.data_arr, { ...product, qty: 1 }] })
        }
        this.setState({ redirect: true })
        toast.success('Added To Cart', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
        });

    }

    removeToCart = (product: any) => {
        const exist = this.state.data_arr.find((x: any) => x.id === product.id);
        //  console.log("exist", exist)
        if (exist.qty === 1) {
            this.setState({
                data_arr:
                    this.state.data_arr.filter((x: any) => x.id !== product.id)

            })
        } else {
            this.setState({
                data_arr: this.state.data_arr.map((x: any) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            })
        }

        toast.warn('Removed from Cart', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    render() {

        return (
            <div>
                <AppBar cartData={this.state.data_arr} />
                <div className="row">
                    {this.context.userData[0].length !== undefined ?
                        this.context.userData[0].map((data: any) => {
                            return (<>
                                <div className="col-md-3" key={data.id}>
                                    <LazyLoad height={400}>
                                        <Card className="card-padding">
                                            <img src={data.additional_image} width="200" height="200" className="csv-img" />
                                            <Typography component="h4" className="modal-title mt-3">{data.product}</Typography>
                                            <Typography component="h4" className="modal-subtitle  mt-3">{data.description}</Typography>
                                            <Typography component="h4" className="modal-title mt-2">{data.subcategories}</Typography>
                                            <Typography component="h4" className="modal-title-price mt-3">Price: <b>₹ {data.price}</b></Typography>
                                            <div className="row">
                                                <div className="col-md-6"> <Button variant="contained" className="btn-class-add mt-4" color="primary" onClick={() => this.addToCart(data)}>+</Button></div>
                                                <div className="col-md-6">  <Button variant="contained" className="btn-class-add mt-4" color="primary" onClick={() => this.removeToCart(data)}>-</Button></div>
                                            </div>
                                        </Card>
                                    </LazyLoad>
                                </div>

                            </>)
                        }) : <Typography component="h4" className="modal-title-price-new mt-3"><b>Please add CSV file </b></Typography>
                    }

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div >
        );
    }
}


HomePage.contextType = ContextMain;
export default HomePage;