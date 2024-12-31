import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
// import { Video, ResizeMode } from "expo-av";
// import YoutubePlayer from "react-native-youtube-iframe";

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

  const videoSource = item.video;
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    const finishedThreshold = player.duration * 0.9;
    if (player.currentTime >= finishedThreshold && player.currentTime > 0) {
      setPlay(false);
    }
  }, [player.currentTime, isPlaying]);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem == item._id ? ZoomIn : ZoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          className=" w-52 h-72 mt-3 bg-white/10 rounded-[35px]"
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
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
