import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/firebase';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const getImages = async () => {
          const storageRef = await listAll(ref(storage))
          const imageList = storageRef.prefixes.map(async (typeRef) => {
            const imagesRef = await listAll(ref(typeRef))
            const imagesURL = imagesRef.items.map(async (imageRef) => {
              const key = String(imageRef.fullPath.split("/").at(0));
              const imageName = String(
                String(imageRef.fullPath.split("/").at(1)).split(".").at(0)
              );
              const url = await getDownloadURL(imageRef)
              await AsyncStorage.setItem(`${key}_${imageName}`, url)
              return url;
            })
            return await Promise.all(imagesURL)
          })
          return await Promise.all(imageList)
        }

        const data = await getImages()
        var images: string[] = []
        data.forEach((imageList) => {
          images = [...images, ...imageList]
        })

        function cacheImages(images: any[]) {
          return images.map(image => {
            if (typeof image === 'string') {
              return Image.prefetch(image);
            } else if (!!image) {
              return Asset.fromModule(image).downloadAsync();
            } else return true
          });
        }

        const imageAssets = cacheImages(images)
        await Promise.all([...imageAssets])

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
