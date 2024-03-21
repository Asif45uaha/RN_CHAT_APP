import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { onSnapshot, collection } from '@firebase/firestore'
import { db } from "../firebase"

const useFetchChats = () => {
    const { user } = useAuth()
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const unsub = onSnapshot(collection(db, "users"), (querySnapshot) => {
            const docs = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            setChats(docs.filter((chat) => chat.id !== user.uid))
        })
        return () => unsub()
    }
    useEffect(() => {
        if (user) {
            fetchChats()
        }
    }, [user])
    return { chats }
}
export default useFetchChats