import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const {id} = useParams();

    /* useEffect() permet d'excuter des actions/fctions quand le composant se charge */
    useEffect(() => {
        if(id){
            loadActivity(id);
        }
    },[id, loadActivity]); /*on rajoute des dépendances [id, loadActivity] afin 
    que useEffect soit reexecutée si id/loadActivity(<=> activityRegistry) changeraient*/

    if(loadingInitial || !activity) return <LoadingComponent />;

    return (
        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        //     <Card.Content>
        //         <Card.Header>{activity.title}</Card.Header>
        //         <Card.Meta>
        //             <span >{activity.date}</span>
        //         </Card.Meta>
        //         <Card.Description>
        //             {activity.description}
        //         </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <ButtonGroup widths='2'>
        //             <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit'/>
        //             <Button /* sans () et sans param, la fonct cancelSelectActivity n'est executé que qd on click sur cancel */ 
        //                 as={Link} to={`/activities`} basic color="grey" content='Cancel'
        //             />
        //         </ButtonGroup>
        //     </Card.Content>
        // </Card>
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})