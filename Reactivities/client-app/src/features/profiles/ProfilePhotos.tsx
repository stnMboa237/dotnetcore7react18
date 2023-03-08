import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, ButtonGroup, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    /* ceci est un state locale dont le but est d'afficher le loader juste dans le btn setMain*/
    const [target, setTarget] = useState('');

    function handleSetMainPhoto(photo: Photo, e:SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name); //get the name attribute of the btn
        setMainPhoto(photo);
    }

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => {
            setAddPhotoMode(false);
        });
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon={'image'} floated='left' content='Photos' />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (<PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>): 
                        (
                            <Card.Group itemsPerRow={5}>
                                {profile.photos?.map(photo => (
                                    <Card key={photo.id} >
                                        <Image src={photo.url} />
                                        {isCurrentUser && (
                                            <ButtonGroup fluid widths={2}>
                                                <Button 
                                                    basic 
                                                    color="green" 
                                                    content='Main'
                                                    name={photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.id && loading}
                                                    onClick={e => handleSetMainPhoto(photo,e)}
                                                />
                                                <Button 
                                                    basic
                                                    color="red"
                                                    icon='trash'
                                                />
                                            </ButtonGroup>
                                        )}
                                    </Card>
                                ))}
                            </Card.Group>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})