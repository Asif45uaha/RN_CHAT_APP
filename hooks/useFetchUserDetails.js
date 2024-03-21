import { useEffect, useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "@firebase/firestore"

const useFetchUserDetails = (chatId) => {
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchChatUserDetails = async () => {
            const docRef = doc(db, "users", chatId)
            const docSnap = await getDoc(docRef)
            setData(docSnap.data())
        }
        fetchChatUserDetails()
    }, [chatId])
    return { data }
}
export default useFetchUserDetails