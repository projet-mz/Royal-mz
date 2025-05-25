export class BiometricAuth {
  private platform: 'web' | 'mobile' | 'desktop';
  private nativeModule: any;
  
  constructor(options: { platform: 'web' | 'mobile' | 'desktop'; nativeModule?: any }) {
    this.platform = options.platform;
    this.nativeModule = options.nativeModule;
  }
  
  public async isBiometricAvailable(): Promise<{ available: boolean; biometryType: string; error?: string }> {
    try {
      switch (this.platform) {
        case 'web':
          return await this.isWebAuthnAvailable();
        case 'mobile':
          return await this.isMobileBiometricAvailable();
        case 'desktop':
          return await this.isDesktopBiometricAvailable();
        default:
          return { available: false, biometryType: 'none', error: 'Unsupported platform' };
      }
    } catch (error) {
      return { available: false, biometryType: 'none', error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  private async isWebAuthnAvailable(): Promise<{ available: boolean; biometryType: string; error?: string }> {
    if (typeof window === 'undefined' || !window.PublicKeyCredential) {
      return { available: false, biometryType: 'none', error: 'WebAuthn not supported' };
    }
    
    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      return {
        available,
        biometryType: available ? 'platform' : 'none',
        error: available ? undefined : 'Platform authenticator not available'
      };
    } catch (error) {
      return { available: false, biometryType: 'none', error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  private async isMobileBiometricAvailable(): Promise<{ available: boolean; biometryType: string; error?: string }> {
    if (!this.nativeModule) {
      return { available: false, biometryType: 'none', error: 'Native module not available' };
    }
    
    return new Promise((resolve) => {
      this.nativeModule.isBiometricAvailable((error: any, result: any) => {
        if (error) {
          resolve({ available: false, biometryType: 'none', error });
        } else {
          resolve({
            available: result.available,
            biometryType: result.biometryType,
            error: result.error || undefined
          });
        }
      });
    });
  }
  
  private async isDesktopBiometricAvailable(): Promise<{ available: boolean; biometryType: string; error?: string }> {
    if (!this.nativeModule || !this.nativeModule.isBiometricAvailable) {
      return { available: false, biometryType: 'none', error: 'Native module not available' };
    }
    
    try {
      const result = await this.nativeModule.isBiometricAvailable();
      
      return {
        available: result.available,
        biometryType: result.biometryType,
        error: result.error || undefined
      };
    } catch (error) {
      return { available: false, biometryType: 'none', error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  public async authenticate(reason: string): Promise<{ success: boolean; error?: string }> {
    try {
      switch (this.platform) {
        case 'web':
          return await this.authenticateWeb(reason);
        case 'mobile':
          return await this.authenticateMobile(reason);
        case 'desktop':
          return await this.authenticateDesktop(reason);
        default:
          return { success: false, error: 'Unsupported platform' };
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  private async authenticateWeb(reason: string): Promise<{ success: boolean; error?: string }> {
    if (typeof window === 'undefined' || !window.PublicKeyCredential) {
      return { success: false, error: 'WebAuthn not supported' };
    }
    
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      const publicKeyCredentialRequestOptions = {
        challenge,
        timeout: 60000,
        userVerification: 'required' as UserVerificationRequirement,
        rpId: window.location.hostname
      };
      
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });
      
      return { success: !!credential, error: credential ? undefined : 'Authentication failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  private async authenticateMobile(reason: string): Promise<{ success: boolean; error?: string }> {
    if (!this.nativeModule) {
      return { success: false, error: 'Native module not available' };
    }
    
    return new Promise((resolve) => {
      this.nativeModule.authenticate(reason, (error: any, success: boolean) => {
        if (error) {
          resolve({ success: false, error });
        } else {
          resolve({ success });
        }
      });
    });
  }
  
  private async authenticateDesktop(reason: string): Promise<{ success: boolean; error?: string }> {
    if (!this.nativeModule || !this.nativeModule.authenticate) {
      return { success: false, error: 'Native module not available' };
    }
    
    try {
      const result = await this.nativeModule.authenticate(reason);
      
      return {
        success: result.success,
        error: result.error || undefined
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}
