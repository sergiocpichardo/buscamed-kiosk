import React, {PureComponent, Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    StyleSheet,
    Button,
    PermissionsAndroid,
    Image
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {styles} from "../../utils/theme";

const defaultState = {
    isCameraVisible: true,
    isTakingPicture: false,
    count: 5,
    pictureTaken: false,
    image: {}
};

class PhotoTake extends Component {

    constructor(props) {
        super(props);
        this.state = defaultState
    }


    showCameraView = () => {
        this.setState({isCameraVisible: true});
    };

    reset = () => {
        this.setState({
            ...defaultState,
        })
    }

    componentDidMount(): void {

        setTimeout(() => {
            this.requestCameraPermission();
            // this.cameraButton.props.onPress();
        }, 2000)
        // setTimeout(()=> {
        //     this.setState({ isCameraVisible: true });
        // }, 2000);
        //
        // setTimeout(()=> {
        //     this.setState(()=> {
        //         // this.camera.resumePreview()
        //     }, 5000);
        // }, 5000)
        //
        // let counter = setInterval(()=> {
        //     const {count} = this.state;
        //     if(count !== 0) {
        //         this.setState({
        //             count: count - 1
        //         })
        //     } else {
        //         this.setState({
        //             pictureTaken: true
        //         },()=> {
        //             clearInterval(counter)
        //         });
        //     }
        // }, 1000)
    }

    startTimer = () => {
        this.setState({
            count: 5,
            pictureTaken: false,
            isTakingPicture: true,

        }, () => {
            let counter = setInterval(() => {
                const {count} = this.state;
                if (count !== 0) {
                    if(count === 1) {
                        this.takePicture();
                    }
                    this.setState({
                        count: count - 1
                    })
                } else {
                    this.setState({
                        isTakingPicture: false,
                        count: 5
                    }, () => {
                        clearInterval(counter)
                    });
                }
            }, 1000)
        })

    }

    /* takePicture() {
         const options = {};
         //options.location = ...
         this.camera.capture({metadata: options})
             .then((data) => {
                 alert(data);
                 this.setState({isCameraVisible: false});
             })
             .catch(err => console.error(err));
     }*/

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('You can use the camera');
                // this.setState({
                //     isCameraVisible: true
                // })
            } else {
                // console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    // }

    takePicture = async function () {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            this.setState({
                image: data,
                pictureTaken: true
            });
        }
    };


    render() {

        const {setPicture,patient} = this.props;
        // const patientPicture = "https://buscamed.do/admin" . patient.display_image;

        const {isCameraVisible, isTakingPicture, count, isTaking, pictureTaken, image} = this.state;
        return (
            <View style={styles.slide}>
                <View style={[styles.section, styles.box, {justifyContent: 'flex-start'}]}>
                    <Text style={[styles.title, {fontSize: 40, marginBottom: 40}]}>
                        Tomar foto
                    </Text>
                    <View style={innerStyles.container}>
                        {!isCameraVisible && <Button ref={(ref) => {
                            this.cameraButton = ref;
                        }} title="Show me Camera" onPress={this.showCameraView}/>}
                        {isCameraVisible && (
                            <View>
                                {pictureTaken  ? (
                                    <Image resizeMode="cover" source={{uri: image.uri}} style={innerStyles.preview}/>
                                ) : (
                                    <RNCamera
                                        captureAdio={false}
                                        type={RNCamera.Constants.Type.front}
                                        permissionDialogTitle={'Permission to use camera'}
                                        permissionDialogMessage={'We need your permission to use your camera phone'}
                                        ref={ref => {this.camera = ref}}
                                        style={innerStyles.preview}>
                                    </RNCamera>
                                )}
                            </View>
                        )}
                    </View>


                    {!isTakingPicture && (
                        <TouchableOpacity
                            onPress={this.startTimer}
                            style={[styles.button, {minWidth: 260, width: 400}]}>
                            <Text style={styles.buttonText}>Tomar foto</Text>
                        </TouchableOpacity>
                    )}

                    {isTakingPicture && (
                        <View>
                            <Text style={{fontSize: 70}}>{count}</Text>
                        </View>
                    )}

                    <TouchableOpacity

                        onPress={()=> setPicture(image)}
                        style={[styles.button, {position: 'absolute', bottom: 25, right: 25}]}>
                        <Text style={styles.buttonText}>Siguiente</Text>
                    </TouchableOpacity>


                </View>
            </View>

        )
    }

}

const innerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 15

    },
    preview: {
        width: 400,
        height: 300,
        borderRadius: 15,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

export default PhotoTake;