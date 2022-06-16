import { storage } from "../apis/firebase";
import { getDownloadURL, ref } from "firebase/storage";

var Food1_Images: string[] = []
var index = 0

while (true) {
  const storageRef = ref(storage, `Food1/Food1-${index}.jpg`)
  getDownloadURL(storageRef).then((url) => {
    Food1_Images.push(url)
  }).catch((err) => {
    console.log(err)
  })
  index += 1
  if (index === 0) break
}

export default Food1_Images