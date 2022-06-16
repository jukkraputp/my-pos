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

<<<<<<< HEAD
export default urlList
=======
export default urlList
>>>>>>> 4b9ea680eae1eea7d4b6d055267dc927c4040814
