import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';

/*observer needs a function as parameter */
export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [ loadingNext, setLoadingNext ]= useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    // Ici, useEffect nous permet de faire des actions quand notre appli se lance.
    // En l'occurence, on appelle la methode getActivities du back
    useEffect(() => {
        /* */
        if(activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities]); // [] permet d'executer la 'get' juste une fois. sinon, elle serait lancer n fois.

    if (activityStore.loadingInitial && !loadingNext) return (<LoadingComponent content='Loading activities...' />)

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
                <Button 
                    floated="right" 
                    content="More..." 
                    positive
                    onClick={handleGetNext}
                    loading={loadingNext} 
                    disabled={pagination?.totalPages === pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})