import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

export default function () {
GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
})
  
    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log("test")
            if (userInfo.idToken) {
              console.log(userInfo)
            } else {
              throw new Error('no ID token present!')
            }
          } catch (error) {
            console.log("error:", error)
            console.log(userInfo)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
      />
    )
  }