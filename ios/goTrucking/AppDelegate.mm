#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
//notifications
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>


//bg location
#import "AppDelegate.h"
#import <CoreLocation/CoreLocation.h>



#import "CustomModule.h"






@interface AppDelegate () <CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, strong) NSTimer *locationUpdateTimer;

@end
//bglocation end
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  self.moduleName = @"GoTrucking";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
  }
  [GMSServices provideAPIKey:@"AIzaSyBBFe4E3HNbOstJa3sFJ3Y8gSbXX3Cz_O8"];
  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
   center.delegate = self;
  
//   Initialize location manager and set delegate
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;

    // Request location updates in the background
    [self.locationManager requestAlwaysAuthorization];

  // Set allowsBackgroundLocationUpdates to YES
      self.locationManager.allowsBackgroundLocationUpdates = YES;

    // Start a timer to request location updates every 3 seconds
//    self.locationUpdateTimer = [NSTimer scheduledTimerWithTimeInterval:10.0 target:self selector:@selector(requestLocationUpdate) userInfo:nil repeats:YES];
//

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
- (BOOL)application:(UIApplication *)application willFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    return YES;
}
//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

- (void)requestLocationUpdate {
  // Stop updating location to conserve battery if needed
     [self.locationManager stopUpdatingLocation];
     // Request location updates here
     self.locationManager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters;
     [self.locationManager startUpdatingLocation];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    // Handle updated locations here
    CLLocation *location = [locations lastObject];
    if (location) {
        double latitude = location.coordinate.latitude;
        double longitude = location.coordinate.longitude;
        NSLog(@"Latitude>>>>: %f, Longitude>>>>: %f", latitude, longitude);
    }
    // Stop updating location to conserve battery if needed
  [self.locationManager stopUpdatingLocation];
}

//- (void)applicationDidEnterBackground:(UIApplication *)application {
//    [self.locationManager startUpdatingLocation];
//}
- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Start a background task to keep the app running in the background
    __block UIBackgroundTaskIdentifier backgroundTask = [application beginBackgroundTaskWithName:@"YourTask" expirationHandler:^{
        [application endBackgroundTask:backgroundTask];
        backgroundTask = UIBackgroundTaskInvalid;
    }];
    
    // Start a timer to perform a specific method every 15 seconds
    NSTimer *backgroundTimer = [NSTimer scheduledTimerWithTimeInterval:15.0 target:self selector:@selector(runBackgroundTask) userInfo:nil repeats:YES];
    
    // Ensure the timer keeps running even if the app goes to sleep
    [[NSRunLoop currentRunLoop] addTimer:backgroundTimer forMode:NSRunLoopCommonModes];
}

- (void)runBackgroundTask {
  // Perform your background task here
  NSLog(@"Background task running...");
  //hit api
      [self.locationManager startUpdatingLocation];
}

//- (void)applicationWillEnterForeground:(UIApplication *)application {
//    [self.locationManager startUpdatingLocation];
//}
//
//- (void)applicationWillTerminate:(UIApplication *)application {
//    [self.locationManager startUpdatingLocation];
//}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge


{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
