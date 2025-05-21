import Foundation
import LocalAuthentication

@objc(BiometricAuth)
class BiometricAuth: NSObject {
  
  @objc
  func isBiometricAvailable(_ callback: RCTResponseSenderBlock) {
    let context = LAContext()
    var error: NSError?
    
    let canEvaluate = context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error)
    let biometryType = getBiometryType(context: context)
    
    callback([NSNull(), [
      "available": canEvaluate,
      "biometryType": biometryType,
      "error": error != nil ? error!.localizedDescription : ""
    ]])
  }
  
  @objc
  func authenticate(_ reason: String, callback: @escaping RCTResponseSenderBlock) {
    let context = LAContext()
    var error: NSError?
    
    if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
      context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { success, error in
        DispatchQueue.main.async {
          if success {
            callback([NSNull(), true])
          } else {
            callback([error?.localizedDescription ?? "Authentication failed", false])
          }
        }
      }
    } else {
      callback([error?.localizedDescription ?? "Biometric authentication not available", false])
    }
  }
  
  private func getBiometryType(context: LAContext) -> String {
    if #available(iOS 11.0, *) {
      switch context.biometryType {
      case .faceID:
        return "FaceID"
      case .touchID:
        return "TouchID"
      case .none:
        return "None"
      @unknown default:
        return "Unknown"
      }
    } else {
      return "TouchID"
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
