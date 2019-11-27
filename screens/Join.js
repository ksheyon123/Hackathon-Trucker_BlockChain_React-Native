import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class Join extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={username => this.setState({username})}
              value={this.state.username}
              style={styles.input}
              placeholder="username"
            />
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={carnumber => this.setState({carnumber})}
              value={this.state.carnumber}
              style={styles.input}
              placeholder="carnumber"
            />
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={carweight => this.setState({carweight})}
              value={this.state.carweight}
              style={styles.input}
              placeholder="carweight"
            />
          </View>
          <TouchableOpacity
            onPress={this.register}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      phonenumber: '',
      password: '',
      carnumber: '',
      carweight: '',
      username: '',
    };
  }

  register = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ca: 'app',
          phonenumber: this.state.phonenumber,
          password: this.state.password,
          username: this.state.username,
          carnumber: this.state.carnumber,
          carweight: this.state.carweight,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        this.props.navigation.navigate('Main');
      } else {
        alert('Register Information Check Please!');
      }
    } catch (err) {
      console.log('Join', err);
    }
  };
}

const styles = StyleSheet.create({});
