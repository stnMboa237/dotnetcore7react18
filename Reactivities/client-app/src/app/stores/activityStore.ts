import { action, makeObservable, observable } from "mobx";

export default class ActivityStore{
    title = 'Hello from MobX!';

    constructor(){
        makeObservable(this, {
            title: observable,
            setTitle: action
            /*setTitle: action.bound permet de bind directement la classe ActivityStore á la function/action
                setTitle(){
                    this.title=this.title + '!';
                }            
            -----------------
            une alternative avec l'autoBind serait de definir
            setTitle: action, dans le constructeur

            et dans l'action 
            setTtile = () => {
                this.title=this.title + '!';
            }
            */
        })
    }

    setTitle = () => {
        this.title=this.title + '!';
    }
}