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
        <View style={styles.top_container}>
          <View style={styles.top_info}>
            <Text style={styles.info_1_font}>
              {this.state.userNM}님,안녕하세요
            </Text>
            <Text style={styles.info_2_font}>{this.state.userBalance}TRC</Text>
            <Text style={styles.info_3_font}>보유하고 계십니다</Text>
          </View>
          <View style={styles.top_image}>
            <Text>이미지 있니?</Text>
          </View>
        </View>

        <View style={styles.bottom_container}>
          <View style={styles.bottom_top}>
            {this.displayJsx()}

            <View style={styles.smart}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CargoSmart', {
                    gpsdata: navigation.getParam('gpsdata'),
                  })
                }
                style={styles.buttonContainer}>
                <Image source={require('../public/images/button2.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottom_bottom}>
            <View style={styles.token}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Token')}
                style={styles.buttonContainer}>
                <Image source={require('../public/images/button3.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.history}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderList', {
                    gpsdata: navigation.getParam('gpsdata'),
                  })
                }
                style={styles.buttonContainer}>
                <Image source={require('../public/images/button4.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  displayJsx() {
    const navigation = this.props.navigation;
    if (this.state.readydata) {
      return (
        <View style={styles.itemlist}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CargoStart', {
                gpsdata: navigation.getParam('gpsdata'),
              })
            }
            style={styles.buttonContainer}>
            <Image source={require('../public/images/start.jpg')} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.smart}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CargoList', {
                gpsdata: navigation.getParam('gpsdata'),
              })
            }
            style={styles.buttonContainer}>
            <Image source={require('../public/images/button1.png')} />
          </TouchableOpacity>
        </View>
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
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          });
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
          detailtitle: '상세 정보',
          ordertitle: '배송 내역',
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
  container: {
    flex: 1,
  },
  top_container: {
    flex: 1,
    flexDirection: 'row',
  },
  top_info: {
    flex: 2,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  info_1_font: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  info_2_font: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5ab9cd',
  },
  info_3_font: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  top_image: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  bottom_container: {
    flex: 4,
    paddingVertical: 30,
  },
  bottom_top: {
    flex: 1,
    flexDirection: 'row',
  },
  itemlist: {
    flex: 1,
    alignItems: 'center',
  },
  smart: {
    flex: 1,
    alignItems: 'center',
  },
  bottom_bottom: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 50,
  },
  token: {
    flex: 1,
    alignItems: 'center',
  },
  history: {
    flex: 1,
    alignItems: 'center',
  },
});
