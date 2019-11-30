import React, {Component} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

export default class Header extends Component {
  render() {
    return (
      <Header
        centerComponent={this.state.fullAddr}
        rightComponent={{icon: 'home', style: {color: '#fff'}}}
      />
    );
  }

  requestLocationPermission = async () => {
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
  };

  componentDidMount() {
    const granted = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          });
          this.props.navigation.setParams({geodata: position.coords});
          console.log(this.props.navigation.getParam('geodata'));
          this.reverseGeo(this.state.lon, this.state.lat);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    this.requestLocationPermission();
  }

  reverseGeo = async (lon, lat) => {
    const navigation = this.props.navigation;
    try {
      let response = await fetch(
        `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${lat}&lon=${lon}&coordType=WGS84GEO&&appKey=8cea5446-06f8-4412-bd63-a42e99290fad`,
        {
          method: 'get',
        },
      );
      let json = await response.json();
      if (response.ok) {
        this.setState({fullAddr: json.addressInfo.fullAddress});
        navigation.setParams({
          gpsdata: json.addressInfo.fullAddress,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
