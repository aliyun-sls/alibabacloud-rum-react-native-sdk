require 'json'
package = JSON.parse(File.read(File.join(__dir__, './', 'package.json')))

Pod::Spec.new do |s|

  # ―――  Spec Metadata  ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.name         = "OpenRUMReactNativePlugin"
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']

  # ―――  Spec License  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.license      = package['license']

  # ――― Author Metadata  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.author        = "OpenRUM"

  # ――― Platform Specifics ――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.platform     = :ios, "8.0"
  s.ios.deployment_target = "8.0"  

  # ――― Source Location ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.source       = { :git => "./../node_modules/\@openrum/react-native-plugin", :tag => "#{s.version}" }

  # ――― Source Code ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.source_files  = "ios/*.{h,m}"

  # ――― Project Linking ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.frameworks = "UIKit", "Foundation"
  s.libraries = "resolv", "c++"
  # s.ios.vendored_frameworks = "ios/lib/OpenRUM.xcframework", "ios/lib/OpenBusiness.xcframework", "ios/lib/OpenCore.xcframework"
  

  # ――― Project Settings ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.requires_arc = true
  s.pod_target_xcconfig = { 'OTHER_LDFLAGS' => '-ObjC' }
  s.dependency "React"
  s.dependency "AlibabaCloudRUM", "0.3.1"
  
end
