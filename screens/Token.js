import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {ThemeColors} from 'react-navigation';

export default class Toekn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.top_image}>
            <Image
              style={{width: 80, height: 150}}
              resizeMode="stretch"
              source={require('../public/images/profile.png')}
            />
          </View>
        </View>
        <Text style={styles.greet_font}>
          {this.state.data.params.name} 기사님, 수고하셨습니다.
        </Text>

        <View style={styles.bottom}>
          <View style={styles.bottom_button}>
            <View style={styles.button}>
              <Text style={styles.button_font}>환전하기</Text>
            </View>
          </View>
          <View style={styles.bottom_title}>
            <Text style={styles.title_font}>
              차주님이 등록한 계좌에 지급됩니다.
            </Text>
            <Text style={styles.title_font}>
              1TRC = 1원 입니다. 최소 10,000TRC부터 환전됩니다.
            </Text>
          </View>
        </View>
        <Text style={styles.token_font}>{this.state.data.params.token}</Text>
        <Text style={styles.tokenchg_font}>환전 가능합니다.</Text>
        <TextInput
          style={styles.data_input}
          placeholderTextColor="white"
          placeholder="환전할 토큰 갯수"
        />
      </View>
    );
  }

  constructor(props) {
    super(props);
    let data = this.props.navigation.state;
    this.state = {data};
    console.log('token props', this.state);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 8,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    backgroundColor: '#5ab9cd',
    transform: [{scaleX: 3}],
    paddingTop: 200,
    marginHorizontal: 60,
  },
  top_image: {
    bottom: 200,
    marginVertical: 30,
    marginHorizontal: 100,
    flex: 1,
    alignItems: 'center',
  },
  top_text: {
    flex: 1,
  },
  greet_font: {
    bottom: 230,
    zIndex: 3,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  token_font: {
    bottom: 260,
    paddingTop: 20,
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'blue',
  },
  tokenchg_font: {
    bottom: 260,
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'white',
  },
  data_input: {
    bottom: 240,
    left: 60,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    width: 250,
    textAlign: 'center',
    color: 'white',
  },
  top_token: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  bottom_button: {
    flex: 1,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#5ab9cd',
    marginHorizontal: 30,
  },
  button_font: {
    paddingVertical: 8,
    textAlign: 'center',
    color: 'white',
  },
  bottom_title: {
    flex: 1,
  },
  title_font: {
    top: 80,
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#888888',
  },
});
