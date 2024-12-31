import { View, Text, Image, FlatList, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts } from "../../routes/auth";
import { getLatestPosts } from "../../routes/auth";
import useFetch from "../../hooks/useFetch";
import VideoCard from "../../components/VideoCard";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const { data: posts, refetch } = useFetch(getAllPosts);
  const { data: latestPosts } = useFetch(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-4">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>
            <SearchInput
              title="Search"
              placeholder="Search for a video topic..."
            />
            <View className="w-full flex-1 pt-5 bt-8 ">
              <Text className="text-gray-100 font-pregular text-lg mb-3">
                Trending Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
