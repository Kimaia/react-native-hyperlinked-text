# HyperlinkedText
Text component for React Native with regex defined hyperlinks.

<img src="https://user-images.githubusercontent.com/1841312/29251023-1fba71b8-8056-11e7-8bbc-1171efcab7bd.png" width="377">

Heavily inspired from [react-native-hyperlink](https://github.com/obipawan/react-native-hyperlink/blob/master/README.md).

The difference is that with react-native-hyperlink you use linkify which I couldn't configure to detect arbitrary regex without prefix (e.g. '1:00'). If you only need to detect regexs with prefixes (e.g. mentions with '@' or links with 'schema://') then use hyperlink. react-native-hyperlink also supports nesting `<Text>` components.
**Important** - put only strings inside a `<HyperlinkedText>` component. There is no way to nest components right now.
# Installation
`npm install --save react-native-hyperlinked-text` or
`yarn add react-native-hyperlinked-text`
# Usage Examples
The default behavior is to identify URLs and open web browser when they are clicked:
```JSX
<HyperlinkedText>You get regular URLs handling by default - https://www.kimaia.com</HyperlinkedText>
```

Configure the default link style and on press behavior:
```JSX
<HyperlinkedText
  linkStyle={{color: 'red'}}
  onLinkPress=text=>window.alert(`Pressed ${text}`)
>You get regular URLs handling by default - https://www.kimaia.com</HyperlinkedText>
```

Pass in `linkDefs` array to configure custom regex and behavior:
```JSX
<HyperlinkedText
  style={styles.entry}
  linkDefs={[
    {
      regex: /\[(.*?)\]\((.*?)\)/mgi,
      style: {color: 'red'},
      replaceText: (orig, text, url) => text,
      onPress: (orig, text, url) => HyperlinkedText._openWebUrl(url)
    }
  ]}>
  Use markdown style links [Kimaia](https://www.kimaia.com)
</HyperlinkedText>
```
## Props

| Prop | Description | Example | Default |
| --- | --- | --- | --- |
| `style` | The style of the entire component | `style={{backgroundColor:'blue'}}` | None |
| `linkStyle` | Default style for links. Can be overriden in `linkDef.style` | `linkStyle={{color: 'purple'}}` | `{{color:'#0000EE'}}` |
| `onLinkPress` | Default handler for link presses | `onLinkPress={text=>window.alert(text)}` | Open browser |
| `linkDefs` | Array of `linkDef` definitions. See below. | `linkDefs=[{regex:/\d+/mgi}]` | `[]` |

### LinkDef
Each link definition is an object with the following properties:

```JS
{
  regex: /regex/mgi, /* The regex to match. You can capturing groups and you probably want to add the 'm' and 'g' flags to search in entire text. If you use capturing groups they will be passed to your handlers*/
  onPress: (wholeMatch, ...capturingGroups) => {}, /* optional - handler for presses. Receives the whole match and the capturing groups. If you don't specify a handler, the default handler will be used */
  noPress: false, /* optional - set to false to disable presses. Default is false */
  style: {}, /* optional - style for link. If undefined then default link style will be used */
  replaceText: (wholeMatch, ...capturingGroups) => newText /* optional - the match will be replaced with whatever you return here */  
}
```

<sup>&copy; 2017 [Kimaia LTD](https://www.kimaia.com)</sup>
