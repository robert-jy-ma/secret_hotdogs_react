import React, { useContext, useState } from 'react';
// my components
import Form from './form';
import FormField from './formField';
import FormButton from './formButton';
import SuccessSnackbar from './successSnackbar';
// routing
import * as routes from '../utils/routes';
// context
import { UserContext } from '../userContext';
// helper for accessing api
import { apiPost } from '../utils/apiHelper';

function AddForm() {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(" ");
    const [sausage, setSausage] = useState("");
    const [sausageError, setSausageError] = useState(" ");
    const [sauce, setSauce] = useState("");
    const [sauceError, setSauceError] = useState(" ");
    const [toppingA, setToppingA] = useState("");
    const [toppingAError, setToppingAError] = useState(" ");
    const [toppingB, setToppingB] = useState("");
    const [toppingBError, setToppingBError] = useState(" ");
    
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const emptyError = "Please fill out this field";
    const invalidError = "Invalid input - ";

    function handleAdd() {
        console.log("SUBMITTED NEW HOTDOG :)");
    }

    return (
        <Form>
            <FormField
                type="text"
                iconName="hotdogTitle"
                label="Title"
                value={title}
                setValue={setTitle}
                error={titleError}
            />
            <FormField
                type="text"
                iconName="hotdogSausage"
                label="Sausage"
                value={sausage}
                setValue={setSausage}
                error={sausageError}
            />
            <FormField
                type="text"
                iconName="hotdogSauce"
                label="Sauce"
                value={sauce}
                setValue={setSauce}
                error={sauceError}
            />
            <FormField
                type="text"
                iconName="hotdogTopping"
                label="Topping A"
                value={toppingA}
                setValue={setToppingA}
                error={toppingAError}
            />
            <FormField
                type="text"
                iconName="none"
                label="Topping B"
                value={toppingB}
                setValue={setToppingB}
                error={toppingBError}
            />
            <FormButton
                text="Submit"
                loading={loading}
                handleClick={handleAdd}
            />
            <SuccessSnackbar
                parentOpen={added}
                message="Posted new hotdog!"
                action="HOME"
                actionRoute={routes.HOME}
            />
        </Form>
    );
} 

export default AddForm;