import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

export default class Main extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.state.fullAddr}</Text>
        <Text>{this.state.userNM}기사님, 환영합니다</Text>
        <Text>월렛 주소 : {this.state.userWallet}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CargoList')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>화물 조회</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CargoSmart')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>스마트 배차</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Token')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>트러커 환전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('OrderList')}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>배차 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.reverseGeo}>
          <Text>위치정보조회</Text>
        </TouchableOpacity>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._getSession();
    this.reverseGeo();
  }

  _getSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        let session = {
          userNM: json.userNM,
          userCN: json.userCN,
          userCW: json.userCW,
          userWallet: json.userWallet,
        };
        console.log(session.userNM);
        this.setState({userNM: session.userNM, userWallet: session.userWallet});
      }
    } catch (err) {
      console.log('Err');
      console.log(err);
    }
  };

  reverseGeo = async () => {
    try {
      console.log('hi');
      let response = await fetch(
        'https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=37.566235882729345&lon=126.98759692065485&coordType=WGS84GEO&&appKey=88bebbd6-8f99-4144-a656-46abd418bba8',
        {
          method: 'get',
        },
      );
      let json = await response.json();
      console.log(json);
      if (response.ok) {
        this.setState({fullAddr: json.addressInfo.fullAddress});
        // let prtcl = json;

        // // 3. json에서 주소 파싱
        // let arrResult = prtcl.addressInfo;

        // //법정동 마지막 문자
        // let lastLegal = arrResult.legalDong.charAt(
        //   arrResult.legalDong.length - 1,
        // );

        // // 새주소
        // let newRoadAddr = arrResult.city_do + ' ' + arrResult.gu_gun + ' ';

        // if (
        //   arrResult.eup_myun == '' &&
        //   (lastLegal == '읍' || lastLegal == '면')
        // ) {
        //   //읍면
        //   newRoadAddr += arrResult.legalDong;
        // } else {
        //   newRoadAddr += arrResult.eup_myun;
        // }
        // newRoadAddr += ' ' + arrResult.roadName + ' ' + arrResult.buildingIndex;

        // // 새주소 법정동& 건물명 체크
        // if (
        //   arrResult.legalDong != '' &&
        //   (lastLegal != '읍' && lastLegal != '면')
        // ) {
        //   //법정동과 읍면이 같은 경우

        //   if (arrResult.buildingName != '') {
        //     //빌딩명 존재하는 경우
        //     newRoadAddr +=
        //       ' (' + arrResult.legalDong + ', ' + arrResult.buildingName + ') ';
        //   } else {
        //     newRoadAddr += ' (' + arrResult.legalDong + ')';
        //   }
        // } else if (arrResult.buildingName != '') {
        //   //빌딩명만 존재하는 경우
        //   newRoadAddr += ' (' + arrResult.buildingName + ') ';
        // }

        // // 구주소
        // let jibunAddr =
        //   arrResult.city_do +
        //   ' ' +
        //   arrResult.gu_gun +
        //   ' ' +
        //   arrResult.legalDong +
        //   ' ' +
        //   arrResult.ri +
        //   ' ' +
        //   arrResult.bunji;
        // //구주소 빌딩명 존재
        // if (arrResult.buildingName != '') {
        //   //빌딩명만 존재하는 경우
        //   jibunAddr += ' ' + arrResult.buildingName;
        // }

        // let result = '새주소 : ' + newRoadAddr + '</br>';
        // result += '지번주소 : ' + jibunAddr + '</br>';
        // // result += '위경도좌표 : ' + lat + ', ' + lon;

        // // var resultDiv = document.getElementById('result'); //결과를 출력할 태그를 찾습니다.
        // // resultDiv.innerHTML = result; //결과를 html에 출력합니다.
        // this.setState({currentPosition: json.addressInfo.fullAddress});
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({});
