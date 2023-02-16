import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer (function RegisterForm(){
    const {userStore} = useStore();
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
    });

    return(
        <Formik 
            /*afin de recuperer le bon msg d'erreur en login, on introduit la variable
            error dans 'initialValues á null et on rajoute la methode setErrors dans onSubmit'*/
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => 
                userStore.register(values).catch(err => 
                setErrors({error: err})
            )}
            validationSchema={validationSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                /* to show error into the form, we MUST add the class "error" into className of <Form> */
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content='Sign Up to Reactivities' color="teal" textAlign="center"/>
                    <MyTextInput placeholder="Display Name" name="displayName"/>
                    <MyTextInput placeholder="User Name" name="username"/>
                    <MyTextInput placeholder="Email" name="email"/>
                    <MyTextInput placeholder="Password" name="password" type="password"/>
                    <ErrorMessage 
                        name="error" 
                        render={() => <ValidationError errors={errors.error} />}
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