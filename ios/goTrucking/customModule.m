// CustomModule.m

#import "CustomModule.h"
#import <React/RCTLog.h>

@implementation CustomModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setToken:(NSString *)token userId:(NSString *)userId) {
    RCTLog(@"Token: %@, UserID: %@", token, userId);
}

@end
