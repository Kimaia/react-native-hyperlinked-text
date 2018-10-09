declare module "react-native-hyperlinked-text" {

    import {TextStyle} from "react-native";

    export interface ILinkDef {
        regex: RegExp;
        style?: TextStyle;
        replaceText?: (orig: string, text: string, url: string) => string;
        onPress?: (orig: string, text: string, url: string) => void;
    }

    interface IProps {
        style?: TextStyle;
        linkDefs?: ILinkDef[];

    }

    export default class HyperlinkedText extends React.Component<IProps, any> {
        static _openWebUrl(url: string): void;
    }
}
