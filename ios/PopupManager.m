//
//  PopupManager.m
//  react-native-popup
//
//  Created by 高昇 on 2021/6/4.
//

#import "PopupManager.h"
#import <FFPopup.h>
#import <React/RCTRootView.h>

#define PopWeakObj(o) autoreleasepool{} __weak typeof(o) o##Weak = o;

static PopupManager* _instance = nil;

@interface PopupManager ()

@property(nonatomic,strong)FFPopup *alert;
@property(nonatomic,strong)FFPopup *bottomSheet;
@property(nonatomic,strong)FFPopup *toast;

@end

@implementation PopupManager

+ (instancetype)shareManager
{
    static dispatch_once_t onceToken ;
    dispatch_once(&onceToken, ^{
        _instance = [[self alloc] init] ;
    });
    return _instance ;
}

- (void)showAlert:(nonnull NSString *)moduleName
{
    if (self.alert) {
        [self.alert setDidFinishShowingBlock:nil];
        if (self.alert.isBeingDismissed) {
            @PopWeakObj(self);
            [self.alert setDidFinishDismissingBlock:^{
                [selfWeak.alert.contentView removeFromSuperview];
                selfWeak.alert = nil;
                [selfWeak showAlert:moduleName];
            }];
        }else {
            [self replacePopupContentView:self.alert moduleName:moduleName];
        }
    }else {
        self.alert = [self showPopup:moduleName showType:FFPopupShowType_GrowIn dismissType:FFPopupDismissType_ShrinkOut maskType:FFPopupMaskType_Dimmed delay:0.0];
        @PopWeakObj(self);
        [self.alert setDidFinishDismissingBlock:^{
            [selfWeak.alert.contentView removeFromSuperview];
            selfWeak.alert = nil;
        }];
    }
}

- (void)hideAlert:(dismissBlock)block
{
    if (nil != self.alert) {
        @PopWeakObj(self);
        if (self.alert.isBeingShown) {
            [self.alert setDidFinishShowingBlock:^{
                [selfWeak hideAlert:block];
            }];
        }else {
            [self.alert setDidFinishDismissingBlock:^{
                [selfWeak.alert.contentView removeFromSuperview];
                selfWeak.alert = nil;
                if (block) {
                    block();
                }
            }];
            [self.alert dismissAnimated:YES];
        }
    }else {
        if (block) {
            block();
        }
    }
}

- (void)showBottomSheet:(nonnull NSString *)moduleName
{
    if (self.bottomSheet) {
        [self.bottomSheet setDidFinishShowingBlock:nil];
        if (self.bottomSheet.isBeingDismissed) {
            @PopWeakObj(self);
            [self.bottomSheet setDidFinishDismissingBlock:^{
                [selfWeak.bottomSheet.contentView removeFromSuperview];
                selfWeak.bottomSheet = nil;
                [selfWeak showBottomSheet:moduleName];
            }];
        }else {
            [self replacePopupContentView:self.bottomSheet moduleName:moduleName];
        }
    }else {
        self.bottomSheet = [self showPopup:moduleName showType:FFPopupShowType_SlideInFromBottom dismissType:FFPopupDismissType_SlideOutToBottom maskType:FFPopupMaskType_Dimmed delay:0.0];
        @PopWeakObj(self);
        [self.bottomSheet setDidFinishDismissingBlock:^{
            [selfWeak.bottomSheet.contentView removeFromSuperview];
            selfWeak.bottomSheet = nil;
        }];
    }
}

- (void)hideBottomSheet:(dismissBlock)block
{
    if (nil != self.bottomSheet) {
        @PopWeakObj(self);
        if (self.bottomSheet.isBeingShown) {
            [self.bottomSheet setDidFinishShowingBlock:^{
                [selfWeak hideBottomSheet:block];
            }];
        }else {
            [self.bottomSheet setDidFinishDismissingBlock:^{
                [selfWeak.bottomSheet.contentView removeFromSuperview];
                selfWeak.bottomSheet = nil;
                if (block) {
                    block();
                }
            }];
            [self.bottomSheet dismissAnimated:YES];
        }
    }else {
        if (block) {
            block();
        }
    }
}

- (void)showToast:(nonnull NSString *)moduleName delay:(int)delay
{
    if (self.toast) {
        [self.toast setDidFinishShowingBlock:nil];
        if (self.toast.isBeingDismissed) {
            @PopWeakObj(self);
            [self.toast setDidFinishDismissingBlock:^{
                [selfWeak.toast.contentView removeFromSuperview];
                selfWeak.toast = nil;
                [selfWeak showToast:moduleName delay:delay];
            }];
        }else {
            [self replacePopupContentView:self.toast moduleName:moduleName];
        }
    }else {
        self.toast = [self showPopup:moduleName showType:FFPopupShowType_FadeIn dismissType:FFPopupDismissType_FadeOut maskType:FFPopupMaskType_Clear delay:delay];
        @PopWeakObj(self);
        [self.toast setDidFinishDismissingBlock:^{
            [selfWeak.toast.contentView removeFromSuperview];
            selfWeak.toast = nil;
        }];
    }
}

- (void)hideToast:(dismissBlock)block
{
    if (nil != self.toast) {
        @PopWeakObj(self);
        if (self.toast.isBeingShown) {
            [self.toast setDidFinishShowingBlock:^{
                [selfWeak hideToast:block];
            }];
        }else {
            [self.toast setDidFinishDismissingBlock:^{
                [selfWeak.toast.contentView removeFromSuperview];
                selfWeak.toast = nil;
                if (block) {
                    block();
                }
            }];
            [self.toast dismissAnimated:YES];
        }
    }else {
        if (block) {
            block();
        }
    }
}

- (void)hideAlertWithoutAnimation
{
    if (self.alert) {
        [self.alert dismissAnimated:NO];
        [self.alert.contentView removeFromSuperview];
        self.alert = nil;
    }
}

- (void)hideBottomSheetWithoutAnimation
{
    if (self.bottomSheet) {
        [self.bottomSheet dismissAnimated:NO];
        [self.bottomSheet.contentView removeFromSuperview];
        self.bottomSheet = nil;
    }
}

- (void)hideToastWithoutAnimation
{
    if (self.toast) {
        [self.toast dismissAnimated:NO];
        [self.toast.contentView removeFromSuperview];
        self.toast = nil;
    }
}

- (void)hideAllPopup
{
    [self hideAlertWithoutAnimation];
    [self hideBottomSheetWithoutAnimation];
    [self hideToastWithoutAnimation];
}

- (FFPopup *)showPopup:(NSString *)moduleName showType:(FFPopupShowType)showType dismissType:(FFPopupDismissType)dismissType maskType:(FFPopupMaskType)maskType delay:(NSTimeInterval)delay
{
    FFPopup *popup = [FFPopup popupWithContentView:[self getRootView:moduleName] showType:showType dismissType:dismissType maskType:maskType dismissOnBackgroundTouch:NO dismissOnContentTouch:NO];
    popup.dimmedMaskAlpha = 0.3;
    FFPopupLayout layout = FFPopupLayoutMake(FFPopupHorizontalLayout_Center, FFPopupVerticalLayout_Center);
    [popup showWithLayout:layout duration:delay];
    return popup;
}

- (void)replacePopupContentView:(FFPopup *)popup moduleName:(NSString *)moduleName
{
    UIView *lastView = popup.contentView;
    UIView *superview = lastView.superview;
    UIView *rootView = [self getRootView:moduleName];
    rootView.frame = lastView.frame;
    
    [lastView removeFromSuperview];
    lastView = nil;
    
    [superview addSubview:rootView];
    popup.contentView = rootView;
}

- (RCTRootView *)getRootView:(NSString *)moduleName
{
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:[self getBridge] moduleName:moduleName initialProperties:nil];
    rootView.frame = [UIScreen mainScreen].bounds;
    rootView.backgroundColor = [UIColor clearColor];
    return rootView;
}

- (RCTBridge *)getBridge
{
    RCTRootView *rootView = (RCTRootView *)[self getMainWindow].rootViewController.view;
    return rootView.bridge;
}

- (UIWindow *)getMainWindow
{
    id appDelegate = [UIApplication sharedApplication].delegate;
    if (appDelegate && [appDelegate respondsToSelector:@selector(window)]) {
        return [appDelegate window];
    }
    NSArray *windows = [UIApplication sharedApplication].windows;
    if ([windows count] == 1) {
        return [windows firstObject];
    } else {
        for (UIWindow *window in windows) {
            if (window.windowLevel == UIWindowLevelNormal) {
                return window;
            }
        }
    }
    return nil;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
