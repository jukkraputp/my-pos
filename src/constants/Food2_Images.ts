import { storage } from "../apis/firebase";
import { getDownloadURL, ref } from "firebase/storage";

var urlList: any[] = []
var index = 0

while (true) {
  try {
    const storageRef = ref(storage, `Food2/Food2-${index}.jpg`)
    getDownloadURL(storageRef).then((url) => {
      urlList.push(url)
    })
  } catch (err) {
    console.log(err)
    break
  }
}

export default urlList
