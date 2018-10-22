import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import SettingsScreen from './screens/Settings';
import ListScreen from './screens/List';
import DetailsScreen from './screens/Details';

const primaryColor = 'tomato';
const inactiveColor = 'grey';
const secondaryColor = '#FFFFFF';

const HomeStack = createStackNavigator(
  {
    Details: DetailsScreen,
    List: ListScreen,
  },
  {
    initialRouteName: 'List',
    navigationOptions: {
      headerTitle: 'Movie Database',
      headerStyle: {
        backgroundColor: primaryColor,
      },
      headerTintColor: secondaryColor,
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    MainSettings: SettingsScreen,
  },
  {
    initialRouteName: 'MainSettings',
    navigationOptions: {
      headerTitle: 'Settings',
      headerStyle: {
        backgroundColor: primaryColor,
      },
      headerTintColor: secondaryColor,
    }
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'Settings') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }

            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: primaryColor,
        inactiveTintColor: inactiveColor,
    },
  }
);


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator styles={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
