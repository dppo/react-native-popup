#import "Popup.h"
#import "PopupManager.h"

@implementation Popup

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showAlert:(nonnull NSString *)moduleName)
{
    [[PopupManager shareManager] showAlert:moduleName];
}

RCT_EXPORT_METHOD(hideAlert:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    [[PopupManager shareManager] hideAlert:^{
        resolve(@[]);
    }];
}

RCT_EXPORT_METHOD(showBottomSheet:(nonnull NSString *)moduleName)
{
    [[PopupManager shareManager] showBottomSheet:moduleName];
}

RCT_EXPORT_METHOD(hideBottomSheet:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    [[PopupManager shareManager] hideBottomSheet:^{
        resolve(@[]);
    }];
}

RCT_EXPORT_METHOD(showToast:(nonnull NSString *)moduleName delay:(int)delay)
{
    [[PopupManager shareManager] showToast:moduleName delay:delay];
}

RCT_EXPORT_METHOD(hideToast:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    [[PopupManager shareManager] hideToast:^{
        resolve(@[]);
    }];
}

RCT_EXPORT_METHOD(hideAllPopup)
{
    [[PopupManager shareManager] hideAllPopup];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

@end
