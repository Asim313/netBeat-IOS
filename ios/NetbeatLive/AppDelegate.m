/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "Orientation.h"
#import <React/RCTBridge.h>
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <WebRTC/RTCAudioSessionConfiguration.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  [FIRApp configure];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"NetbeatLive"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
  UIViewController *vc = [sb instantiateInitialViewController];
  rootView.loadingView = vc.view;
  
//
  RTCAudioSessionConfiguration *webRTCConfiguration = [RTCAudioSessionConfiguration webRTCConfiguration];

    webRTCConfiguration.categoryOptions = (
       AVAudioSessionCategoryOptionAllowBluetooth |
       AVAudioSessionCategoryOptionDefaultToSpeaker
    );
  dispatch_async(dispatch_get_main_queue(), ^{
    
      [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didSessionRouteChange:) name:AVAudioSessionRouteChangeNotification object:nil];
    
  });
//  [[AudioSessionManager sharedInstance] startAndPostNotifications:YES];
//  NSLog(@"audioRoute is %@", [AudioSessionManager sharedInstance].audioRoute);
//
//  if (![[AudioSessionManager sharedInstance] changeMode:kAudioSessionManagerMode_Record]) {
//      // .... handle error ...
//  }
//
//  if (![[AudioSessionManager sharedInstance] changeMode:kAudioSessionManagerMode_Playback]) {
//      // .... handle error ...
//  }
  
  //[self.captureSession startRunning];
  
  return YES;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
//- (void)didSessionRouteChange:(NSNotification *)notification
//{
//    NSDictionary *interuptionDict = notification.userInfo;
//    const NSInteger routeChangeReason = [[interuptionDict valueForKey:AVAudioSessionRouteChangeReasonKey] integerValue];
//
////    if (routeChangeReason == AVAudioSessionRouteChangeReasonRouteConfigurationChange) {
//        [self enableLoudspeaker];
////    }
//}
- (void)didSessionRouteChange:(NSNotification *)notification
{
  NSDictionary *interuptionDict = notification.userInfo;
  NSInteger routeChangeReason = [[interuptionDict valueForKey:AVAudioSessionRouteChangeReasonKey] integerValue];

  switch (routeChangeReason) {
      case AVAudioSessionRouteChangeReasonCategoryChange: {
        
          
          // Set speaker as default route
            AVAudioSession *audioSession = [AVAudioSession sharedInstance];
          NSError* error;
        if (![[[AVAudioSession sharedInstance] category] isEqualToString:AVAudioSessionCategoryPlayAndRecord]) {
            [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayAndRecord withOptions:(AVAudioSessionCategoryOptionDefaultToSpeaker | AVAudioSessionCategoryOptionAllowBluetooth) error:&error];
            NSLog(@"setCategory error = %@", error);
        [[AVAudioSession sharedInstance] overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:nil];

        
      
            [[AVAudioSession sharedInstance] setActive:YES error:&error];
            NSLog(@"setActive error = %@", error);
          RTCAudioSessionConfiguration *webRTCConfiguration = [RTCAudioSessionConfiguration webRTCConfiguration];
//        webRTCConfiguration.
        }
        [[AVAudioSession sharedInstance] categoryOptions];
          
        
//          [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback withOptions: AVAudioSessionCategoryOptionDefaultToSpeaker  error:nil];
//        [[AVAudioSession sharedInstance] setCategory:AVAudioSessionModeVideoChat error:nil];
//        audioSession.accessibilityActivate;
//        [[AVAudioSession sharedInstance] setActive:Yes withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation error:nil];
//        [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayAndRecord withOptions:AVAudioSessionCategoryOptionMixWithOthers error:nil];
//        [[AVAudioSession sharedInstance] setActive:YES withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation error:nil];
        
      }
      break;

    default:
      break;
  }
}
//
//- (void)enableLoudspeaker {
//    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
//    AVAudioSessionCategoryOptions options = audioSession.categoryOptions;
////    if (options & AVAudioSessionCategoryOptionDefaultToSpeaker) return;
//    options |= AVAudioSessionCategoryOptionDefaultToSpeaker;
//    [audioSession setActive:YES error:nil];
//    [audioSession setCategory:AVAudioSessionPortOverrideSpeaker withOptions:options error:nil];
//}

@end
