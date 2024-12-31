import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import useFetch from "../../hooks/useFetch";
import VideoCard from "../../components/VideoCard";
import { getUserPosts, signOut } from "../../routes/auth";
import { useSelector } from "react-redux";
import { icons } from "../../constants";
import AvatarComponent from "../../components/AvatarComponent";
import InfoBox from "../../components/InfoBox";
import { useDispatch } from "react-redux";
import { setIsLogged, setUser } from "../../redux/slices/auth";
import { router } from "expo-router";
import { signout } from "../../routes/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector((state) => state.auth);
  const { data: posts, loading: postsLoading } = useFetch(() =>
    getUserPosts(user._id)
  );
  const avatar = user?.avatar;

  const logout = async () => {
    await signout();
    dispatch(setUser(null));
    dispatch(setIsLogged(false));
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-4">
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end  mb-8 mr-5 mt-3"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              {avatar ? (
                <AvatarComponent
                  className="w-[90%] h-[90%] rounded-lg"
                  avatar={avatar}
                  resizeMode="cover"
                />
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex-row">
              <InfoBox
                title={posts ? posts.length : 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          postsLoading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <EmptyState
              title="No videos found"
              subtitle="No video found for this search query."
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={postsLoading}
            onRefresh={() => {
              // Add refresh logic here if needed
            }}
          />
        }
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
