import React from 'react';
import { AppRegistry, ComponentProvider, NativeModules } from 'react-native';
import Toast from './components/Toast';
import Alert from './components/Alert';
import ActionSheet from './components/ActionSheet';
import {
  PopupType,
  ToastType,
  ToastOptionsProps,
  AlertOptionsProps,
  ActionSheetOptionsProps,
} from './types.d';

const alertModuleName = 'alert';
const toastModuleName = 'toast';
const bottomSheetModuleName = 'bottom_sheet';

const RNPopup = NativeModules.Popup;
// dismiss all popup
RNPopup.hideAllPopup();

const Popup = {
  // toast
  showToastWithType(title: string, type: ToastType, delay?: number) {
    const toast = () => {
      return <Toast title={title} type={type} />;
    };
    Popup.showToast(() => toast, delay ?? 1.2);
  },
  loading(options: ToastOptionsProps) {
    this.showToastWithType(
      options.title,
      ToastType.loading,
      options.delay ?? 20
    );
  },
  success(options: ToastOptionsProps) {
    this.showToastWithType(options.title, ToastType.success, options.delay);
  },
  error(options: ToastOptionsProps) {
    this.showToastWithType(options.title, ToastType.error, options.delay);
  },
  info(options: ToastOptionsProps) {
    this.showToastWithType(options.title, ToastType.info, options.delay);
  },
  warning(options: ToastOptionsProps) {
    this.showToastWithType(options.title, ToastType.warning, options.delay);
  },
  // alert
  alert(options: AlertOptionsProps) {
    const alert = () => {
      return (
        <Alert
          {...options}
          cancel={() => {
            this.hideAlert();
          }}
          submit={() => {
            this.hideAlert().then(() => {
              if (options.submit) {
                options.submit();
              }
            });
          }}
        />
      );
    };
    Popup.showAlert(() => alert);
  },
  // actionSheet
  actionSheet(options: ActionSheetOptionsProps) {
    const actionSheet = () => {
      return (
        <ActionSheet
          {...options}
          cancel={() => {
            this.hideBottomSheet();
          }}
          choose={(index) => {
            this.hideBottomSheet().then(() => {
              if (options.choose) {
                options.choose(index);
              }
            });
          }}
        />
      );
    };
    Popup.showBottomSheet(() => actionSheet);
  },
  // native
  showAlert(component: ComponentProvider) {
    AppRegistry.registerComponent(alertModuleName, component);
    RNPopup.showAlert(alertModuleName);
  },
  hideAlert(): Promise<void> {
    return new Promise((resolve) => {
      RNPopup.hideAlert().then(() => {
        resolve();
      });
    });
  },
  showBottomSheet(component: ComponentProvider) {
    AppRegistry.registerComponent(bottomSheetModuleName, component);
    RNPopup.showBottomSheet(bottomSheetModuleName);
  },
  hideBottomSheet(): Promise<void> {
    return new Promise((resolve) => {
      RNPopup.hideBottomSheet().then(() => {
        resolve();
      });
    });
  },
  showToast(component: ComponentProvider, delay: number) {
    AppRegistry.registerComponent(toastModuleName, component);
    RNPopup.showToast(toastModuleName, delay);
  },
  hideToast() {
    RNPopup.hideToast();
  },
};

export default Popup as PopupType;
