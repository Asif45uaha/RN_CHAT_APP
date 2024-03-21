import { useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'
import { useAuth } from '../../../context/AuthContext'

const pic = require("../../../assets/chat .png")

const Signup = () => {

    const { signUp } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [bio, setBio] = useState("")

    const handleSignup = async () => {
        await signUp(email, password, name, gender, bio)
    }


    return (
        <View className='bg-black flex-1 flex flex-col space-y-4 justify-center items-center'>
            <ImageBackground
                source={pic}
                className='h-48 w-48 object-contain' >
            </ImageBackground>

            <Text className='text-white text-xl font-bold'>Signup Now !</Text>

            <KeyboardAvoidingView behavior='height' className='w-full px-4 flex flex-col space-y-6'>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    className='bg-gray-200 p-4 w-full rounded-xl placeholder:text-blue-600 placeholder:text-lg text-lg'
                    placeholder='Enter Your Name.' />
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
                <TextInput
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                    className='bg-gray-200 p-4 w-full rounded-xl placeholder:text-blue-600 placeholder:text-lg text-lg'
                    placeholder='Enter Your Bio.' />
                <TextInput
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                    className='bg-gray-200 p-4 w-full rounded-xl placeholder:text-blue-600 placeholder:text-lg text-lg'
                    placeholder='Enter Your Gender' />
                <Pressable onPress={handleSignup}>
                    <Text className='text-center text-white bg-blue-600 p-4 rounded-xl'>Signup</Text>
                </Pressable>
                <Text className="text-white text-center text-md">Already have an account? <Link className='text-blue-500' href={"/login/"}>Login</Link></Text>
            </KeyboardAvoidingView>
        </View>
    )
}
export default Signup
