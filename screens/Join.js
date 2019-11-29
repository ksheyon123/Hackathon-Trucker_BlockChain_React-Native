import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

export default class Join extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            style={{left: 35, top: 45}}
            source={require('../public/images/truck.jpg')}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.input_1}>
            <Text style={styles.title}>차주등록</Text>
          </View>
          <View style={styles.input_2}>
            <TextInput
              style={styles.data_input}
              onChangeText={phonenumber => this.setState({phonenumber})}
              value={this.state.phonenumber}
              placeholderTextColor="white"
              placeholder="핸드폰 번호"
            />
            <TextInput
              style={styles.data_input}
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              placeholderTextColor="white"
              placeholder="비밀 번호"
            />
            <TextInput
              style={styles.data_input}
              onChangeText={username => this.setState({username})}
              value={this.state.username}
              placeholderTextColor="white"
              placeholder="이름"
            />
            <TextInput
              style={styles.data_input}
              onChangeText={carnumber => this.setState({carnumber})}
              value={this.state.carnumber}
              placeholderTextColor="white"
              placeholder="차량 번호"
            />
            <TextInput
              style={styles.data_input}
              onChangeText={carweight => this.setState({carweight})}
              value={this.state.carweight}
              placeholderTextColor="white"
              placeholder="톤수"
            />
          </View>
          <View style={styles.input_3}>
            <View style={styles.register}>
              <TouchableOpacity onPress={this.register}>
                <Text style={styles.register_font}>차주 등록</Text>
              </TouchableOpacity>
            </View>
          </View>
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
      console.log('hi');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottom: {
    flex: 4,
    backgroundColor: '#5ab9cd',
  },
  input_container: {
    flex: 1,
  },
  input_1: {
    flex: 1,
  },
  title: {
    paddingVertical: 20,
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'white',
    fontSize: 27,
  },
  input_2: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    flex: 4,
  },
  data_input: {
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    width: 250,
    textAlign: 'center',
    color: 'white',
  },
  input_3: {
    flex: 2,
  },
  register: {
    bottom: 20,
    paddingTop: 15,
    marginHorizontal: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    left: 10,
  },
  register_font: {
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    fontSize: 15,
    color: '#444444',
    bottom: 10,
  },
});
