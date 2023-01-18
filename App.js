/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute, NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { NativeBaseProvider } from "native-base"
import { View, Text, useColorScheme, Settings  } from 'react-native'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import React from 'react'

import ChatComponent from './src/components/Chat'
import WishlistScreen from './src/screens/Wishlist'
import InboxScreen from './src/screens/Inbox'
import ListingScreen from './src/screens/Listing'
import ProfileScreen from './src/screens/User'
import SettingsComponent from './src/components/Settings'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'

function AppScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>App JS screen</Text>
    </View>
  );
}

const AppStack = createStackNavigator();

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='App JS' component={AppScreen} />
    </AppStack.Navigator>
  );
}

const WishlistStack = createStackNavigator();

function WishlistStackScreen() {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen name='Dorm Wishlist' component={WishlistScreen} />
    </WishlistStack.Navigator>
  );
}

const ListingStack = createStackNavigator();

function ListingStackScreen() {
  return (
    <ListingStack.Navigator>
      <ListingStack.Screen name='Dorm Listing' component={ListingScreen} />
    </ListingStack.Navigator>
  );
}

const InboxStack = createStackNavigator();

function InboxStackScreen() {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen name='Messages' component={InboxScreen} />
      <InboxStack.Screen name='Chat' component={ChatComponent} />
    </InboxStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name='Account Profile' component={ProfileScreen} />
      <UserStack.Screen 
        name="Settings" 
        component={SettingsComponent} 
        options={({ route }) => ({
          headerShown: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            console.log(routeName)
            if (routeName === 'Account Information' || routeName === 'Change Password') {
              return false
            }
            return
          })(route),
        })}
      />
    </UserStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <Tab.Navigator initialRouteName={AppStackScreen}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            return <MatCommIcons name={'compass'} size={size} color={color} />;
          } else if (route.name === 'Listing') {
            return <MatIcons name={'add-circle'} size={size} color={color} />;
          } else if (route.name === 'Inbox') {
            return <MatIcons name={'inbox'} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <MatIcons name={'person'} size={size} color={color} />;
          } // Add for other tabs
        },
        tabBarActiveTintColor: 'teal',
      })}
    >
    <Tab.Screen name='App' component={AppStackScreen} />
    <Tab.Screen name='Listing' component={ListingStackScreen} />
    <Tab.Screen 
      name='Inbox'
      component={InboxStackScreen} 
      options={({ route }) => ({
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""
          console.log(routeName)
          if (routeName === 'Chat') {
            return { display: "none" }
          }
          return
        })(route),
      })}
    />
    <Tab.Screen 
      name='Profile'
      component={UserStackScreen} 
      options={({ route }) => ({
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""
          console.log(routeName)
          if (routeName === 'Settings') {
            return { display: 'none' }
          }
          return
        })(route),
      })}
    />
  </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isSignedIn ? (
            <Stack.Screen name='Main' component={RootNavigator}/>
          ) : (
            <>
              <Stack.Screen 
              name='Login' 
              component={LoginScreen}
              />
              <Stack.Screen 
              name='SignUp' 
              component={SignUpScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
