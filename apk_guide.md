# How to Build the APK

Since this environment does not have the full Android development tools installed, you will need to finalize the build using Android Studio on your machine.

Prerequisites:
- [Android Studio](https://developer.android.com/studio) installed.
- Android SDK installed (usually comes with Android Studio).

## Steps

1.  **Open the Android Project**
    In your terminal, run:
    ```bash
    npx cap open android
    ```
    This will launch Android Studio with the project loaded.

2.  **Wait for Sync**
    Android Studio will take a moment to sync Gradle files. Wait until the progress bar at the bottom right finishes.

3.  **Build Signed APK**
    - Go to **Build** > **Generate Signed Bundle / APK**.
    - Select **APK**.
    - Click **Next**.
    - **Key Store Path**: Create a new keystore if you don't have one (remember the password and alias!).
    - Click **Next**, select **Release**, and check **V1** and **V2** signatures.
    - Click **Finish**.

4.  **Locate APK**
    - Once the build finishes, a notification will appear. Click **Locate**.
    - The `app-release.apk` file is your installable app!

5.  **Running on Emulator/Phone**
    - Connect your Android phone via USB (Debugging enabled).
    - Click the green **Play** button in Android Studio to install and run the app directly.
