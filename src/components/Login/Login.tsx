import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    Link,
    withRouter
} from 'react-router-dom';
import CSVReader from "react-csv-reader";
import { useState, useContext } from 'react';
import { ContextMain } from '../common/Drawer/ContextMain';

const useStyles = makeStyles({
    root: {
        maxWidth: 675,
        marginTop: 30
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard() {
    const [csvData, setCsvData] = useState([]);
    const contxtApi: any = useContext(ContextMain)

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (data: any) => data.toLowerCase().replace(/\W/g, "_")
    };

    const handleForce = (data: any, fileInfo: any) => {
        console.log(data, fileInfo);
        setCsvData(data)
        contxtApi.userData[1](data)
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2" className="main-title mb-3">
                    Yfret Assignment
              </Typography>
                <div className="container">
                    <CSVReader
                        cssClass="react-csv-input"
                        label="Select CSV File"
                        onFileLoaded={handleForce}
                        parserOptions={papaparseOptions}
                    />
                </div>
                <Typography variant="body2" component="p">
                    Click Here to Proceed
          <br />
                </Typography>
                <Link to={`/home`} className="login-button">  <Button variant="contained" className="btn-class mt-4" color="primary" >Next</Button></Link>
            </CardContent>
            <CardActions>
                <Button size="small">By: Malay Mishra</Button>
                <Button size="small">Environment: {process.env.REACT_APP_ENV}</Button>
                {console.log("cons", process.env)}
            </CardActions>
        </Card>
    );
}
