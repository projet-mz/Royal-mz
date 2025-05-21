#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BiometricAuth, NSObject)

RCT_EXTERN_METHOD(isBiometricAvailable:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(authenticate:(NSString *)reason callback:(RCTResponseSenderBlock)callback)

@end
