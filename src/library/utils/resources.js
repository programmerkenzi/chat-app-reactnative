/*
 * @Description: 公用使用函数
 * @Author: Lewis
 * @Date: 2021-01-19 09:45:36
 * @LastEditTime: 2021-07-09 18:49:33
 * @LastEditors: Kenzi
 */
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";
import { handleCheckMediaLibraryPermission } from "./permissions";
import * as IntentLauncher from "expo-intent-launcher";
import { checkCameraPermission } from "./permissions";

//获取档案
export const filePicker = async () => {
  const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
  const type = result.type;
  if (type === "success") {
    return result;
  } else {
    return false;
  }
};

export const handleGetMediaLibrary = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (handleCheckMediaLibraryPermission) {
        let picker = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        resolve(picker);
      }
    } catch (err) {
      reject(err);
    }
  });
};

//获取照片
export const handleGetImageLibrary = async (edit = false) => {
  const grantedPermission = await handleCheckMediaLibraryPermission();
  if (grantedPermission) {
    const picture = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: edit,
      aspect: [1, 1],
    });
    const cancelled = picture.cancelled;
    if (cancelled) {
      return false;
    } else {
      return picture;
    }
  } else {
    return false;
  }
};

//拍照
export const handleTakePicture = async () => {
  const grantedPermission = await checkCameraPermission();
  if (grantedPermission) {
    const picture = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    const cancelled = picture.cancelled;
    if (cancelled) {
      return false;
    } else {
      return picture;
    }
  } else {
    return false;
  }
};

//储存资源
export const saveFile = async (fileUri, filename, mine_type) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    const album = await MediaLibrary.getAlbumAsync("Download/oa");

    if (album == null) {
      await MediaLibrary.createAlbumAsync("Download/oa", asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
    const existAssets = await MediaLibrary.getAssetsAsync({
      album: album,
      mediaType: mine_type.includes("audio")
        ? MediaLibrary.MediaType.audio
        : mine_type.includes("image")
        ? MediaLibrary.MediaType.photo
        : mine_type.includes("video")
        ? MediaLibrary.MediaType.video
        : MediaLibrary.MediaType.unknown,
    });

    const theAsset = existAssets.assets.filter(
      (asset) => asset.filename === filename
    );

    if (theAsset.length > 0) {
      const uri = theAsset[0].uri;
      const contentUri = await FileSystem.getContentUriAsync(uri);
      return contentUri;
    }
  } catch (err) {
    // console.log("Save err: ", err);
  }
};

//下载档案
export const downloadResources = async (url, filename, mine_type) => {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status === "granted") {
    const directory = `${FileSystem.documentDirectory}oa`;
    const checkDirectory = await FileSystem.getInfoAsync(directory);
    if (checkDirectory.isDirectory) {
      const { uri } = await FileSystem.downloadAsync(
        url,
        `${directory}/${filename}`
      );
      const getContentUri = FileSystem.getContentUriAsync(uri);
      return getContentUri;
    } else {
      const makeDirectory = await FileSystem.makeDirectoryAsync(directory);
      const { uri } = await FileSystem.downloadAsync(
        url,
        `${directory}/${filename}`
      );
      const getContentUri = FileSystem.getContentUriAsync(uri);
      return getContentUri;
    }
  }

  // const baseUrl = __DEV__
  //   ? process.env.REACT_APP_API_URL_DEVELOPMENT
  //   : process.env.REACT_APP_API_URL_PRODUCTION;
  // const downloadUrl = `${baseUrl}/${url}`;
  // const userToken = state.auth.userToken;
  // if (status === "granted") {
  //   const album = await MediaLibrary.getAlbumsAsync("Download/oa");
  //   console.log("album :>> ", album[0]);
  //   const existAssets = await MediaLibrary.getAssetsAsync({
  //     album: album[0],
  //     mediaType: mine_type.includes("audio")
  //       ? MediaLibrary.MediaType.audio
  //       : mine_type.includes("image")
  //       ? MediaLibrary.MediaType.photo
  //       : mine_type.includes("video")
  //       ? MediaLibrary.MediaType.video
  //       : MediaLibrary.MediaType.unknown,
  //   });
  //   console.log("existAssets :>> ", existAssets);
  //   const theAsset = existAssets.assets.filter(
  //     (asset) => asset.filename === filename
  //   );
  //   console.log("filename :>> ", filename);
  //   console.log("theAsset :>> ", theAsset);
  //   //如果档案已经存在于下载资料夹
  //   if (theAsset.length > 0) {
  //     const uri = theAsset[0].uri;
  //     const contentUri = await FileSystem.getContentUriAsync(uri);
  //     return contentUri;
  //   } else {
  //     const { uri } = await FileSystem.downloadAsync(url, fileUri, {
  //       headers: {
  //         Authorization: userToken,
  //         responseType: "blob",
  //       },
  //     });
  //     console.log("uri in after downloadResources:>> ", uri);
  //     if (uri) {
  //       await saveFile(uri, filename, mine_type);
  //     }
  //   }
  // }
};

export const downloadAndOpenFile = async (url, name, mime_type) => {
  const fileUri = await downloadResources(url, name, mime_type);

  const openFile = await IntentLauncher.startActivityAsync(
    "android.intent.action.VIEW",
    {
      data: fileUri,
      flags: 1,
    }
  );

  // await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
  //   data: uri,
  //   flags: 1,
  //   type: mine_type,
  // });
};

//将path加上url
export const loadResources = (path) => {
  // const baseUrl = __DEV__
  //   ? process.env.REACT_APP_RESOURCES_IP_DEVELOPMENT
  //   : process.env.REACT_APP_RESOURCES_IP_PRODUCTION;
  const baseUrl = "https://olaola.023hlyy.com";
  const file_url = `${baseUrl}/${path}`;

  return file_url;
};
