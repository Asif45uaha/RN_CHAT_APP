import { Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Message from '../../../components/Message'
import useMessage from '../../../store/useMessages'
import { Ionicons } from '@expo/vector-icons';
import useSendMsg from '../../../hooks/useSendMsg'
import useFetchUserDetails from '../../../hooks/useFetchUserDetails'
import useFetchMsgs from '../../../hooks/useFetchMsgs'
import { useAuth } from '../../../context/AuthContext';


const ChatDetails = () => {


    const { user } = useAuth()
    const { messages } = useMessage()

    const { chatId } = useLocalSearchParams()

    //custom hooks
    const { handleSendMessage, msgText, setMsgText } = useSendMsg(user, chatId)
    const { data } = useFetchUserDetails(chatId)
    useFetchMsgs(chatId)

    return (
        <View className="bg-black flex-1 pt-10 pb-2 px-4 w-full h-full">
            <View className="flex bg-blue-700 py-4  flex-row items-start gap-8">
                <Image source={{ uri: data?.profile }} className="h-16 w-16 object-contain rounded-full" />
                <View className="space-y-2">
                    <Text className="text-white text-xl font-bold">{data?.name}</Text>
                    <Text className="text-gray-300 text-md font-normal">{data?.bio}</Text>
                </View>
            </View>
            <ScrollView horizontal={false} className="py-4 flex-1 space-y-2">
                {
                    messages?.map((msg, id) => {
                        return <ScrollView
                            key={id}

                            className="flex  py-4 rounded-xl  flex-col">
                            <Message msg={msg} />
                        </ScrollView>
                    })
                }
                {
                    messages?.length === 0 && <View>
                        <Text className="text-gray-600 text-center">No Messages To Show</Text>
                    </View>
                }
            </ScrollView>
            <KeyboardAvoidingView className="flex  flex-row gap-2 w-full">
                <TextInput
                    value={msgText}
                    onChangeText={(text) => setMsgText(text)}
                    placeholder='Enter Your Message'
                    className="w-[80%] px-4 py-4 bg-gray-200 rounded-xl placeholder:text-blue-500 placeholder:text-lg text-lg" />
                <Pressable onPress={handleSendMessage} className="bg-blue-700 px-2 rounded-xl flex justify-center items-center w-[20%]">
                    <Ionicons name="send-outline" size={24} color="white" />
                </Pressable>
            </KeyboardAvoidingView>
        </View>
    )
}
export default ChatDetails
