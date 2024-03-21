import { Text, View } from 'react-native'
import { useAuth } from '../context/AuthContext'


const Message = ({ msg }) => {
    const { user } = useAuth()

    return (
        <View className={`flex  py-4 px-4  ${msg?.senderID === user.uid ? "justify-end items-end " : "justify-start items-start "}`}>
            <Text className="text-white text-lg">{msg?.message}</Text>
            <Text className="text-gray-300 text-end text-xs">{(msg?.sendTime).slice(10)}</Text>
        </View>
    )
}
export default Message
