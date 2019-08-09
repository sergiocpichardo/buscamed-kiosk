import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import BuscamedKeyboard from "../../components/BuscamedKeyboard";
import {styles} from "../../utils/theme";
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons.js';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: MaterialCommunityIcons;
  }`;
  
  // Create stylesheet
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }
  
  // Inject stylesheet
  document.head.appendChild(style);

class SpecialityInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            textInputId: ""
        }

        this.scrollOffsetY = 0;
        this.specialityFlatList = {};
    }

    renderItem = ({item}) => {
        const {handleSelectOption} = this.props.screenProps['SpecialityInput'];
        
        return (
            <TouchableOpacity
                onPress={() =>{ handleSelectOption(item); this.props.navigation.navigate('DoctorList')}}
                style={[styles.buttonOutline, { padding: 15,}]}>
                <Text style={styles.buttonOutlineText}>{item.name}</Text>
            </TouchableOpacity>
        )
    };


    render() {
        console.log(this.props.screenProps['SpecialityInput']);
        const {onNextSlide, items} = this.props.screenProps['SpecialityInput'];


        return (
            <View style={[styles.slide]}>

                <View style={[styles.section, styles.box, {justifyContent: 'center'}]}>

                    <Text style={styles.title}>
                        Selecciona la especialidad
                    </Text>

                    <FlatList
                        ref={ref => this.specialityFlatList = ref}
                        onScroll={(event) => {
                            this.scrollOffsetY = event.nativeEvent.contentOffset.y
                        }}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                        style={{  width: '80%', }}
                        data={items}
                        numColumns={3}
                        renderItem={this.renderItem}
                    />


                    <View style={{flexDirection: 'column',position: 'absolute', right: '5%', top: 60, bottom: 0, flex: 1, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={()=> {
                            this.specialityFlatList.scrollToOffset({
                                offset:this.scrollOffsetY - 180,
                                animated: true
                            });
                        }}>
                            <Icon name="arrow-up-bold-circle" size={80}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {
                            this.specialityFlatList.scrollToOffset({
                                offset:this.scrollOffsetY + 180,
                                animated: true
                            });
                        }}>
                            <Icon name="arrow-down-bold-circle" size={80}/>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        )

    }
}

export default SpecialityInput;