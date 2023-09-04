# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install the Dependencies

First you will need to install the dependencies for this project. To do so, run the following command from the _root_ the project:

```bash
#using yarn
yarn install
```

## Step 2: Install the Pods

If you are using a Mac and running the app on iOS, you need to install the pods for this project. To do so, run the following command from the _root_ of the project:

```bash
cd ios
pod install
```

## Step 3: Add Google Maps API Key

Enter the provided Google Maps API key in the `meta-data` tag in `android/app/src/main/AndroidManifest.xml` file.

## Step 4: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
#using Yarn
yarn start
```

## Step 5: Run the Application

Let Metro Bundler start up then once it's ready use one of the following commands to have your project run on an Android or iOS:
### For Android

```bash
# In the Metro bundler terminal, press `a` to run the Android application.
a
```
### For iOS

```bash
# In the Metro bundler terminal, press `i` to run the iOS application.
i
```

If everything is set up _correctly_, you should see your new app running shortly provided you have set up your emulator/simulator or device correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
