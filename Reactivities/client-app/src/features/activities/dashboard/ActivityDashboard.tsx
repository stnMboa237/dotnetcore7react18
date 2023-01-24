import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/activityForm';
import ActivityList from './ActivityList';

/*observer needs a function as parameter */
export default observer(function ActivityDashboard() {
    
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    /* le detail de l'activi s'affiche ssi une activité est selectionné ou undefined */
                    selectedActivity && !editMode && <ActivityDetails /> 
                }
                {
                    editMode && <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})