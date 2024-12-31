import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import AvatarComponent from "./AvatarComponent";
import { icons } from "../constants";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
// import YoutubePlayer from "react-native-youtube-iframe";
const VideoCard = ({
  video: { title, thumbnail, video, creator, username, avatar },
}) => {
  const [play, setPlay] = useState(false);

  const player = useVideoPlayer(video, (player) => {
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
  }, [player.currentTime]);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <AvatarComponent avatar={avatar} resizeMode="cover" />
          </View>
          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          ></Image>
        </View>
      </View>
      {play ? (
        <VideoView
          className="w-full h-60 "
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          ></Image>
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
