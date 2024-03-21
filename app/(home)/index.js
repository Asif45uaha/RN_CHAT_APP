
import { Image, Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from "../../context/AuthContext";
import { router } from 'expo-router'
import useFetchChats from "../../hooks/useFetchChats";

export default function ChatScreen() {
    const { chats } = useFetchChats()
    const { logOut } = useAuth()

    const handleLogout = async () => {
        await logOut()
        ToastAndroid.show("You have been Logged out", ToastAndroid.SHORT)
    }

    return (
        <ScrollView className="bg-black flex-1 pt-12 flex flex-col space-y-12">

            <View className="flex flex-row items-center justify-between px-6">
                <Text className="text-blue-700 text-2xl  font-bold">ChatList</Text>
                <Pressable onPress={handleLogout} className="bg-blue-700 p-2 rounded-full">
                    <Text className="text-white"><AntDesign name="logout" size={20} color="white" /></Text>
                </Pressable>
            </View>
            <View className="px-4">
                <Text className="text-sm text-gray-400 text-center">Select one of the chats below to enjoy your chatting experience</Text>
            </View>
            <View className="space-y-6 px-4">
                {
                    chats?.map((chat) => {
                        return <View key={chat.id} className="flex flex-col px-4">
                            <Pressable onPress={() => router.navigate(`/${chat.uid}/`)} className="flex items-start flex-row gap-4  bg-blue-700  py-2 rounded-xl">
                                <Image source={{
                                    uri: chat.profile
                                }} className="h-16 w-16 object-contain rounded-full" />
                                <View className="space-y-2">
                                    <Text className="text-white text-lg font-bold">{chat.name}</Text>
                                    <Text className="text-gray-300 text-md font-normal">{chat?.bio}</Text>
                                </View>
                            </Pressable>
                        </View>
                    })
                }
            </View>

        </ScrollView>
    );
}