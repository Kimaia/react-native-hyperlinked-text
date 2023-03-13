/**
 * @providesModule react-native-hyperlinked-text
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Linking,
} from 'react-native'
import styles from './Styles/HyperlinkedTextStyle';
import R from 'ramda';

'use strict';

const textPropTypes = Text.propTypes || {}

/**
 * Replaces the string child with a hyperlinked version according to configuration
 */
export default class HyperlinkedText extends Component {
  constructor(props){
    super(props)
    this._getMatches = this._getMatches.bind(this);
  }

  render(){
    return this._linkify(this);
  }

  _linkify(component) {
    const matches = this._gatherMatches(component.props.children);
    const newElements = this._replaceMatches(component, matches);
    return (<Text {...component.props} style={ this.props.style }>{ newElements }</Text>);
  }

  _gatherMatches(text) {
    const matches = this.props.linkDefs.reduce((matches, linkDef)=>R.concat(this._getMatches(linkDef, text), matches), []);
    return R.sort((m1, m2)=>m1.index-m2.index, matches);
  }

  _getMatches(linkDef, text) {
    const regex = linkDef.regex;
    regex.lastIndex = 0; // reset the regex in case it was used before
    let matches = [];
    let regexResult;
    while ((regexResult = regex.exec(text)) !== null) {
      matches.push({
       text: regexResult[0],
       groups: R.drop(1,regexResult),
       index: regexResult.index,
       lastIndex: regex.lastIndex,
       linkDef
      });
    }
    return matches;
  }

  _replaceMatches(component, matches) {  
    const componentProps = {
      ...component.props,
      ref: undefined,
      key: undefined,
    };
    let _lastIndex = 0;
    const elements = [];
    for (let match of matches) {      
      const linkDef = match.linkDef;
      const style = linkDef.style || this.props.linkStyle;
      const onPress = linkDef.noPress? undefined : (linkDef.onPress || this.props.onLinkPress);
      const replaceText = linkDef.replaceText || R.identity;

      let nonLinkedText = component.props.children.substring(_lastIndex, match.index);
      nonLinkedText && elements.push(nonLinkedText);
      _lastIndex = match.lastIndex;
      elements.push(
        <Text
          {...componentProps}
          key={match.index}
          style={[component.props.style, style]}
          onPress={onPress && (()=>onPress(match.text, ...match.groups))}
        >
          {linkDef.replaceText?linkDef.replaceText(match.text, ...match.groups):match.text}
        </Text>
      );
    }
    elements.push(component.props.children.substring(_lastIndex, component.props.children.length))
    return elements;
  }

  static _openWebUrl(url) {
    Linking.canOpenURL(url).then(supported => supported && Linking.openURL(url)).catch(console.log('Failed to open url ' + url));
  }

  static get webUrlLinkDef() {
    return {
      regex: /(https?:\/\/[^\s]+)/mgi,
      onPress: HyperlinkedText._openWebUrl,
      linkStyle: styles.hyperlink
    };
  }
}

HyperlinkedText.propTypes = {
  onLinkPress: PropTypes.func,
  linkDefs: PropTypes.array,
  linkStyle: textPropTypes.style
}

// Defaults for props
HyperlinkedText.defaultProps = {
  onLinkPress: HyperlinkedText._openWebUrl,
  linkDefs: [{ 
    regex: /(https?:\/\/[^\s]+)/mgi
  }],
  linkStyle: styles.hyperlink 
}
