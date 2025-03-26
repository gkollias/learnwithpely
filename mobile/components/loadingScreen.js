
import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'NunitoSans-Light': require('../assets/fonts/Nunito/NunitoSans-Light.ttf'),
                'NunitoSans-Regular': require('../assets/fonts/Nunito/NunitoSans-Regular.ttf'),
                'NunitoSans-SemiBold': require('../assets/fonts/Nunito/NunitoSans-SemiBold.ttf'),
                'NunitoSans-Bold': require('../assets/fonts/Nunito/NunitoSans-Bold.ttf'),
                'NunitoSans-ExtraBold': require('../assets/fonts/Nunito/NunitoSans-ExtraBold.ttf'),
                'NunitoSans-Black': require('../assets/fonts/Nunito/NunitoSans-Black.ttf'),
                'BebasNeue-Regular': require('../assets/fonts/BebasNeue/BebasNeue-Regular.ttf'),
                'Roboto-Black': require('../assets/fonts/Roboto/Roboto-Black.ttf'),
                'Roboto-BlackItalic': require('../assets/fonts/Roboto/Roboto-BlackItalic.ttf'),
                'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
                'Roboto-BoldItalic': require('../assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
                'Roboto-Italic': require('../assets/fonts/Roboto/Roboto-Italic.ttf'),
                'Roboto-Light': require('../assets/fonts/Roboto/Roboto-Light.ttf'),
                'Roboto-LightItalic': require('../assets/fonts/Roboto/Roboto-LightItalic.ttf'),
                'Roboto-Medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
                'Roboto-MediumItalic': require('../assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
                'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
                'Roboto-Thin': require('../assets/fonts/Roboto/Roboto-Thin.ttf'),
                'Roboto-ThinItalic': require('../assets/fonts/Roboto/Roboto-ThinItalic.ttf'),

            });
            navigation.navigate('Splash');
        }
        loadFont();
    }, [])

    return (
        <View style={styles.pageStyle}>
            <ActivityIndicator
                size={50}
                color={Colors.primaryColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingScreen;