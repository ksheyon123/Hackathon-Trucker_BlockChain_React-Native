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

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.containerTop}>
        <View style={styles.content}>
          <Text style={styles.logo}> - NATIVE - </Text>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.input}
              onChangeText={phonenumber => this.setState({phonenumber})}
              value={this.state.phonenumber}
              placeholder="phonenumber"
            />
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              style={styles.input}
              placeholder="password"
            />
          </View>
          <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.replace('Join')}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {phonenumber: '', password: ''};
  }

  login = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          Accpet: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          phonenumber: this.state.phonenumber,
          password: this.state.password,
          ca: 'app',
        }),
      });
      const json = await response.json();
      // let session = {
      //   username: 'KSH',
      //   userWallet: json.userWallet
      // }
      if (response.ok) {
        // AsyncStorage.setItem(json.userID, JSON.stringify(session));
        // AsyncStorage.getItem(json.userID, (err, result) => {
        // });
        this.props.navigation.navigate('Main');
      } else {
        alert('Plz Check Your ID & PW');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  containerTop: {
    borderWidth: 0.5,
    flex: 0.356,
  },
  containerBottom: {
    borderWidth: 0.5,
    flex: 0.644,
  },
  invalidName: {
    width: 142,
    height: 43,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#808080',
  },
});
