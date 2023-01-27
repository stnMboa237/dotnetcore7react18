import { useStore } from "../../../app/stores/store";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";

export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity } = activityStore;

    if(!activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span >{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button  basic color="blue" content='Edit'/>
                    <Button /* sans () et sans param, la fonct cancelSelectActivity n'est executé que qd on click sur cancel */ 
                        basic color="grey" content='Cancel'
                    />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}