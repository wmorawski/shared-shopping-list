import React, {useState} from 'react';
import {Layout, Text, Icon, Button} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const FacebookIcon = (props: any) => (
  <Icon {...props} name="facebook-outline" />
);

export const LoginScreen = () => {
    const [loading, setLoading] = useState(false);

  const onFacebookButtonPress = async () => {
      setLoading(true);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1" style={{marginBottom: 40}}>
        Zaloguj się
      </Text>
      <Button
        status="primary"
        icon={FacebookIcon}
        disabled={loading}
        onPress={() => onFacebookButtonPress().then(() => setLoading(false))}>
          {loading ? 'logowanie...' : 'zaloguj przez Facebook'}
      </Button>
    </Layout>
  );
};
