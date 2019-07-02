import React, {PureComponent} from 'react';
import {Modal, View, TouchableOpacity, Text} from 'react-native';
import {styles as theme} from "../utils/theme";

export default class CustomAlert extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttons: []
        }
        this.dismiss.bind(this);
    }

    show(title, message, buttons = []) {
        this.setState({
            title,
            message,
            buttons,
            isVisible: true
        })
    }

    dismiss() {
        this.setState({
            isVisible: false
        })
    }

    dismissSelf = () => {
        this.setState({
            isVisible: false
        })
    };


    render() {
        const {title, message, isVisible, buttons} = this.state;
        return (
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={this.dismiss}
                visible={isVisible}>
                <View style={theme.modal}>
                    <View style={theme.modalBody}>
                        <Text style={[theme.modalTitle, {marginBottom: 18}]}>{title}</Text>
                        <Text style={[theme.modalMessage, {marginBottom: 18}]}>{message}</Text>

                        <View style={[theme.buttons, theme.inline]}>
                            {buttons.map(button => (
                                <TouchableOpacity
                                    onPress={button.onPress || this.dismissSelf}
                                    style={theme.alertButton}>
                                    <Text style={theme.alertButtonText}>{button.text}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>

                    </View>
                </View>
            </Modal>
        )
    }


}