import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, FlatList, Image, BackHandler } from 'react-native'
import React, { useState, useCallback, createRef } from 'react'
import { Colors, CommonStyles, Fonts, Screen, Sizes } from '../../constants/styles'
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/images/onboarding/onboarding1.png'),
        onboardingTitle: 'Ζήσε το εκπαιδευτικό σου ταξίδι μαζί μας',
        onboardingDescription: '1. Μάθετε οποτεδήποτε, οπουδήποτε 🌐 \
2. Μαθήματα από ειδικούς σχεδιασμένα για εσάς 🎓\
3. Προσιτή εκπαίδευση σε ποικίλα μαθήματα💡\
4. Συμμετέχετε σε μια δυναμική κοινότητα μάθησης 👥 \
5. Εξασκηθείτε στην ελληνική γλώσσα και τα μαθηματικά με ασκήσεις για κάθε κεφάλαιο του σχολείου. Ξεκινήστε το ταξίδι σας τώρα! 🌟 #LearnWithUs"'
    },
    {
        id: '2',
        onboardingImage: require('../../assets/images/panda/happyPanda.png'),
        onboardingTitle: 'Ζήσε την Περιπέτεια του Συναγωνισμού',
        onboardingDescription: '- **Ανταγωνισμός:** Συμμετέχετε σε φιλικό ανταγωνισμό με άλλους μαθητές.\
        - **Σύστημα Βαθμολόγησης:** Κερδίστε βαθμούς ολοκληρώνοντας εργασίες\
        - **Ενημερώσεις Σε Πραγματικό Χρόνο:** Παρακολουθήστε την πρόοδό σας αμέσως με ενημερώσεις σε πραγματικό χρόνο.\
        - **Κίνητρο:** Ενισχύστε το κίνητρό σας ανεβαίνοντας στην κατάταξη και φτάνοντας στις πρώτες θέσεις.\
        - **Αναγνώριση:** Επιδείξτε τις επιτυχίες σας και ξεχωρίστε μεταξύ των συνομηλίκων σας.\
        - **Ανταμοιβές:** Ξεκλειδώστε συναρπαστικές ανταμοιβές και κίνητρα καθώς φτάνετε σε σημεία κορυφής του πίνακα.\
    \
        Συμμετέχετε στον πίνακα κατάταξης, αποδεχθείτε την πρόκληση και ξεκινήστε το ταξίδι της μάθησης! 🏆 #LeaderboardSuccess"'
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const listRef = createRef();
    const [backClickCount, setBackClickCount] = useState(0);
    const [currentScreen, setCurrentScreen] = useState(0);

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ animated: true, index: index });
        setCurrentScreen(index);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {onboardingScreenContent()}
                {indicators()}
                {nextAndGetStartedButton()}
                {skipText()}
            </View>
            {exitInfo()}
        </SafeAreaView>
    )

    function skipText() {
        return (
            <Text
                onPress={() => navigation.push('Login')}
                style={{ margin: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.primaryColor16Bold }}
            >
                {currentScreen == 1 ? '' : ' Skip'}
            </Text>
        )
    }

    function nextAndGetStartedButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { currentScreen == 1 ? navigation.push('Login') : scrollToIndex({ index: currentScreen + 1 }) }}
                style={CommonStyles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    {currentScreen == 1 ? 'Get Started' : 'Next'}
                </Text>
            </TouchableOpacity>
        )
    }

    function indicators() {
        return (
            <View style={{ ...styles.indicatorWrapStyle, }}>
                {
                    onboardingScreenList.map((item, index) => {
                        return (
                            <View
                                key={`${item.id}`}
                                style={{
                                    ...currentScreen == index ? styles.selectedIndicatorStyle : styles.indicatorStyle,
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function onboardingScreenContent() {
        const renderItem = ({ item }) => {
            return (
                <View style={styles.screenContentWrapStyle}>
                    <Image
                        source={item.onboardingImage}
                        style={{ width: '100%', height: Screen.height / 2.9, resizeMode: 'contain' }}
                    />
                    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 5.0, }}>
                        <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding + 5.0, textAlign: 'center', ...Fonts.blackColor26ExtraBold }}>
                            {item.onboardingTitle}
                        </Text>
                        <Text numberOfLines={3} style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold, }}>
                            {item.onboardingDescription}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <FlatList
                ref={listRef}
                data={onboardingScreenList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
            />
        )
    }

    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentScreen(pageNum);
    }

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={styles.exitInfoWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        Press Back Once Again To Exit!
                    </Text>
                </View>
                :
                null
        )
    }

}

export default OnboardingScreen;

const styles = StyleSheet.create({
    screenContentWrapStyle: {
        flex: 1,
        width: width,
        height: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    exitInfoWrapStyle: {
        backgroundColor: Colors.grayColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedIndicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
        backgroundColor: Colors.primaryColor
    },
    indicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 6.0,
        height: 6.0,
        borderRadius: 3.0,
        backgroundColor: Colors.grayColor,
        opacity: 0.5
    },
    indicatorWrapStyle: {
        marginVertical: Sizes.fixPadding * 4.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    nextAndGetStartedButtonStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding + 3.0,
    }
})