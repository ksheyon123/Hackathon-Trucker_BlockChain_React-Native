import React, {Component} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Location Permission',
        message:
          'Cool Photo App needs access to your Location ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class GPS extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    requestLocationPermission();
    const granted = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        position => {},
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }
  render() {
    const {isLoaded} = this.state;
  }
}
