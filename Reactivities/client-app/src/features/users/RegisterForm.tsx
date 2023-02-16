import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default observer (function RegisterForm(){
    const {userStore} = useStore();
    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is required'),
        username: Yup.string().required('The user name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    return(
        <Formik 
            /*afin de recuperer le bon msg d'erreur en login, on introduit la variable
            error dans 'initialValues á null et on rajoute la methode setErrors dans onSubmit'*/
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => 
                userStore.register(values).catch(err => 
                setErrors({error: 'Invalid email or password'})
            )}
            validationSchema={validationSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content='Sign Up to Reactivities' color="teal" textAlign="center"/>
                    <MyTextInput placeholder="Display Name" name="displayname"/>
                    <MyTextInput placeholder="User Name" name="username"/>
                    <MyTextInput placeholder="Email" name="email"/>
                    <MyTextInput placeholder="Password" name="password" type="password"/>
                    <ErrorMessage 
                        name="error" 
                        render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}
                    />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content='Register' 
                        type="submit" 
                        fluid
                    />
                </Form>
            )}
            
        </Formik>
    )
})