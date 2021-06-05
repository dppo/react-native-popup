//
//  PopupManager.h
//  react-native-popup
//
//  Created by 高昇 on 2021/6/4.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef void(^dismissBlock)(void);

@interface PopupManager : NSObject

+ (instancetype)shareManager;

- (void)showAlert:(nonnull NSString *)moduleName;

- (void)hideAlert:(dismissBlock)block;

- (void)showBottomSheet:(nonnull NSString *)moduleName;

- (void)hideBottomSheet:(dismissBlock)block;

- (void)showToast:(nonnull NSString *)moduleName delay:(int)delay;

- (void)hideToast:(dismissBlock)block;

- (void)hideAllPopup;

- (UIWindow *)getMainWindow;

@end

NS_ASSUME_NONNULL_END
