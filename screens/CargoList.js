import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

export default class CargoList extends Component {
  render() {
    return (
      <View>
        <View style={styles.searchContainer}>
          <Image
            source={require('../public/images/icSearch.png')}
            style={styles.ImageStyle}
          />
          <TextInput style={styles.searchbox} placeholder="Search" />
        </View>
        <FlatList data={this.state.data} renderItem={this._renderItem} />
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('CargoDetails', {
          item,
          gpsdata: this.props.navigation.getParam('gpsdata'),
        })
      }>
      <View style={styles.card}>
        <View style={styles.card_left}>
          <Text style={styles.card_left_font}>{item.carweight} 카고</Text>
          <Text style={styles.card_left_font}>{item.cost}TRC</Text>
        </View>
        <View style={styles.card_center} />
        <View style={styles.card_right}>
          <View style={styles.card_right_start_container}>
            <View style={styles.oval} />
            <Text style={styles.card_right_start_font}>{item.saddr}</Text>
          </View>
          <View style={styles.card_right_center_1}>
            <View style={styles.dot} />
          </View>
          <View style={styles.card_right_center_2}>
            <View style={styles.dot} />
          </View>
          <View style={styles.card_right_end_container}>
            <Text style={styles.card_right_end_font}>{item.eaddr}</Text>
            <View style={styles.oval_2} />
            <View style={styles.dot_2} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  componentDidMount() {
    this._getCargo();
  }
  _getCargo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cargo', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        for (var i = 0; i < json.length; i++) {
          let substart = json[i].startpoint;
          let subend = json[i].endpoint;
          let sstart = substart.split(' ');
          let send = subend.split(' ');

          let startAddr = sstart[0] + ' ' + sstart[1] + ' ' + sstart[2];
          let endAddr = send[0] + ' ' + send[1] + ' ' + send[2];

          json[i].saddr = startAddr;
          json[i].eaddr = endAddr;
        }
        this.setState({data: json});
      }
    } catch (err) {
      console.log(err);
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ab9cd',
    paddingTop: 50,
  },
  flatList: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    marginTop: 20,
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    top: 18,
    marginHorizontal: 20,
    borderWidth: 2,
    zIndex: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderStyle: 'solid',
    alignItems: 'center',
    elevation: 3, // 그림자
  },
  ImageStyle: {
    marginLeft: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  searchbox: {
    flex: 1,
    height: 36,
    borderRadius: 10, // 둥글게 둥글게
    borderColor: '#f1f1f1',
    paddingLeft: 20,
  },
  card_right: {
    flex: 2,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 40,
  },
  card_center: {
    //  flex :1,
    // paddingTop:10,
    // paddingBottom:10,
    left: 20,
    top: 20,
    paddingLeft: 1,
    height: 55,
    width: 1,
    backgroundColor: '#d1c7c7',
  },
  card_left: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: 20,
    alignItems: 'center',
    fontSize: 17,
  },
  card_left_font: {
    fontSize: 17,
    alignItems: 'center',
    fontFamily: 'AppleSDGothicNeo',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#5ab9cd',
  },
  card_right_start_container: {
    flex: 1,
    paddingTop: 6,
    fontSize: 11,
    fontFamily: 'AppleSDGothicNeo',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#888888',
  },
  card_right_end_container: {
    bottom: 4,
    flex: 1,
    fontSize: 11,
    fontFamily: 'AppleSDGothicNeo',
    //    fontWeight: "500",
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  card_right_center_1: {
    flex: 1,
    bottom: 12,
    left: 2,
  },
  card_right_center_2: {
    flex: 1,
    bottom: 8,
    left: 2,
  },
  card_right_start_font: {
    flex: 1,
    bottom: 15,
    left: 15,
    paddingTop: 6,
    fontSize: 11,
    fontFamily: 'AppleSDGothicNeo',
    //fontWeight: "normal",
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#888888',
  },
  card_right_end_font: {
    flex: 1,
    left: 15,
    fontSize: 11,
    fontFamily: 'AppleSDGothicNeo',
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#444444',
  },
  startContainer: {
    flexDirection: 'row',
    top: 18,
    marginHorizontal: 20,
    borderWidth: 2,
    zIndex: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderStyle: 'solid',
    alignItems: 'center',
  },
  endContainer: {},
  oval: {
    top: 4,
    width: 10,
    height: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
  oval_2: {
    bottom: 12,
    width: 10,
    height: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 20,
  },
  dot_2: {
    bottom: 20,
    left: 2,
    width: 6,
    height: 6,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#888888',
  },
});
