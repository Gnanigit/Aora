import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="px-4 justify-center items-center">
      <Image
        className="w-[270px] h-[215px]"
        resizeMode="contains"
        source={images.empty}
      ></Image>
      <Text className="text-xl font-psemibold text-center text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-gray-100 text-sm">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
