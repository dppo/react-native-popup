import { NativeModules } from 'react-native';

type PopupType = {
  showAlert(moduleName: string): void;
  hideAlert(): Promise<void>;
  showBottomSheet(moduleName: string): void;
  hideBottomSheet(): Promise<void>;
  showToast(moduleName: string, delay: number): void;
  hideToast(): Promise<void>;
  hideAllPopup(): void;
};

const { Popup } = NativeModules;

Popup.hideAllPopup();

export default Popup as PopupType;
