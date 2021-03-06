import React, { useContext, useState } from 'react';
// email validator
import isEmail from 'validator/lib/isEmail';
// my components
import Form from './form';
import FormField from './formField';
import FormButtonWrapper from './formButtonWrapper';
import ProgressButton from './progressButton';
import FormMessage from './formMessage';
import RouterLink from './routerLink';
// routing + utils
import { withRouter } from 'react-router-dom';
import * as routes from '../utils/routes';
import errors from '../utils/errors';
// context
import { UserContext } from '../userContext';
// database
import * as DB from '../database/wrapper';

/* 
    helper: checks trimmed input, returning the appropriate error message
    only handles email - password error handling done during form submission
*/
function checkInput(type, inputTrimmed) {
    if (!inputTrimmed) {
        return errors["empty"];
    }
    var error = " ";
    if (type === "email" && !isEmail(inputTrimmed)) error = errors["email"]
    return error;
}

/*
    helper: checks validity of input based on returned error, trims input, and sets input error
*/
function isValid(type, input, setInput, setInputError) {
    const trimmed = input.trim();
    const error = checkInput(type, trimmed);
    setInput(trimmed);
    setInputError(error);
    return error.trim() === "";
}

function LoginForm(props) {
 	// context + state variables (default error " " prevents form from looking ugly)
    const { setDialogOpen } = props;
    const { setCurrentUserId } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(" ");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(" ");
    const [loading, setLoading] = useState(false);

    function handleDialogClose() {
        setDialogOpen(false);
    }

    function handleLogin() {
        const emailValid = isValid("email", email, setEmail, setEmailError);
        const passwordValid = isValid("password", password, setPassword, setPasswordError);
        if (emailValid && passwordValid) {
            setLoading(true);
            // if login succeeds, set context user id and redirect to home page
            (async () => {
                // trim again just in case, since set<value>(<value>Trimmed) is asynchronous
                const userId = await DB.login(email.trim(), password);
                setLoading(false);
                if (!userId) {
                    setEmailError(errors["login"]);
                    setPasswordError(errors["login"]);
                } else {
                    setCurrentUserId(userId);
                    handleDialogClose();
                    props.history.push(routes.HOME);
                }
            })();
        }
    }

    return (
        <Form>
            <FormField
                type="text"
                iconName="email"
                label="Email"
                value={email}
                setValue={setEmail}
                error={emailError}
            />
            <FormField
                type="password"
                iconName="password"
                label="Password"
                value={password}
                setValue={setPassword}
                error={passwordError}
            />
            <FormButtonWrapper>
                <ProgressButton 
                    color="primary"
                    variant="contained"
                    loading={loading} 
                    handleClick={handleLogin}
                    disableElevation
                >
                    Login
                </ProgressButton>
            </FormButtonWrapper>
            <FormMessage color="textSecondary" variant="body2">
                Don't have an account? &nbsp;
                <RouterLink 
                    color="primary" 
                    underline="hover" 
                    onClick={handleDialogClose}
                    to={routes.REGISTER}
                > 
                    Sign Up 
                </RouterLink>
            </FormMessage>
        </Form>
    );
}

export default withRouter(LoginForm);