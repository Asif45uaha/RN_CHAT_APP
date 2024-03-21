import { collection, addDoc } from "@firebase/firestore"
import { db } from "../firebase"
import { useState } from "react"


const useSendMsg = (user, chatId) => {
    const [msgText, setMsgText] = useState("")
    const handleSendMessage = async () => {
        const msgRef = collection(db, "messages")

        await addDoc(msgRef, {
            message: msgText,
            sendTime: new Date().toLocaleString(),
            senderID: user?.uid,
            participants: [user?.uid, chatId],
        })

        setMsgText("")
    }
    return { handleSendMessage, msgText, setMsgText }
}
export default useSendMsg