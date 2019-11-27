import React from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default class Main extends React.Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={styles.invalidName}>
            <Text style={{fontSize: 18}}>
              {this.state.userNM}
              기사님,
            </Text>
            환영합니다
          </Text>
          <Text style={styles.walletStyle}>{this.state.userBalance}</Text>
          <Text>보유하고 계십니다.</Text>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.section1}>{this.displayJsx()}</View>
          <View style={styles.section2}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CargoSmart', {
                  gpsdata: navigation.getParam('gpsdata'),
                })
              }
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                <Image source={require('../public/images/button2.png')} />
              </Text>
              <Text style={{top: 10, left: 50, color: '#444444'}}>
                스마트 배차
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section3}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Token')}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                <Image source={require('../public/images/button3.png')} />
              </Text>
              <Text style={{top: 10, left: 50, color: '#444444'}}>
                트러커 환전
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section4}>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderList')}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                <Image source={require('../public/images/button4.png')} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  displayJsx() {
    const navigation = this.props.navigation;

    if (this.state.readydata) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CargoStart', {
              gpsdata: navigation.getParam('gpsdata'),
            })
          }
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>운행 시작</Text>
        </TouchableOpacity>
      );
    } else if (this.state.readydata == false) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CargoList', {
              gpsdata: navigation.getParam('gpsdata'),
            })
          }
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            <Image source={require('../public/images/button1.png')} />
          </Text>
          <Text style={{top: 10, left: 50, color: '#444444'}}>화물조회</Text>
        </TouchableOpacity>
      );
    }
  }
  constructor(props) {
    super(props);
    this.state = {};
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
    console.log(granted);
    if (granted) {
      console.log('hi1');
      Geolocation.getCurrentPosition(
        position => {
          console.log('hi');
          this.setState({
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          });
          console.log('hi');
          this.reverseGeo(this.state.lon, this.state.lat);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    this._getSession();
    this.existReady();
    this.requestLocationPermission();
  }

  _getSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        let session = {
          userNM: json.userNM,
          userCN: json.userCN,
          userCW: json.userCW,
          userWallet: json.userWallet,
          userBalance: json.userBalance,
        };
        this.setState({
          userNM: session.userNM,
          userWallet: session.userWallet,
          userBalance: session.userBalance,
        });
      }
    } catch (err) {
      console.log('Err');
      console.log(err);
    }
  };

  reverseGeo = async (lon, lat) => {
    const navigation = this.props.navigation;
    try {
      console.log('reversegeo', lon, lat);
      let response = await fetch(
        `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${lat}&lon=${lon}&coordType=WGS84GEO&&appKey=88bebbd6-8f99-4144-a656-46abd418bba8`,
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

  existReady = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/readydata', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const readydata = await response.json();

      if (response.ok) {
        this.setState({readydata: readydata});
      }
    } catch (err) {
      console.log('Err');
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  invalid: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  walletStyle: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 17,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5ab9cd',
  },
  container: {
    flex: 2,
    flexDirection: 'row',
  },
  containerTop: {
    flex: 1,
    left: 24,
    top: 30,
  },
  containerBottom: {
    position: 'absolute',
    flex: 1,
  },
  section1: {
    top: 60,
    left: 30,
  },
  section2: {
    top: -110,
    left: 180,
  },
  section3: {
    left: 30,
    top: -110,
  },
  section4: {
    left: 190,
    top: -280,
  },
});
