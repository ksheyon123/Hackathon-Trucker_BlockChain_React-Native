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

export default class Toekn extends React.Component {
  render() {
    return (
      <View>
        <Text>Token{this.state.token}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {phonenumber: '', password: ''};
  }

  componentDidMount() {
    this._getBalance();
  }

  _getBalance = async () => {
    try {
      let response = await fetch('http://localhost:3000/api/token', {
        method: 'get',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let json = await response.json();
      console.log('getbalance', json);
      if (response.ok) {
        this.setState({token: json});
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({});
