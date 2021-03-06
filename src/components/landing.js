import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// routing
import * as routes from '../utils/routes';
import { Link } from 'react-router-dom';

// get background image from cloudinary (pre-faded)
const backgroundImage = "https://res.cloudinary.com/noctisvirtus/image/upload/b_rgb:000000,o_15/v1590981061/hotdog_b.jpg";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
    },
    // make box full height to vertically centre children
    wrapper: {
        height: '100%',
    },
    // rest of styling copy-pasted from template
    button: {
      minWidth: '200px'
    },
    span: {
        width: '73px',
        height: '4px',
        marginTop: '8px',
        marginRight: 'auto',
        marginBottom: '0px',
        marginLeft: 'auto',
        display: 'block',
        backgroundColor: '#cbb09c'
    },
    // last line changes behaviour when window larger than certain size ('sm')
    message: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        }
    }
}));


// template preview: https://material-ui.com/premium-themes/onepirate/
// template source: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/premium-themes/onepirate/Home.js
function Landing() {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.background}>
            <Box
                className={classes.wrapper}
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Typography align="center" color="secondary" variant="h2">
                    EXPRESS YOUR TASTE
                    <span className={classes.span}></span>
                </Typography>
                <Typography
                    className={classes.message}
                    align="center" 
                    color="secondary" 
                    variant="body1"
                >
                    Discover secret hotdog recipes from people across the world
                </Typography>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button
                        component={Link}
                        to={routes.REGISTER}
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        size="large"
                        disableElevation
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Landing;
