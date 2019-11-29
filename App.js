import React from 'react';
import {Text, Image, View} from 'react-native';
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
import DrawerContent from './screens/DrawerContent';
import ArrivalScreen from './screens/Arrival';
import {TouchableOpacity} from 'react-native-gesture-handler';

const defaultNavigationOptions = ({navigation}) => {
  console.log('defaultNavigationOptinos', navigation.state.routeName);
  return {
    headerTitle: (
      <View style={{alignContent: 'center'}}>
        <Text>
          <Image source={require('./public/images/icMap.png')} />
          <Text style={{color: '#ffffff'}}>
            {navigation.getParam('gpsdata')}
          </Text>
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
    headerRight: <Image source={require('./public/images/icMenu.png')} />,
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
    },
    Arrival: {
      screen: ArrivalScreen,
    },
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
