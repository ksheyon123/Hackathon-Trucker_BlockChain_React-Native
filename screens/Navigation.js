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
} from 'react-native';

const TMap = requireNativeComponent('TMap');

const {MoveTmap} = NativeModules;

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.moveTmapfromTrucker = this.moveTmapfromTrucker.bind(this);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TMap
          style={{flex: 1}}
          addMarker={[
            {
              currentLat: 37.57038581761725,
              currentLong: 126.98287623279214,
              currentAddr: 'Current',
              upLat: 37.566235882729345,
              upLong: 126.98759692065485,
              upAddr: 'Up',
              downLong: 37.57099808351901,
              downLat: 127.00193064562838,
              downAddr: 'Down',
            },
          ]}
        />
        <View style={styles.map}>
          <View style={styles.map_image}>
            <View style={styles.gps_1}>
              <View style={styles.gps_1_circle}>
                <Image source={require('../public/images/icPin.png')} />
              </View>
              <View style={styles.gps_1_text}>
                <Text>111</Text>
              </View>
            </View>
            <View style={styles.dot_1} />
            <View style={styles.dot_2} />
            <View style={styles.gps_2}>
              <View style={styles.gps_2_circle}>
                <View style={styles.oval} />
              </View>
              <View style={styles.gps_2_text}>
                <Text>222</Text>
              </View>
            </View>
            <View style={styles.dot_3} />
            <View style={styles.dot_4} />
            <View style={styles.gps_3}>
              <View style={styles.gps_3_circle}>
                <View style={styles.oval_2} />
                <View style={styles.dot_big} />
              </View>
              <View style={styles.gps_3_text}>
                <Text>333</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.bottom_font} onPress={this.moveTmapfromTrucker}>
            T Map으로 이동하기
          </Text>
        </View>
      </View>
    );
  }
  moveTmapfromTrucker() {
    // console.log('moveTmapfromTrucker');
    // MoveTmap.moveTmapfromTrucker('rrr');
    this.props.navigation.navigate('MainInterCargo');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 9,
  },
  map_image: {
    height: 150,
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    zIndex: 3,
    borderRadius: 10,
  },
  gps_1: {
    paddingTop: 20,
    paddingHorizontal: 15,
    zIndex: 4,
    flex: 1,
    flexDirection: 'row',
  },
  gps_1_circle: {
    flex: 1,
  },
  gps_1_text: {
    top: 3,
    right: 20,
    flex: 4,
  },
  gps_2: {
    paddingHorizontal: 15,
    zIndex: 4,
    flex: 1,
    flexDirection: 'row',
  },
  gps_2_circle: {
    flex: 1,
  },
  gps_2_text: {
    flex: 4,
    bottom: 3,
    right: 20,
  },
  gps_3: {
    paddingHorizontal: 15,
    zIndex: 4,
    flex: 1,
    flexDirection: 'row',
  },
  gps_3_circle: {
    flex: 1,
  },
  gps_3_text: {
    bottom: 6,
    right: 20,
    flex: 4,
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
    left: 5,
    width: 17,
    height: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  oval_2: {
    bottom: 4,
    left: 5,
    width: 17,
    height: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  dot_1: {
    bottom: 8,
    left: 25,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_2: {
    bottom: 4,
    left: 25,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_3: {
    bottom: 14,
    left: 25,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_4: {
    bottom: 10,
    left: 25,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_big: {
    bottom: 18,
    left: 8,
    // bottom: 25,
    width: 11,
    height: 11,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
});
