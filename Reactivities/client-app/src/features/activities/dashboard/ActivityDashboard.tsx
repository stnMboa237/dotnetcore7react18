import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

/*observer needs a function as parameter */
export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();

    // Ici, useEffect nous permet de faire des actions quand notre appli se lance.
    // En l'occurence, on appelle la methode getActivities du back
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]); // [] permet d'executer la 'get' juste une fois. sinon, elle serait lancer n fois.

    if (activityStore.loadingInitial) return (<LoadingComponent content='Loading app' />)

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
                <h2>Activity Filters</h2>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
})