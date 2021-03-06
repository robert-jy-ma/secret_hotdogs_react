import React from 'react';
import { 
    Box, IconButton, Typography,
    Dialog, DialogContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './loginForm';
import Icon from '../utils/icons';

const useStyles = makeStyles((theme) => ({
    title: {
        paddingLeft: '50px'
    },
    dialogContent: {
        paddingLeft: '5px!important',
        paddingRight: '5px!important'
    }
}));

function LoginFormDialog(props) {
    const { open, setOpen } = props;
    const classes = useStyles();

    function handleClose() {
        setOpen(false);
    }

    return (
        <Dialog 
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={() => handleClose()}
        >
            <Box display="flex" flexDirection="row" alignItems="center">
                <Box flexGrow={1}>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        color="textSecondary"
                        className={classes.title}
                    > 
                        Login 
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={() => handleClose()}>
                        <Icon name="close" />
                    </IconButton>
                </Box>
            </Box>
            <DialogContent className={classes.dialogContent}>
                <LoginForm setDialogOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}

export default LoginFormDialog;
