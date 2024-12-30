import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full bg-black-100 border-2 px-4 h-16 border-black-200 rounded-2xl focus:border-secondary flex flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && showPassword}
      />
      <TouchableOpacity>
        <Image
          className="w-5 h-5"
          resizeMode="contain"
          source={icons.search}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
