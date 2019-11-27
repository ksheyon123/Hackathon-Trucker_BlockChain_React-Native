import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SignaturePad from 'react-native-signature-pad';
import Dialog from 'react-native-dialog';

export default class Toekn extends React.Component {
  state = {
    dialogVisible: false,
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({dialogVisible: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text>{this.state.startpoint}</Text>
          <Text>{this.state.endpoint}</Text>
          <Text>{this.state.carweight}</Text>
          <Text>{this.state.weight}</Text>
          <Text>{this.state.transport}</Text>
          <Text>{this.state.cost}</Text>
        </View>
        <View style={styles.containerBottom}>{this.contentJsx()}</View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Navigation')}>
            <Text>운행 시작</Text>
          </TouchableOpacity>
        </View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>서명</Dialog.Title>
          <SignaturePad
            onError={this._signaturePadError}
            onChange={this._signaturePadChange}
            style={{flex: 1, backgroundColor: 'white'}}
          />
          <Dialog.Button label="확인" onPress={this.handleCancel} />
          <Dialog.Button label="취소" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
  contentJsx() {
    let distanceA = 2;
    let distanceB = 8;
    if (distanceA < 3) {
      return (
        <TouchableOpacity onPress={this.showDialog}>
          <Text>상차지 서명</Text>
        </TouchableOpacity>
      );
    } else if (distanceB < 3) {
      return (
        <TouchableOpacity onPress={this.showDialog}>
          <Text>하차지 서명</Text>
        </TouchableOpacity>
      );
    }
  }
  _signaturePadError = error => {
    console.error(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    console.log('Got new signature: ' + base64DataUrl);
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._getReadyCargo();
  }

  _getReadyCargo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/readycargo', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        this.setState({
          id: json.id,
          startpoint: json.startpoint,
          endpoint: json.endpoint,
          carweight: json.carweight,
          weight: json.weight,
          transport: json.transport,
          cost: json.cost,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  start = async () => {
    try {
      let response = await fetch('http://localhost:3000/api/blockchaindata', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          startpoint: this.state.startpoint,
          endpoint: this.state.endpoint,
          carweight: this.state.carweight,
          weight: this.state.weight,
          transport: this.state.transport,
          cost: this.state.cost,
        }),
      });
    } catch (err) {}
  };
}

const styles = StyleSheet.create({});
