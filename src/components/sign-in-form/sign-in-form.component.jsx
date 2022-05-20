import { useState } from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
const defaultFormfields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormfields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormfields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

        } catch(error){
            
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    }

    return (
        <div className="sign-up-container">
            <h1>Already have an account?</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} action="">
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password}/>
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default SignInForm;