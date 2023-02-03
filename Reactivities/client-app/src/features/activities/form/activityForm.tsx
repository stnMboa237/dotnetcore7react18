import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        date: null,
        description: '',
        city: '',
        venue: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
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
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={3} placeholder='Description' name='description'/>
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category'/>
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextInput placeholder='City' name='city'/>
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                        <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})