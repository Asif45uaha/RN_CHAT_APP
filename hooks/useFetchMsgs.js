import { useEffect } from "react"
import { onSnapshot, or, collection, orderBy, query, where } from "@firebase/firestore"
import useMessage from "../store/useMessages"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

const useFetchMsgs = (chatId) => {
    const { user } = useAuth()
    const { setMessages } = useMessage()

    useEffect(() => {
        const fetchMessages = async () => {
            const q = query(collection(db, "messages"), or(where("participants", "==", [user?.uid, chatId]), where("participants", "==", [chatId, user.uid])), orderBy("sendTime", "asc"))
            const unsub = onSnapshot(q, (querySnapshot) => {
                setMessages(querySnapshot.docs.map((doc) => {
                    return ({ ...doc.data(), id: doc.id })
                }))
            })
            return () => unsub()
        }
        fetchMessages()
    }, [])
}
export default useFetchMsgs