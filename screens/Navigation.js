import React, {Component} from 'react';
import {
  requireNativeComponent,
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  Image,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const TMap = requireNativeComponent('TMap');

const {MoveTmap} = NativeModules;

export default class Toekn extends React.Component {
  constructor(props) {
    super(props);
    let data = this.props.navigation.state;
    this.moveTmapfromTrucker = this.moveTmapfromTrucker.bind(this);
    this.state = {
      gpsdata: data,
    };
    console.log('received data1', this.state.gpsdata.gdata);
    console.log('received data2', this.state.gpsdata);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <TMap
            style={{flex: 1}}
            addMarker={[
              {
                currentLat: this.state.gpsdata.params.gdata.latitude,
                currentLong: this.state.gpsdata.params.gdata.longitude,
                currentAddr: 'Current',
                upLat: parseFloat(this.state.gpsdata.params.gcs.newLat),
                upLong: parseFloat(this.state.gpsdata.params.gcs.newLon),
                upAddr: 'Up',
                downLong: parseFloat(this.state.gpsdata.params.gce.newLon),
                downLat: parseFloat(this.state.gpsdata.params.gce.newLat),
                downAddr: 'Down',
              },
            ]}
          />
        </View>

        <View style={styles.rectangle} />
        <Image
          source={require('../public/images/icPin.png')}
          style={styles.image}
        />
        <Text style={styles.text_1}> {this.state.gpsdata.params.pdata}</Text>
        <View style={styles.dot_1} />
        <View style={styles.dot_2} />
        <View style={styles.oval} />
        <Text style={styles.text_2}>
          {this.state.gpsdata.params.startpoint}
        </Text>
        <View style={styles.dot_3} />
        <View style={styles.dot_4} />
        <View style={styles.oval_2} />
        <View style={styles.dot_big} />
        <Text style={styles.text_3}>{this.state.gpsdata.params.endpoint}</Text>
        <View style={styles.bottom}>
          <Text style={styles.bottom_font} onPress={this.moveTmapfromTrucker}>
            T Map으로 이동하기
          </Text>
        </View>
      </View>
    );
  }
  moveTmapfromTrucker() {
    console.log('moveTmapfromTrucker');
    MoveTmap.moveTmapfromTrucker('rrr');
    this.props.navigation.replace('MainInterCargo');
  }

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 9,
    backgroundColor: 'red',
  },
  rectangle: {
    top: 30,
    left: 30,
    paddingHorizontal: 150,
    paddingVertical: 80,
    borderRadius: 25,
    position: 'absolute',
    backgroundColor: 'white',
  },
  image: {
    position: 'absolute',
    left: 40,
    top: 50,
  },
  bottom: {
    flex: 1,
    backgroundColor: '#5ab9cd',
  },
  bottom_font: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 23,
  },
  oval: {
    top: 103,
    left: 46,
    position: 'absolute',
    width: 17,
    height: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  oval_2: {
    top: 150,
    left: 47,
    position: 'absolute',
    width: 17,
    height: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  dot_1: {
    top: 80,
    left: 51,
    position: 'absolute',
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_2: {
    top: 91,
    left: 51,
    position: 'absolute',
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_3: {
    top: 126,
    left: 52,
    position: 'absolute',
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_4: {
    top: 138,
    left: 52,
    position: 'absolute',
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_big: {
    top: 153,
    left: 50,
    position: 'absolute',
    width: 11,
    height: 11,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  text_1: {
    position: 'absolute',
    top: 53,
    left: 75,
  },
  text_2: {
    position: 'absolute',
    top: 101,
    left: 75,
  },
  text_3: {
    position: 'absolute',
    top: 148,
    left: 75,
  },
});
