import React from 'react';
import {Button, Text, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeScreen from './screens/Home';
import MainScreen from './screens/Main';
import StartScreen from './screens/Start';
import RegisterScreen from './screens/Join';
import CargoListScreen from './screens/CargoList';
import OrderListScreen from './screens/OrderList';
import CargoSmartScreen from './screens/CargoSmart';
import TokenScreen from './screens/Token';
import CargoDetailsScreens from './screens/CargoDetails';
import OrderDetailsScreens from './screens/OrderDetails';
import NavigationScreen from './screens/Navigation';
import {tsConstructorType} from '@babel/types';
import DrawerContent from './screens/DrawerContent';

const defaultNavigationOptions = ({navigation}) => {
  console.log('defaultNavigationOptinos', navigation.state);
  return {
    headerTitle: (
      <View style={{alignContent: 'center', color: '#ffffff'}}>
        <Text>
          <Image source={require('./public/images/icMap.png')} />
          {navigation.getParam('gpsdata')}
        </Text>
      </View>
    ),
    headerTitleStyle: {
      flexGrow: 1,
      alignSelf: 'center',
    },
    headerStyle: {
      paddingHorizontal: 8,
      backgroundColor: '#5ab9cd',
    },
    headerRight: (
      <Button
        style={{paddingLeft: 10}}
        onPress={() => navigation.openDrawer()}
        title="Hi"
      />
    ),
  };
};

const CargoDetailStack = createStackNavigator(
  {
    CargoListDisplay: {
      screen: CargoListScreen,
    },
    CargoDetails: {
      screen: CargoDetailsScreens,
    },
    MainInterCargo: {
      screen: MainScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

const OrderDetailStack = createStackNavigator(
  {
    OrderListDisplay: {
      screen: OrderListScreen,
    },
    OrderDetails: {
      screen: OrderDetailsScreens,
    },
  },
  {
    headerMode: 'none',
  },
);

const MainStack = createStackNavigator(
  {
    MainDisplay: {
      screen: MainScreen,
    },
    CargoList: {
      screen: CargoDetailStack,
    },
    OrderList: {
      screen: OrderDetailStack,
    },
    CargoSmart: {
      screen: CargoSmartScreen,
    },
    Token: {
      screen: TokenScreen,
    },
    CargoStart: {
      screen: StartScreen,
    },
    Navigation: {
      screen: NavigationScreen,
    }
  },
  {
    defaultNavigationOptions,
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainStack,
    },
    // CargoList: {
    //   screen: createStackNavigator(
    //     {Root: CargoDetailStack},
    //     {defaultNavigationOptions},
    //   ),
    // },
    // OrderList: {
    //   screen: createStackNavigator(
    //     {Root: OrderDetailStack},
    //     {defaultNavigationOptions},
    //   ),
    // },
    // CargoSmart: {
    //   screen: createStackNavigator(
    //     {Root: CargoSmartScreen},
    //     {defaultNavigationOptions},
    //   ),
    // },
    // Token: {
    //   screen: TokenScreen,
    // },
    // CargoStart: {
    //   screen: StartScreen,
    // },
  },
  {
    contentComponent: DrawerContent,
  },
);

const RootStack = createSwitchNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Main: {
      screen: AppDrawerNavigator,
    },
    Join: {
      screen: RegisterScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return <AppContainer />;
};

export default App;
