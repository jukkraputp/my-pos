import { storage } from "../apis/firebase";
import { getDownloadURL, ref } from "firebase/storage";

var urlList: any[] = []
export const signList = [
    'plus',
    'minus',
    'close'
]

signList.map((sign) => {
    try {
        const storageRef = ref(storage, `Sign/${sign}-sign.svg`)
        getDownloadURL(storageRef).then((url) => {
            urlList.push(url)
        })
    } catch (err) {
        console.log(err)
    }
})

export default urlList