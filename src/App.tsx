import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login as LoginScreen } from './screens/Login';
import { Home as HomeScreen } from './screens/Home';
import Prank from './screens/Prank';
import AboutScreen from './screens/About';
import { account } from './services/appWrite';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkSession = async () => {
    try {
      const user = await account.get();
      console.log('User session active:', user);
      if (user.email)
        setIsAuthenticated(true);
      else
        setIsAuthenticated(false)
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogoutSuccess = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName={isAuthenticated ? 'Home' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} type="login" />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} type="signup" />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} onLogoutSuccess={handleLogoutSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Prank" component={Prank}  />
            <Stack.Screen name="About" component={AboutScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
