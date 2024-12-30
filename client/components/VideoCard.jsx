import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import AvatarComponent from "./AvatarComponent";
import { icons } from "../constants";
import YoutubePlayer from "react-native-youtube-iframe";
const VideoCard = ({
  video: { title, thumbnail, video, creator, username, avatar },
}) => {
  const [play, setPlay] = useState(false);

  // if video is youtube video --- start
  const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com.*(?:\?|\&)v=|youtu\.be\/)([^?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeUrl = video;
  const video_Id = extractYouTubeVideoId(youtubeUrl);

  const onStateChange = (state) => {
    if (state === "ended") {
      setPlay(false);
      Alert.alert("Video has finished playing!");
    }
  };

  // if video is youtube video --- end
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
        // <Video
        //   source={{ uri: item.video }}
        //   className=" w-full h-60 mt-3  rounded-[35px]"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        //   onPlaybackStatusUpdate={(status) => {
        //     if (status.didJustFinis) {
        //       setPlay(false);
        //     }
        //   }}
        // />

        // if video is youtube video --- start
        <YoutubePlayer
          height={300}
          width={Dimensions.get("window").width - 40}
          videoId={video_Id}
          useNativeControls
          shouldPlay
          onChangeState={onStateChange}
        />
      ) : (
        // if video is youtube video --- end
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
