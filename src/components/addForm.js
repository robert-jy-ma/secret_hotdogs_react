import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
// my components
import Form from './form';
import FormField from './formField';
import FormButtonWrapper from './formButtonWrapper';
import ProgressButton from './progressButton';
import SuccessSnackbar from './successSnackbar';
import icons from '../utils/icons';
// context
import { UserContext } from '../userContext';
// database
import * as DB from '../database/wrapper';

/* 
    checks trimmed input, returning the appropriate error message
    for now, each field has to be one word (no spaces between words)
*/
function checkInput(inputTrimmed) {
    var error = " ";
    const emptyError = "Please fill out this field";
    const invalidError = "Special characters not allowed";
    if (!inputTrimmed) {
        error = emptyError;
    } else if (!inputTrimmed.match(/^[A-Za-z0-9]+$/g)) {
        error = invalidError;
    }
    return error;
}

/*
    helper: checks validity of input based on returned error, trims input, and sets input error
*/
function isValid(input, setInput, setInputError) {
    const trimmed = input.trim();
    var error = checkInput(trimmed);
    setInput(trimmed);
    setInputError(error);
    return error.trim() === "";
}

/*
    helper: same functionality as isValid, but for toppings
    redundant to send both the topping and topping key, but saves from having to pass toppings each call
    cheaper to pass an index and the dispatch functions instead
*/
function isValidTopping(topping, key, updateToppings, updateToppingErrors) {
    const trimmed = topping.trim();
    var error = checkInput(trimmed);
    updateToppings(key, trimmed);
    updateToppingErrors(key, error);
    return error.trim() === "";
}

function AddForm() {
    const { userId, userName } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(" ");
    const [description, setDescription] = useState("");
    // TODO: for now, no rules on description input
    const [descriptionError, setDescriptionError] = useState(" ");
    const [sausage, setSausage] = useState("");
    const [sausageError, setSausageError] = useState(" ");
    const [sauce, setSauce] = useState("");
    const [sauceError, setSauceError] = useState(" ");
    // TODO: if need maxToppings in another component, create new "constants" file under utils
    const maxToppings = 15;

    // separate topping/errors Maps, since not always updating error while updating topping (i.e. textfield -> onchange)
    const [toppings, setToppings] = useState(new Map());
    function updateToppings(key, value) {
        setToppings(new Map(toppings.set(key, value)));
    }
    function removeTopping(key) {
        var t = new Map(toppings);
        t.delete(key);
        setToppings(t);
    }
    const [toppingErrors, setToppingErrors] = useState(new Map());
    function updateToppingErrors(key, value) {
        setToppingErrors(new Map(toppingErrors.set(key, value)));
    }
    function removeToppingError(key) {
        var e = new Map(toppingErrors);
        e.delete(key);
        setToppingErrors(e);
    }

    function handleAdd() {
        // set added to false again to handle consecutive adds on same page (no reload)
        setAdded(false);

        var titleValid = isValid(title, setTitle, setTitleError);
        var sausageValid = isValid(sausage, setSausage, setSausageError);
        var sauceValid = isValid(sauce, setSauce, setSauceError);

        var toppingsValid = true;
        console.log(toppings);
        console.log(toppingErrors);
        for (const key of toppings.keys()) {
            var topping = toppings.get(key);
            if (!isValidTopping(topping, key, updateToppings, updateToppingErrors)) {
                toppingsValid = false;
            }
        }
        console.log("toppingsValid: " + toppingsValid);

        // check errors with local vars, since setError functions are asynchronous
        if (titleValid && sausageValid && sauceValid && toppingsValid) {
            setLoading(true);
            (async () => {
                // convert map to array - no need for topping id in backend
                var toppingsArray = [];
                for (const topping of toppings.values()) {
                    toppingsArray.push(topping);
                }
                const hotdog = {
                    creatorId: userId,
                    creatorName: userName,
                    description: description,
                    title: title,
                    ingredients: {
                        sausage: sausage,
                        sauce: sauce,
                        toppings: toppingsArray
                    }
                }
                const addStatus = await DB.addHotdog(hotdog);
                setLoading(false);

                // if add hotdog succeeds, reset all fields and give user option to go back to homepage 
                // no restrictions on field values for now, so shouldn't fail
                if (!addStatus) {
                    console.log("addForm.js: something went wrong :(");
                } else {
                    setTitle("");
                    setDescription("");
                    setSausage("");
                    setSauce("");
                    setToppings(new Map());
                    setAdded(true);
                }
            })();
        }
    }

    // adds a topping and error state variables
    function handleAddTopping() {
        const id = uuidv4();
        updateToppings(id, "");
        updateToppingErrors(id, " ");
    }

    // removes given topping and error state variables
    function handleRemoveTopping(id) {
        console.log(id);
        removeTopping(id);
        removeToppingError(id);
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
                iconName="hotdogDescription"
                label="Description"
                value={description}
                setValue={setDescription}
                error={descriptionError}
                multiline
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
            {[...toppings.keys()].map((key, i) => (
                <FormField
                    key={key}
                    type="text"
                    iconName={i === 0 ? "hotdogTopping" : "none"}
                    label="Topping"
                    value={toppings.get(key)}
                    setValue={updateToppings}
                    error={toppingErrors.get(key)}
                    topping
                    toppingKey={key}
                    toppingRemove={handleRemoveTopping}
                />
            ))}
            <FormButtonWrapper>
                { toppings.size < maxToppings &&
                    <Button
                        variant="text"
                        color="primary"
                        disableElevation
                        startIcon={icons["addTopping"]}
                        onClick={() => handleAddTopping()}
                    >
                        Add Topping
                    </Button>
                }
                { toppings.size === maxToppings &&
                    <Button
                        disabled
                        variant="text"
                        color="primary"
                        disableElevation
                        startIcon={icons["addToppingDisabled"]}
                    >
                        Max. Toppings reached ({maxToppings})
                    </Button>
                }
            </FormButtonWrapper>
            <FormButtonWrapper>
                <ProgressButton 
                    text="Submit" 
                    loading={loading} 
                    handleClick={handleAdd}
                />
            </FormButtonWrapper>
            <SuccessSnackbar
                open={added}
                setOpen={setAdded}
                message="Posted new hotdog!"
            />
        </Form>
    );
} 

export default AddForm;
