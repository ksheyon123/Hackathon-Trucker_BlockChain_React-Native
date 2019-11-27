import {DrawerItems} from 'react-navigation-drawer';
import {Button, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      {/* <DrawerItems {...props} /> */}
      <Button title="1" onPress={() => props.navigatoin.navite('CargoSmart')} />
      <Button title="2" onPress={() => props.navigatoin.navite('')} />
      <Button title="3" onPress={() => props.navigatoin.navite('')} />
      <Button title="4" onPress={() => props.navigatoin.navite('')} />
      <Button title="5" onPress={() => props.navigatoin.navite('')} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomDrawerContentComponent;
