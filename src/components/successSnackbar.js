import React from 'react';
// material ui
import { Box, IconButton, Snackbar, Typography }  from '@material-ui/core';
import Icon from '../utils/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // override iconbutton styles in theme.js
    button: {
        color: 'white',
        '&:hover': {
            color: '#b9f6ca',
        }
    }
}));

/*
    message with an icon
*/
function Message(props) {
    const { message } = props;
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <Box mr={2}>
                <Icon name="tick" />
            </Box>
            <Box>
                <Typography variant="subtitle2" display="inline">
                    {message}
                </Typography>
            </Box>
        </Box>
    );
}

/* 
    close button (default) + action button (if defined)
*/
function Action(props) {
    const classes = useStyles();
    const { actionButton, handleClose } = props;
    return (
        <>
            {actionButton}
            <IconButton size="small" onClick={handleClose} className={classes.button}>
                <Icon name="close" />
            </IconButton>
        </>
    );    
}

/* 
    only opens if parent opens it, sets parent val to false if time out or closed
*/
function SuccessSnackbar(props) {
    const { open, setOpen, message, action } = props;

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const autoHideDuration = 5000;
    return (
        <Snackbar 
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={(event, reason) => handleClose(event, reason)}
            message={<Message message={message} />}
            action={<Action actionButton={action} handleClose={handleClose}/>}
        />
    );
}

export default SuccessSnackbar;
