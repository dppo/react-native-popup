package com.popup;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PopupModule extends ReactContextBaseJavaModule {
  public PopupModule(ReactApplicationContext reactContext) {
    super(reactContext);
    PopupManager.getInstance().unmountReactApplication();
  }

  @Override
  @NonNull
  public String getName() {
    return "Popup";
  }

  @ReactMethod
  public void showToast(String moduleName, int delay) {
    PopupManager.getInstance().showToast(getCurrentActivity(), moduleName, delay);
  }

  @ReactMethod
  public void hideToast(Promise promise) {
    PopupManager.getInstance().hideToast(getCurrentActivity());
  }

  @ReactMethod
  public void showAlert(String moduleName) {
    PopupManager.getInstance().showAlert(getCurrentActivity(), moduleName);
  }

  @ReactMethod
  public void hideAlert(Promise promise) {
    PopupManager.getInstance().hideAlert(getCurrentActivity(), new DismissCallBack() {
      @Override
      public void doSomeThingDismiss() {
        if (null != promise) {
          promise.resolve(Arguments.createMap());
        }
      }
    });
  }

  @ReactMethod
  public void showBottomSheet(String moduleName) {
    PopupManager.getInstance().showBottomSheet(getCurrentActivity(), moduleName);
  }

  @ReactMethod
  public void hideBottomSheet(Promise promise) {
    PopupManager.getInstance().hideBottomSheet(getCurrentActivity(), new DismissCallBack() {
      @Override
      public void doSomeThingDismiss() {
        if (null != promise) {
          promise.resolve(Arguments.createMap());
        }
      }
    });
  }

  @ReactMethod
  public void hideAllPopup() {
    PopupManager.getInstance().hideAllPopup(getCurrentActivity());
  }
}
