import { Card, Typography } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { PAGE_TWO_ERROR_TEXT } from './../common/Drawer/constant';
import { Redirect } from "react-router-dom";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContextMain } from "./../common/Drawer/ContextMain"
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import deleteIcon from "../HomePage/ic_close_blue.svg"
import LazyLoad from 'react-lazyload';
import AppBar from "../common/Drawer/Appbar"

class HomePage extends React.Component<any,
    {
        name: string,
        nameError: boolean,
        nameErrorLabel: string,
        saveDetailsEnable: any,
        date_match_modal: boolean,
        data_arr: any,
        roomErrorLabel: string,
        roomError: boolean,
        room: string,
        room2ErrorLabel: string,
        room2Error: boolean,
        room2: string,
        redirect: boolean



    }> {

    constructor(props: any) {
        super(props);

        this.state =
        {

            name: '',
            nameError: false,
            nameErrorLabel: '',
            saveDetailsEnable: true,
            date_match_modal: false,
            roomErrorLabel: '',
            roomError: false,
            room: '',
            room2ErrorLabel: '',
            room2Error: false,
            room2: '',
            redirect: false,
            data_arr: []
        }
    }

    addToCart = (product: any) => {
        const exist = this.state.data_arr.find((x: any) => x.id === product.id);
        console.log("exist", exist)
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
    }

    removeToCart = (product: any) => {
        const exist = this.state.data_arr.find((x: any) => x.id === product.id);
        console.log("exist", exist)
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

                </div>
            </div >
        );
    }
}


HomePage.contextType = ContextMain;
export default HomePage;