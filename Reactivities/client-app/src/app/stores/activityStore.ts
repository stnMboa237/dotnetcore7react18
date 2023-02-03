import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    /*action: returns activities sorted by date*/
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    /*action: returns many maps where every maps
    is  map<key:string(date), Activity[]> */
    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy'); //get the date of the current activity: key 
                /*then, scan the activities array. if the current act 'activity' has the same date 
                with activity from the 'activities', then add the current activity into the array
                else, create a new array and add it into */
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;

            }, {} as { [key: string]: Activity[] })
            /*the type of the Object.entries is a map 
            having string as key and array of activities as value
            
            {} as { [key: string]: Activity[] }is the initial value (entry Array of map<string, Activity[]>)
            of the returned object*/
        );
    }

    /*exple d'arrow function asynchrone*/
    loadActivities = async () => {
        /*parlant de funct dont on wait la promise, c'est d'etre asynchrone
        le code non asynchrone DOIT se trouver hors du bloc try/catch*/
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity; /*toute modif d'une propriete observable dans une 
                    action doit se faire dans un runInAction*/
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity); /* update an existing activity based on key (id) / or insert a new one*/
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}