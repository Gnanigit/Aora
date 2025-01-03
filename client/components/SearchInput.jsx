import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { usePathname } from "expo-router";
import { router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="w-full bg-black-100 border-2 px-4 h-16 border-black-200 rounded-2xl focus:border-secondary flex flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search you interest.."
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => {
          setQuery(e);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
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
