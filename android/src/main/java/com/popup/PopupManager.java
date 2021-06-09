package com.popup;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Color;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.blankj.utilcode.util.ScreenUtils;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.lxj.xpopup.XPopup;
import com.lxj.xpopup.animator.EmptyAnimator;
import com.lxj.xpopup.core.BottomPopupView;
import com.lxj.xpopup.core.CenterPopupView;

interface DismissCallBack {
  void doSomeThingDismiss();
}

public class PopupManager {
  private static PopupManager instance;
  private AlertPopup alert;
  private BottomSheetPopup bottomSheet;
  private AlertPopup toast;

  private PopupManager() {
  }

  public static synchronized PopupManager getInstance() {
    if (instance == null) {
      instance = new PopupManager();
    }
    return instance;
  }

  public void showAlert(Activity activity, String moduleName) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (null != alert) alert.dismiss();
        alert = new AlertPopup(activity, moduleName);
        new XPopup.Builder(activity)
          .navigationBarColor(Color.WHITE)
          .dismissOnTouchOutside(false)
          .isRequestFocus(true)
          .dismissOnBackPressed(true)
          .asCustom(alert)
          .show();
      }
    });
  }

  public void hideAlert(Activity activity, DismissCallBack dismissCallBack) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (alert != null) {
          alert.dismissWith(new Runnable() {
            @Override
            public void run() {
              if (null != dismissCallBack) dismissCallBack.doSomeThingDismiss();
            }
          });
        }
      }
    });
  }

  public void showBottomSheet(Activity activity, String moduleName) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (null != bottomSheet) bottomSheet.dismiss();
        bottomSheet = new BottomSheetPopup(activity, moduleName);
        new XPopup.Builder(activity)
          .navigationBarColor(Color.WHITE)
          .isRequestFocus(true)
          .dismissOnBackPressed(true)
          .asCustom(bottomSheet)
          .show();
      }
    });
  }

  public void hideBottomSheet(Activity activity, DismissCallBack dismissCallBack) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (bottomSheet != null) {
          bottomSheet.dismissWith(new Runnable() {
            @Override
            public void run() {
              if (null != dismissCallBack) dismissCallBack.doSomeThingDismiss();
            }
          });
        }
      }
    });
  }

  public void showToast(Activity activity, String moduleName, int delay) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (null != toast) toast.dismiss();
        toast = new AlertPopup(activity, moduleName);
        new XPopup.Builder(activity)
          .hasShadowBg(false)
          .navigationBarColor(Color.WHITE)
          .dismissOnTouchOutside(false)
          .customAnimator(new EmptyAnimator(null, 0))
          .isRequestFocus(false)
          .asCustom(toast)
          .show()
          .delayDismiss(delay * 1000);
      }
    });
  }

  public void hideToast(Activity activity) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (toast != null) {
          toast.smartDismiss();
        }
      }
    });
  }

  public void hideAllPopup(Activity activity) {
    hideToast(activity);
    hideAlert(activity, null);
    hideBottomSheet(activity, null);
  }

  public void unmountReactApplication() {
    if (null != alert) {
      alert.unmountReactApplication();
    }
    if (null != bottomSheet) {
      bottomSheet.unmountReactApplication();
    }
    if (null != toast) {
      toast.unmountReactApplication();
    }
  }
}

@SuppressLint("ViewConstructor")
class AlertPopup extends CenterPopupView {
  private final String moduleName;
  private final Activity activity;
  public ReactRootView rootView;

  public AlertPopup(@NonNull Context context, @Nullable String moduleName) {
    super(context);
    this.activity = (Activity) context;
    this.moduleName = moduleName;
  }

  public void unmountReactApplication() {
    rootView.unmountReactApplication();
  }

  @Override
  protected int getImplLayoutId() {
    return R.layout.react_root_layout;
  }

  @Override
  protected void onCreate() {
    super.onCreate();
    rootView = findViewById(R.id.rtView);
    ReactInstanceManager reactInstanceManager = ((ReactApplication) activity.getApplication()).getReactNativeHost().getReactInstanceManager();
    rootView.startReactApplication(reactInstanceManager, moduleName);
  }

  @Override
  public void dismiss() {
    unmountReactApplication();
    super.dismiss();
  }

  @Override
  protected int getPopupHeight() {
    return ScreenUtils.getAppScreenHeight();
  }

  @Override
  protected int getPopupWidth() {
    return ScreenUtils.getAppScreenWidth();
  }

  @Override
  protected int getMaxWidth() {
    return ScreenUtils.getAppScreenWidth();
  }
}

@SuppressLint("ViewConstructor")
class BottomSheetPopup extends BottomPopupView {

  private final String moduleName;
  private final Activity activity;
  public ReactRootView rootView;

  public BottomSheetPopup(@NonNull Context context, @Nullable String moduleName) {
    super(context);
    this.activity = (Activity) context;
    this.moduleName = moduleName;
  }

  public void unmountReactApplication() {
    rootView.unmountReactApplication();
  }

  @Override
  protected int getImplLayoutId() {
    return R.layout.react_root_layout;
  }

  @Override
  protected void onCreate() {
    super.onCreate();
    rootView = findViewById(R.id.rtView);
    ReactInstanceManager reactInstanceManager = ((ReactApplication) activity.getApplication()).getReactNativeHost().getReactInstanceManager();
    rootView.startReactApplication(reactInstanceManager, moduleName);
  }

  @Override
  public void dismiss() {
    unmountReactApplication();
    super.dismiss();
  }

  @Override
  protected int getPopupHeight() {
    return ScreenUtils.getAppScreenHeight();
  }

  @Override
  protected int getPopupWidth() {
    return ScreenUtils.getAppScreenWidth();
  }
}


