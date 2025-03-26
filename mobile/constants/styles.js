import { Dimensions } from "react-native"

export const Colors = {
    primaryColor: '#6A5AE0',
    lightPrimaryColor: 'rgba(106, 90, 224, 0.1)',
    extraLightPrimaryColor: 'rgba(106, 90, 224, 0.035)',
    whiteColor: '#FFFFFF',
    offWhiteColor: 'rgba(255,255,255,0.5)',
    extraOffWhiteColor: 'rgba(255,255,255,0.3)',
    blackColor: '#000000',
    grayColor: '#8A9CBF',
    lightGrayColor: 'rgba(138, 156, 191, 0.5)',
    redColor: '#FF0000',
    yellowColor: '#FDD835',
    pinkColor: '#F06292',
    tomatoColor: '#E57373',
    blueColor: '#64B5F6',
    greenColor: '#4DB6AC',
    hightLightGreenColor: '#00D209',
}

export const Sizes = {
    fixPadding: 10.0,
}

const screenWidth = Dimensions.get('window').width;

const screenHeight = Dimensions.get('window').height;

export const Screen = {
    width: screenWidth,
    height: screenHeight,
}

export const Fonts = {

    blackColor16SemiBold: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Regular'
    },

    blackColor18SemiBold: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Regular'
    },

    blackColor16Bold: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Medium'
    },

    blackColor18Bold: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Medium'
    },

    blackColor20Bold: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Medium'
    },

    blackColor20ExtraBold: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Bold'
    },

    blackColor26ExtraBold: {
        color: Colors.blackColor,
        fontSize: 26.0,
        fontFamily: 'Roboto-Bold'
    },

    grayColor14SemiBold: {
        color: Colors.grayColor,
        fontSize: 14.0,
        fontFamily: 'Roboto-Regular'
    },

    grayColor16SemiBold: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Regular'
    },

    grayColor14Bold: {
        color: Colors.grayColor,
        fontSize: 14.0,
        fontFamily: 'Roboto-Medium'
    },

    grayColor16Bold: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Medium'
    },

    grayColor12ExtraBold: {
        color: Colors.grayColor,
        fontSize: 12.0,
        fontFamily: 'Roboto-Bold'
    },

    whiteColor16SemiBold: {
        color: Colors.whiteColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Regular'
    },

    whiteColor18Bold: {
        color: Colors.whiteColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Medium'
    },

    whiteColor20Bold: {
        color: Colors.whiteColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Medium'
    },

    whiteColor19ExtraBold: {
        color: Colors.whiteColor,
        fontSize: 19.0,
        fontFamily: 'Roboto-Bold'
    },

    whiteColor22ExtraBold: {
        color: Colors.whiteColor,
        fontSize: 22.0,
        fontFamily: 'Roboto-Bold'
    },

    whiteColor26ExtraBold: {
        color: Colors.whiteColor,
        fontSize: 26.0,
        fontFamily: 'Roboto-Bold'
    },

    whiteColor18Black: {
        color: Colors.whiteColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Black'
    },

    primaryColor16SemiBold: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Regular'
    },

    primaryColor18SemiBold: {
        color: Colors.primaryColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Regular'
    },

    primaryColor14Bold: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: 'Roboto-Medium'
    },

    primaryColor16Bold: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Medium'
    },

    primaryColor18Bold: {
        color: Colors.primaryColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Medium'
    },

    primaryColor20Bold: {
        color: Colors.primaryColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Medium'
    },

    primaryColor14ExtraBold: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: 'Roboto-Bold'
    },

    primaryColor20ExtraBold: {
        color: Colors.primaryColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Bold'
    },

    primaryColor24ExtraBold: {
        color: Colors.primaryColor,
        fontSize: 24.0,
        fontFamily: 'Roboto-Bold'
    },

    primaryColor36Black: {
        color: Colors.primaryColor,
        fontSize: 36.0,
        fontFamily: 'Roboto-Black'
    },

    pinkColor18ExtraBold: {
        color: Colors.pinkColor,
        fontSize: 18.0,
        fontFamily: 'Roboto-Bold'
    },

    blueColor16Bold: {
        color: Colors.blueColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Medium'
    },

    blueColor20ExtraBold: {
        color: Colors.blueColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Bold'
    },

    greenColor16Bold: {
        color: Colors.greenColor,
        fontSize: 16.0,
        fontFamily: 'Roboto-Medium'
    },

    greenColor20ExtraBold: {
        color: Colors.greenColor,
        fontSize: 20.0,
        fontFamily: 'Roboto-Bold'
    },

    blackColor48bebas: {
        color: Colors.blackColor,
        fontSize: 48.0,
        fontFamily: 'BebasNeue-Regular'
    },

    whiteColor30Bebas: {
        color: Colors.whiteColor,
        fontSize: 30.0,
        fontFamily: 'BebasNeue-Regular'
    },

    whiteColor36Bebas: {
        color: Colors.whiteColor,
        fontSize: 36.0,
        fontFamily: 'BebasNeue-Regular'
    }
}

export const CommonStyles = {
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding * 1.6,
        marginHorizontal: Sizes.fixPadding * 4.0,
        elevation: 2.0,
        shadowColor: Colors.primaryColor
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
    },
    authTextFieldWrapStyle: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.extraLightPrimaryColor,
        borderWidth: 1.5,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding * 1.8,
    }
}