import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import API from 'src/apis/API';

export default function useCachedResources(api: API) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const cacheResources = async (images: any[]) => {
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })

    return Promise.all(cacheImages)
  }



  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        /* await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        }); */

        // Load images
        const allImages = api.allImages
        var imagesList: any[] = []
        Object.keys(allImages).forEach((key) => {
          var images: any[]
          switch (key) {
            case 'Food1_Images':
              images = allImages.Food1_Images
              break
            case 'Food2_Images':
              images = allImages.Food2_Images
              break
            case 'FoodSet_Images':
              images = allImages.FoodSet_Images
              break
            default:
              images = []
              break
          }
          images.map((image) => {
            imagesList.push(image)
          })
        })
        await cacheResources(imagesList)

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
