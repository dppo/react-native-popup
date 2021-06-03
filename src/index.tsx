import { NativeModules } from 'react-native';

type PopupType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Popup } = NativeModules;

export default Popup as PopupType;
