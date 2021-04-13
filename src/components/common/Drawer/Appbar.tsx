import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState, useContext } from 'react';
import { ContextMain } from './ContextMain';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar(props: any) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dataInp, setDataInp] = React.useState("");
    const [constData, setconstData] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const contxtApi: any = useContext(ContextMain)
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: any) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (contxtApi.userData[0] != undefined) {
            setconstData(contxtApi.userData[0])
        }
        console.log("pp", contxtApi.userData[0])
    }, [])

    const menuId = 'primary-search-account-menu';


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton color="inherit" onClick={handleOpen}>
                    <Badge badgeContent={props.cartData.length} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
        </Menu>
    );


    const searchData = () => {

        if (dataInp !== "") {
            const data = contxtApi.userData[0].filter((data: any) => data.occasion !== null && data.occasion !== undefined).filter((data: any) => data.occasion.toLowerCase().indexOf(dataInp.toLowerCase()) >= 0)
            contxtApi.userData[1](data)
        }
        else {
            contxtApi.userData[1](constData)
            // console.log("pnp", constData.userData.userData[0])
        }

    }
    const handleChange = (e: any) => {
        setDataInp(e.target.value)
    }
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    {console.log("men", contxtApi.userData[0])}
                    <Typography className={classes.title} variant="h6" noWrap>
                        Yfret
          </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={e => handleChange(e)}
                            inputProps={{ 'aria-label': 'search' }}
                        />

                    </div>
                    <Button variant="contained" className="btn-class" color="primary" onClick={searchData}>Search</Button>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>

                        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleOpen}>
                            <Badge badgeContent={props.cartData.length} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Cart"}</DialogTitle>
                    <DialogContent>
                        {props.cartData.map((data: any) => {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-md-2 mt-2">
                                            <img src={data.image} width="80" height="80" />
                                        </div>

                                        <div className="col-md-5 offset-1">
                                            <Typography component="h4" className="modal-title mt-3">{data.name}</Typography>
                                        </div>
                                        <div className="col-md-4">
                                            <Typography component="h4" className="modal-subtitle mt-3">Item Qty: <b>{data.qty}</b></Typography>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            )
                        })}
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
          </Button>
                    </DialogActions>
                </Dialog>

            </AppBar>
            {renderMobileMenu}

        </div>
    );
}
