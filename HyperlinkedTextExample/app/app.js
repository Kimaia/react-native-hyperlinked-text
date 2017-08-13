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
        <HyperlinkedText
          style={styles.entry}
        >You get regular URLs handling by default - https://www.kimaia.com</HyperlinkedText>
        <HyperlinkedText
          style={styles.entry}
          linkDefs={[
            {
              regex: /\[(.*?)\]\((.*?)\)/mgi,
              style: {color: 'red'},
              replaceText: (orig, text, url) => text,
              onPress: (orig, text, url) => HyperlinkedText._openWebUrl(url)
            }
          ]}
        >Use markdown style links - [Kimaia](https://www.kimaia.com)</HyperlinkedText>
        <HyperlinkedText
          style={styles.entry}
                    linkDefs={[
            {
              regex: /([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/mgi,
              style: {color: 'green'},
              replaceText: email => `[email to: ${email}]`
            },
            {
              regex: /@\[(.*?)\]\((.*?)\)/mgi,
              style: {color: 'purple'},
              replaceText: (orig, name, id) => name,
              onPress: (orig, name, id) => window.alert(`name: ${name}, id: ${id}`)
            },
            {
              regex: /\d+:\d+(?:\d+)?/mgi,
              style: {color: '#0999aa', borderWidth: 1, borderColor: 'red'},
              noPress: true
            }
          ]}
        >Check for email someone@kimaia.com, or app specific stuff like mentions - @[Doron Tohar](1234) or any regex, e.g. 10:00.</HyperlinkedText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  entry: {
    textAlign: 'left',
    color: '#333333',
    margin: 15,
  },
});

AppRegistry.registerComponent('HyperlinkedTextExample', () => HyperlinkedTextExample);
