import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";

const ZoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const ZoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  // if video is youtube video --- start
  const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com.*(?:\?|\&)v=|youtu\.be\/)([^?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeUrl = item.video;
  const video_Id = extractYouTubeVideoId(youtubeUrl);

  const onStateChange = (state) => {
    if (state === "ended") {
      setPlay(false);
      Alert.alert("Video has finished playing!");
    }
  };

  // if video is youtube video --- end

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem == item._id ? ZoomIn : ZoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className=" w-52 h-72 mt-3 bg-white/10 rounded-[35px]"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinis) {
              setPlay(false);
            }
          }}
        />
      ) : (
        // if video is youtube video --- start
        // <YoutubePlayer
        //   height={300}
        //   width={Dimensions.get("window").width - 40}
        //   videoId={video_Id}
        //   useNativeControls
        //   shouldPlay
        //   onChangeState={onStateChange}
        // />
        // if video is youtube video --- end
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.5}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
            source={{ uri: item.thumbnail }}
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          ></Image>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
