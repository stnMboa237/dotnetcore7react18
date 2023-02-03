import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        date: '',
        description: '',
        city: '',
        venue: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required')
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => {
            setActivity(activity!); /*le ! permet tout simplement de desactiver le typeScript á ce niveau*/
        });
    }, [id, loadActivity]);

    /*after create/update an activity, we return to activityDetail view */
    // function handleSubmit(){
    //     if(!activity.id) {
    //         activity.id = uuid();
    //         createActivity(activity).then(() =>navigate(`/activities/${activity.id}`));
    //     }else{
    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value});
    // }

    if(loadingInitial) return <LoadingComponent content="Loading activity..."/>
    return (
        <Segment clearing>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => console.log(values)}>
                {/* formik a besoin de 3 choses pour notre form:
                    PS: enableReinitialize permet de setter les champs du form après son initialisation
                    - values: la valeur (objet contenant les champs du form) 
                    - handleChange: fction FORMIK qui gère la gestion des update des champs
                    - handleSubmit: fction FORMIK qui gère la submit du Form
                */
                ({handleSubmit}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <FormField>
                            <Field placeholder='Title' name='title'/>
                            <ErrorMessage name="title" 
                                render={error => <Label basic color='red' content={error}/>} />
                        </FormField>
                        <MyTextInput name="title" placeholder="Title" />
                    <Field placeholder='Description' name='description'/>
                    <Field placeholder='Category' name='category'/>
                    <Field type="date" placeholder='Date' name='date'/>
                    <Field placeholder='City' name='city'/>
                    <Field placeholder='Venue' name='venue'/>
                    <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                    <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})