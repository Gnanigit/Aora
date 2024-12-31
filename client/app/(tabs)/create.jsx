import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormFiled from "../../components/FormField";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import axios from "axios";
import { uploadPost } from "../../routes/auth";
import { CLOUD_NAME } from "@env";
const cloudName = CLOUD_NAME;

const create = () => {
  const [play, setPlay] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  // For video ------ start
  const player = useVideoPlayer(form.video, (player) => {
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

  // For video ----- end

  // uploaded files picker ----------- start
  const openPicker = async (selectType) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (selectType === "image") {
          console.log(result);
          setForm((prevForm) => ({ ...prevForm, thumbnail: result.assets[0] }));
        } else if (selectType === "video") {
          setForm((prevForm) => ({ ...prevForm, video: result.assets[0] }));
        }
      } else {
        setTimeout(() => {
          Alert.alert("No Selection", "You didn't select any media.");
        }, 100);
      }
    } catch (error) {
      console.error("Error picking media:", error);
      Alert.alert("Error", "There was an issue accessing the media picker.");
    }
  };

  // Permissions request
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the media library."
      );
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  // Uploaded files picker ----------- end

  const submit = async () => {
    try {
      const data = new FormData();
      const cloudName = "dqftexife";

      data.append("file", form.thumbnail);
      data.append("upload_preset", "gnaniaora_images");
      data.append("cloud_name", cloudName);
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      console.log(api);
      const response = await fetch(api, {
        method: "POST",
        body: data,
      });
      // code not completed
      const result = await response.json();

      if (response.ok) {
        console.log("Uploaded file URL:", result.secure_url);
        return result.secure_url;
      } else {
        console.error("Upload failed:", result);
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormFiled
          title="Video title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <VideoView
                // source={{ uri: form.video.uri }}
                player={player}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                isLooping
              />
            ) : (
              <View className="bg-black-100 px-4 w-full h-40 rounded-2xl items-center justify-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="bg-black-100 px-4 w-full h-16 rounded-2xl items-center justify-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormFiled
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
