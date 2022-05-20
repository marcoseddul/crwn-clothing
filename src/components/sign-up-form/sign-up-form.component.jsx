import { useState } from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormfields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassowrd: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormfields);
    const { displayName, email, password, confirmPassowrd } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormfields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassowrd){
            alert("passwords do no match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user created encoutered an error', error);
            }
            
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    }

    return (
        <div className="sign-up-container">
            <h2></h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} action="">
                <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassowrd" value={confirmPassowrd}/>
                <Button type='submit'>
                    Sign up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;