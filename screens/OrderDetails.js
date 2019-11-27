import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {ThemeColors} from 'react-navigation';

export default class CargoDetails extends React.Component {
  render() {
    return (
      <View>
        <Text>출발지{this.state.startpoint}</Text>
        <Text>도착지{this.state.endpoint}</Text>
        <Text>차량 톤수{this.state.carweight}</Text>
        <Text>적재 중량{this.state.weight}</Text>
        <Text>운송 방법{this.state.transport}</Text>
        <Text>운송 비용{this.state.cost}</Text>
        <TouchableOpacity
          onPress={this.selectCargo}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>인수증 서명</Text>
        </TouchableOpacity>
      </View>
    );
  }
  constructor(props) {
    super(props);
    var data = props.navigation.state.params.item;
    this.state = {
      id: data.id,
      startpoint: data.startpoint,
      endpoint: data.endpoint,
      carweight: data.carweight,
      weight: data.weight,
      transport: data.transport,
      cost: data.cost,
    };
  }

  selectCargo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/list', {
        method: 'POST',
        headers: {
          Accpet: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(this.state),
      });
      const json = await response.json();
      if (response.ok) {
        // AsyncStorage.setItem(json.userID, JSON.stringify(session));
        // AsyncStorage.getItem(json.userID, (err, result) => {
        // });
        this.props.navigation.replace('Main');
      } else {
        alert('Plz Check Your ID & PW');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({});
