import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
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
        <View style={styles.container_top}>
          <View style={styles.top_position}>
            <View style={styles.position_title}>
              <Text style={styles.title_font}> 화물 정보를 확인하세요!</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.position_gps}>
              <View style={styles.gps_1}>
                <Text style={styles.item_number}>화물번호</Text>
                <Text style={styles.item_time}>등록시간 {this.state.date}</Text>
              </View>
              <View style={styles.gps_2}>
                <Image source={require('../public/images/icPin.png')} />
                <Text style={styles.my_gps_font}>
                  {this.props.navigation.getParam('gpsdata')}
                </Text>
              </View>
              <View style={styles.dot_1} />
              <View style={styles.dot_2} />
              <View style={styles.gps_3}>
                <View style={styles.oval} />
                <Text style={styles.start_gps_font}>
                  {this.state.startpoint}
                </Text>
              </View>
              <View style={styles.dot_3} />
              <View style={styles.dot_4} />
              <View style={styles.gps_4}>
                <View style={styles.circle}>
                  <View style={styles.oval_2} />
                  <View style={styles.dot_big} />
                </View>
                <Text style={styles.end_gps}>{this.state.endpoint}</Text>
              </View>
              <View style={styles.line_2} />
            </View>
          </View>
          <View style={styles.top_data}>
            <View style={styles.top_data_list}>
              <View style={styles.list_top}>
                <View style={styles.list_top_t}>
                  <Text style={styles.list_top_font}>톤수</Text>
                </View>
                <View style={styles.list_top_type}>
                  <Text style={styles.list_top_font}>차종</Text>
                </View>
                <View style={styles.list_top_kg}>
                  <Text style={styles.list_top_font}>적재중량</Text>
                </View>
                <View style={styles.list_top_way}>
                  <Text style={styles.list_top_font}>운행방법</Text>
                </View>
              </View>
              <View style={styles.list_bottom}>
                <View style={styles.list_bottom_t}>
                  <Text style={styles.list_bottom_font}>
                    {this.state.carweight}
                  </Text>
                </View>
                <View style={styles.list_bottom_t}>
                  <Text style={styles.list_bottom_font}>카고</Text>
                </View>
                <View style={styles.list_bottom_t}>
                  <Text style={styles.list_bottom_font}>
                    {this.state.weight}
                  </Text>
                </View>
                <View style={styles.list_bottom_t}>
                  <Text style={styles.list_bottom_font}>
                    {this.state.transport}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.top_data_price}>
              <View style={styles.data_price_top}>
                <TouchableOpacity onPress={this.showDialog}>
                  <Image
                    style={{left: 5}}
                    source={require('../public/images/signature.png')}
                  />
                  <Text style={{color: '#5ab9cd', fontWeight: '600'}}>
                    운송장 서명
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.data_price_bottom}>
                <View style={styles.price_text}>
                  <Text style={styles.price_text_font}>운송료</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.price_font}>{this.state.cost}</Text>
                </View>
              </View>
            </View>
            <View style={styles.top_data_notice}>
              <View style={styles.line} />
              <Text style={styles.notice_font}>
                적재중량은 화주와 통화하여 꼭 확인하시기 바랍니다.
              </Text>
              <Text style={styles.notice_font_2}>
                상하차지간 거리는 최단거리이므로 실제 도로기와 다를 수 있습니다.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container_bottom}>
          <TouchableOpacity onPress={this.start}>
            <Text style={styles.buttonText}>운행 시작</Text>
          </TouchableOpacity>
        </View>
        <View>
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
      </View>
    );
  }

  _signaturePadError = error => {
    console.error(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    console.log('Got new signature: ' + base64DataUrl);
  };
  constructor(props) {
    super(props);
    let data = props.navigation.state;
    this.state = {
      data: data,
    };
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
      console.log('!!!', json);
      if (response.ok) {
        this.setState({
          id: json.data.id,
          date: json.data.date,
          startpoint: json.data.startpoint,
          endpoint: json.data.endpoint,
          carweight: json.data.carweight,
          weight: json.data.weight,
          transport: json.data.transport,
          distance: json.distance.distance,
          cost: json.data.cost,
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
          distance: this.state.distance,
          cost: this.state.cost,
        }),
      });
      let json = await response.json();
      if (response.ok) {
        this.props.navigation.navigate('Navigation', {
          data: this.state,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container_top: {
    flex: 9,
  },
  top_position: {
    flex: 1,
  },
  position_title: {
    flex: 1,
  },
  title_font: {
    paddingVertical: 20,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
    textAlign: 'center',
  },
  position_gps: {
    flex: 4,
  },
  gps_1: {
    flexDirection: 'row',
    paddingVertical: 5,
    flex: 1,
  },
  item_number: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 5,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  item_time: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 5,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#888888',
  },
  gps_2: {
    paddingLeft: 20,
    flexDirection: 'row',
    flex: 1,
  },
  my_gps_font: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  gps_3: {
    bottom: 7,
    paddingLeft: 25,
    flexDirection: 'row',
    flex: 1,
  },
  start_gps_font: {
    bottom: 1,
    paddingHorizontal: 9,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  gps_4: {
    paddingLeft: 20,
    flexDirection: 'row',
    flex: 1,
  },
  end_gps: {
    bottom: 25,
    paddingHorizontal: 14,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  top_data: {
    flex: 1,
  },
  top_data_list: {
    flex: 3,
  },
  list_top: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 20,
    marginTop: 25,
  },
  list_top_font: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#888888',
  },
  list_top_t: {
    flex: 1,
  },
  list_top_type: {
    flex: 1,
  },
  list_top_kg: {
    flex: 1,
  },
  list_top_way: {
    flex: 1,
  },
  list_bottom: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 20,
  },
  list_bottom_font: {
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#444444',
  },
  list_bottom_t: {
    flex: 1,
  },
  list_bottom_type: {
    flex: 1,
  },
  list_bottom_kg: {
    flex: 1,
  },
  list_bottom_way: {
    flex: 1,
  },
  top_data_price: {
    flex: 5,
    marginHorizontal: 35,
  },
  data_price_top: {
    top: 10,
    flex: 1,
    flexDirection: 'row',
  },
  price_top_font: {
    paddingTop: 10,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  data_price_bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price_text: {
    flex: 1,
  },
  price_text_font: {
    paddingLeft: 5,
    paddingBottom: 15,
    textAlign: 'left',
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  price: {
    flex: 1,
    paddingRight: 5,
  },
  price_font: {
    paddingBottom: 15,
    textAlign: 'right',
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5ab9cd',
  },
  top_data_notice: {
    flex: 2,
  },
  notice_font: {
    paddingTop: 15,
    paddingLeft: 27,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#888888',
  },
  notice_font_2: {
    paddingLeft: 27,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#888888',
  },
  container_bottom: {
    flex: 1,
    backgroundColor: '#5ab9cd',
  },
  buttonText: {
    paddingVertical: 20,
    fontFamily: 'AppleSDGothicNeo',
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  line: {
    marginHorizontal: 20,
    backgroundColor: '#f1f1f1',
    height: 1,
  },
  line_2: {
    backgroundColor: '#f1f1f1',
    height: 10,
  },
  oval: {
    width: 17,
    height: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  oval_2: {
    left: 5,
    bottom: 24,
    width: 17,
    height: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  dot_1: {
    left: 30,
    bottom: 17,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_2: {
    left: 30,
    bottom: 12,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_3: {
    left: 30,
    bottom: 31,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_4: {
    left: 30,
    bottom: 26,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  dot_big: {
    left: 8,
    bottom: 38,
    width: 11,
    height: 11,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
});
