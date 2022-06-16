import { storage } from "../apis/firebase";
import { getDownloadURL, ref } from "firebase/storage";
<<<<<<< HEAD
=======

var urlList: any[] = []
var index = 0

while (true) {
  try {
    const storageRef = ref(storage, `Food1/Food1-${index}.jpg`)
    getDownloadURL(storageRef).then((url) => {
      urlList.push(url)
    })
  } catch (err) {
    console.log(err)
    break
  }
}

const Food1_0 = require("../assets/images/Food1/Food1-0.jpg");
const Food1_1 = require("../assets/images/Food1/Food1-1.jpg");
const Food1_2 = require("../assets/images/Food1/Food1-2.jpg");
const Food1_3 = require("../assets/images/Food1/Food1-3.jpg");
const Food1_4 = require("../assets/images/Food1/Food1-4.jpg");
const Food1_5 = require("../assets/images/Food1/Food1-5.jpg");
const Food1_6 = require("../assets/images/Food1/Food1-6.jpg");
const Food1_7 = require("../assets/images/Food1/Food1-7.jpg");
const Food1_8 = require("../assets/images/Food1/Food1-8.jpg");
const Food1_9 = require("../assets/images/Food1/Food1-9.jpg");
const Food1_10 = require("../assets/images/Food1/Food1-10.jpg");
const Food1_11 = require("../assets/images/Food1/Food1-11.jpg");
const Food1_12 = require("../assets/images/Food1/Food1-12.jpg");
const Food1_13 = require("../assets/images/Food1/Food1-13.jpg");
const Food1_14 = require("../assets/images/Food1/Food1-14.jpg");
const Food1_15 = require("../assets/images/Food1/Food1-15.jpg");
const Food1_16 = require("../assets/images/Food1/Food1-16.jpg");
const Food1_17 = require("../assets/images/Food1/Food1-17.jpg");
const Food1_18 = require("../assets/images/Food1/Food1-18.jpg");
const Food1_19 = require("../assets/images/Food1/Food1-19.jpg");
const Food1_20 = require("../assets/images/Food1/Food1-20.jpg");
>>>>>>> 4b9ea680eae1eea7d4b6d055267dc927c4040814

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