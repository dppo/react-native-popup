type PopupType = {
  loading(options: ToastOptionsProps): void;
  success(options: ToastOptionsProps): void;
  error(options: ToastOptionsProps): void;
  info(options: ToastOptionsProps): void;
  warning(options: ToastOptionsProps): void;
  alert(options: AlertOptionsProps): void;
  actionSheet(options: ActionSheetOptionsProps): void;
  showAlert(component: ComponentProvider): void;
  hideAlert(): Promise<void>;
  showBottomSheet(component: ComponentProvider): void;
  hideBottomSheet(): Promise<void>;
  showToast(component: ComponentProvider, delay: number): void;
  hideToast(): void;
};

export enum ToastType {
  loading,
  info,
  warning,
  success,
  error,
}

export interface ToastProps {
  title: string;
  type: ToastType;
}

export interface ToastOptionsProps {
  title: string;
  delay?: number;
}

export interface AlertProps {
  title: string;
  hlTitle?: string;
  cancel?: Function;
  submit?: Function;
  force?: boolean;
  cancelTitle?: string;
  submitTitle?: string;
  submitContainerStyle?: ViewStyle;
  submitTextStyle?: TextStyle;
  cancelContainerStyle?: ViewStyle;
  cancelTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export interface ActionSheetProps {
  items: string[];
  cancelTitle?: string;
  cancel?: Function;
  choose?: (index: number) => void;
}

export interface AlertOptionsProps extends AlertProps {}

export interface ActionSheetOptionsProps extends ActionSheetProps {}
