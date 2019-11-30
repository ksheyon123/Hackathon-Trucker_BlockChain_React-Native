import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View>
            <Text style={styles.invalidName}>기사님 오늘도 힘내세요!</Text>
            <Text style={styles.invalidName}>
              <Text style={{fontSize: 20}}>트러커</Text>가 응원합니다.
            </Text>
          </View>
          <Image
            style={{left: 78}}
            source={require('../public/images/truck.jpg')}
          />
        </View>
        <View style={styles.containerBottom}>
          <Image
            style={styles.logo}
            source={require('../public/images/logo.png')}
          />
          <View>
            <View style={styles.inputContainer}>
              <Image source={require('../public/images/icPhone.png')} />
              <TextInput
                style={{color: '#ffffff'}}
                onChangeText={phonenumber => this.setState({phonenumber})}
                value={this.state.phonenumber}
                placeholderTextColor="#ffffff"
                placeholder="phonenumber"
              />
            </View>
            <View style={styles.inputContainer}>
              <Image source={require('../public/images/icLock.png')} />
              <TextInput
                secureTextEntry={true}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                style={{color: '#ffffff'}}
                placeholderTextColor="#ffffff"
                placeholder="password"
              />
            </View>
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={this.login}
              style={styles.buttonContainerLogin}>
              <Text style={styles.buttonTextLogin}>핸들 잡기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Join')}
              style={styles.buttonContainerRegister}>
              <Text style={styles.buttonTextRegister}>차주 등록</Text>
            </TouchableOpacity>
          </View>
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
        console.log('ok');
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
  container: {
    flex: 1,
  },
  containerTop: {
    paddingTop: 60,
    flex: 0.356,
    justifyContent: 'space-between',
  },
  containerBottom: {
    alignItems: 'center',
    paddingTop: 28,
    backgroundColor: '#5ab9cd',
    flex: 0.644,
  },
  invalidName: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#808080',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    width: 250,
  },
  content: {
    alignItems: 'center',
  },
  buttonContainerLogin: {
    marginTop: 40,
    width: 180,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#5ab9cd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerRegister: {
    marginTop: 40,
    width: 136,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextLogin: {
    // width: 26,
    height: 19,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5ab9cd',
    // alignSelf: 'center',
  },
  buttonTextRegister: {
    // width: 26,
    height: 19,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
    // alignSelf: 'center',
  },
});
