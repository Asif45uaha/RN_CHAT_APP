import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import { Link } from 'expo-router'
import { useAuth } from '../../../context/AuthContext'


const Login = () => {

    const { logIn } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = async () => {
        await logIn(email, password)
        ToastAndroid.show("Logged in Success", ToastAndroid.SHORT)
    }

    return (
        <View className='bg-black flex-1 flex flex-col space-y-4 justify-center items-center'>
            <Image
                source={{
                    uri: "https://icon-library.com/images/chat-flat-icon/chat-flat-icon-8.jpg"
                }}
                className='h-48 w-48 object-contain' />

            <Text className='text-white text-xl font-bold'>Login Now !</Text>

            <KeyboardAvoidingView className='w-full px-4 flex flex-col space-y-6'>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    className='bg-gray-200 p-4 w-full rounded-xl placeholder:text-blue-600 placeholder:text-lg text-lg'
                    placeholder='Enter Your Email.' />
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    className='bg-gray-200 p-4 w-full rounded-xl placeholder:text-blue-600 placeholder:text-lg text-lg'
                    placeholder='Enter Your Password.' />

                <Pressable onPress={handleLogin}>
                    <Text className='text-center text-white bg-blue-600 p-4 rounded-xl'>Login</Text>
                </Pressable>
                <Text className="text-white text-center text-md">Doesn't have an account? <Link className='text-blue-500' href={"/signup/"}>signup</Link></Text>
            </KeyboardAvoidingView>
        </View>
    )
}
export default Login
