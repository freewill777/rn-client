import { useEffect, useState, useRef, useContext } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library'
import { HOST } from '../../settings';
import { UserContext } from '../../UserProvider';
export default function Recorder({ turnOff }) {
    const { userId } = useContext(UserContext)
    const [hasCameraPermission, setHasCameraPermission] = useState()
    const [hasMicPermission, setHasMicPermission] = useState()
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()

    const cameraRef = useRef()
    const [isRecording, setIsRecording] = useState(false)
    const [video, setVideo] = useState()


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const micPermission = await Camera.requestMicrophonePermissionsAsync()
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()

            setHasCameraPermission(cameraPermission.status === 'granted')
            setHasMicPermission(micPermission.status === 'granted')
            setHasMediaLibraryPermission(mediaLibraryPermission === 'granted')
        })();
    }, [])


    if (hasCameraPermission === undefined || hasMicPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }


    let recordVideo = () => {
        setIsRecording(true)
        let options = {
            quality: '1080p',
            maxDuration: 60,
            mute: false
        }
        cameraRef.current.recordAsync(options).then(async (vid) => {
            setVideo(vid)
            setIsRecording(false)

        })
    }


    let stopRecording = () => {
        setIsRecording(false)
        cameraRef.current.stopRecording()
    }


    if (video) {

        let saveVideo = async () => {
            const formData = new FormData();
            formData.append('files', {
                uri: video.uri,
                type: 'video/quicktime',
                name: 'my-image.mov',
            });
            formData.append('userId', userId)
            try {
                const response = await fetch(`${HOST}/upload_files`, {
                    method: 'POST',
                    headers: {
                        'userId': userId,
                        'mediaType': 'video',
                    },
                    body: formData,
                });
                // const responseData = await response.json();
            } catch (error) {
                console.error(error);
            }
        }


        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: video.uri }}
                    useNativeControls
                    resizeMode='contain'
                    isLooping
                />
                <Button title='Save' onPress={saveVideo} />
                <Button title='Discard' onPress={() => setVideo(undefined)} />
            </SafeAreaView>
        )
    }


    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title='Close' onPress={turnOff} />
                <Button title={isRecording ? 'Stop Recording' : 'Record Video'} onPress={isRecording ? stopRecording : recordVideo} />
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
    },
    video: {
        flex: 1,
        alignSelf: 'stretch'
    }
});