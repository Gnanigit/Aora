import React, { useEffect } from "react";
import { SplashScreen, Stack, Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "../redux/store";
import GlobalProvider from "../redux/GlobalProvider";
import { useSelector } from "react-redux";
import { Redirect } from "expo-router";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { isLogged, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null;
  }
  if (isLogged) {
    return <Redirect href="/home" />;
  }
};

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false }}
          />
        </Stack>
        <AppContent />
      </GlobalProvider>
    </Provider>
  );
};

export default RootLayout;
