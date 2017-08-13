/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HyperlinkedText from 'react-native-hyperlinked-text';

export default class HyperlinkedTextExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HyperlinkedText>Browse to https://www.kimaia.com</HyperlinkedText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HyperlinkedTextExample', () => HyperlinkedTextExample);
