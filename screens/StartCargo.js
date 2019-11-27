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

export default class OrderList extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('departure');
          }}>
          <Text>{this.state.startpoint}</Text>
          <Text>{this.state.endpoint}</Text>
          <Text>{this.state.cost}</Text>
          <Text>{this.state.carweight}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.cargoConfirm();
  }

  cargoConfirm = async () => {
    let response = await fetch('http://localhost:3000/api/list', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    var json = await response.json();
    console.log(json);
    if (response.ok) {
      if (!json.finishedCargo) {
        this.setState({
          startpoint: json.readyCargo.startpoint,
          endpoint: json.readyCargo.endpoint,
          cost: json.readyCargo.cost,
          carweight: json.readyCargo.carweight,
        });
      } else {
        this.setState({
          startpoint: json.readyCargo.startpoint,
          endpoint: json.readyCargo.endpoint,
          cost: json.readyCargo.cost,
          carweigth: json.readyCargo.carweight,
        });
      }
    }
  };
}

const styles = StyleSheet.create({});
