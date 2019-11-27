/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {requireNativeComponent, Text, View, Button, Alert, StyleSheet, TouchableOpacity
, NativeModules } from 'react-native';

const TMap = requireNativeComponent("TMap")

const { MoveTmap } = NativeModules;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.moveTmapfromTrucker = this.moveTmapfromTrucker.bind(this);
  }
  render() {
    return (
      <View style={{flex:1}}> 
        <TMap
          style={{flex: 1}}
          addMarker={[{currentLat:37.57038581761725, currentLong:126.98287623279214, currentAddr:'Current', 
          upLat:37.566235882729345, upLong:126.98759692065485, upAddr:'Up',
          downLong:37.57099808351901, downLat:127.00193064562838, downAddr:'Down'}]}
        />
         <Button title={'티맵연동'} onPress={this.moveTmapfromTrucker} />
      </View>
    );
  }
  moveTmapfromTrucker() {
    console.log('moveTmapfromTrucker')
    MoveTmap.moveTmapfromTrucker('rrr');
  }
}

const styles = StyleSheet.create({container: {flex: 1,backgroundColor: '#F5FCFF',},top: {flex: 1,alignItems: "center",justifyContent: "center",},bottom: {flex: 1,alignItems: "center",justifyContent: "center",},});