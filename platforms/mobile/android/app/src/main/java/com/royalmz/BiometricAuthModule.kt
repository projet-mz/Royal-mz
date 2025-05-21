package com.royalmz

import android.content.Context
import android.os.Build
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import java.util.concurrent.Executor
import java.util.concurrent.Executors

class BiometricAuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BiometricAuth"
    }

    @ReactMethod
    fun isBiometricAvailable(callback: Callback) {
        val biometricManager = BiometricManager.from(reactApplicationContext)
        val canAuthenticate = biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)
        
        val result = WritableNativeMap()
        result.putBoolean("available", canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS)
        result.putString("biometryType", getBiometryType())
        result.putString("error", getErrorMessage(canAuthenticate))
        
        callback.invoke(null, result)
    }

    @ReactMethod
    fun authenticate(reason: String, callback: Callback) {
        val currentActivity = currentActivity ?: run {
            callback.invoke("Activity doesn't exist", false)
            return
        }
        
        val executor: Executor = Executors.newSingleThreadExecutor()
        
        val biometricPrompt = BiometricPrompt(
            currentActivity as FragmentActivity,
            executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)
                    callback.invoke(null, true)
                }
                
                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    super.onAuthenticationError(errorCode, errString)
                    callback.invoke(errString.toString(), false)
                }
                
                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    // Authentication failed - this is called for each failed attempt
                }
            }
        )
        
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric Authentication")
            .setSubtitle(reason)
            .setNegativeButtonText("Cancel")
            .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
            .build()
            
        biometricPrompt.authenticate(promptInfo)
    }
    
    private fun getBiometryType(): String {
        return when {
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q -> "Biometric"
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.M -> "Fingerprint"
            else -> "None"
        }
    }
    
    private fun getErrorMessage(code: Int): String {
        return when (code) {
            BiometricManager.BIOMETRIC_SUCCESS -> ""
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> "No biometric hardware"
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> "Biometric hardware unavailable"
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> "No biometric enrolled"
            else -> "Unknown error"
        }
    }
}
