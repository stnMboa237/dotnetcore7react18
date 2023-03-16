import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
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
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat activityId={activity.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity}/>
            </Grid.Column>
        </Grid>
    )
})