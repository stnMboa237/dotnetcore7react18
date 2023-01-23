import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{

    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    /*exple d'arrow function asynchrone*/
    loadActivities = async () => {
        /*parlant de funct dt on wait la promise, c'est d'etre asynchrone
        le code non asynchrone DOIT se trouver hors du bloc try/catch*/
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Actvities.list();
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                });
            this.setLoadingInitial(false);
            
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
        
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }
}