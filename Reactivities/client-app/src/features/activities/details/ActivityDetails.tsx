import { Button, ButtonGroup, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity : Activity;
    cancelSelectActivity:() => void;
}

export default function ActivityDetails({activity, cancelSelectActivity} : Props) {
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
                    <Button basic color="blue" content='Edit'/>
                    <Button /* sans (), la fonct cancelSelectActivity n'est executé que qd on click sur cancel */ 
                        onClick={cancelSelectActivity}basic color="grey" content='Cancel'
                    />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}