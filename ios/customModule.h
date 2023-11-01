// CustomModule.h

#import <React/RCTBridgeModule.h>

@interface CustomModule : NSObject <RCTBridgeModule>

+ (instancetype)sharedInstance; // Declare sharedInstance method

- (void)setToken:(NSString *)token userId:(NSString *)userId;
- (NSDictionary *)getStoredTokenAndUserId;

@end
