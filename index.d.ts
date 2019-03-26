declare module "react-native-hyperlinked-text" {

    import {StyleProp, TextStyle} from "react-native";

    export interface ILinkDef {
        regex: RegExp;
        style?: StyleProp<TextStyle>;
        replaceText?: (orig: string, text: string, url: string) => string;
        onPress?: (orig: string, text: string, url: string) => void;
        noPress?: boolean;
    }

    interface IProps {
        style?: StyleProp<TextStyle>;
        linkStyle?: StyleProp<TextStyle>;
        linkDefs?: ILinkDef[];
        onLinkPress?: (text: string) => void;
    }

    export default class HyperlinkedText extends React.Component<IProps, any> {
        static _openWebUrl(url: string): void;
    }
}
