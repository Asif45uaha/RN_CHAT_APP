import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc } from '@firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
import { ToastAndroid } from 'react-native';


const AuthContext = createContext()



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUp = async (email, password, name, gender, bio) => {
        const newUser = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, "users", newUser?.user?.uid), {
            uid: newUser?.user?.uid,
            bio: bio,
            name: name,
            email: email,
            profile: gender.toLowerCase() === "male" ? `https://avatar.iran.liara.run/public/boy?username=${name}` : `https://avatar.iran.liara.run/public/girl?username=${name}`
        })

        await AsyncStorage.setItem("user", JSON.stringify(newUser?.user))

        ToastAndroid.show("Sign up successfully", ToastAndroid.SHORT)
    }

    const logIn = async (email, password) => {
        const user = await signInWithEmailAndPassword(auth, email, password)

        await AsyncStorage.setItem("user", JSON.stringify(user?.user))
    }

    const logOut = async () => {
        await signOut(auth)
        await AsyncStorage.removeItem("user")
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsub()
    }, [])

    useEffect(() => {
        const protectRoute = async () => {
            const user = await AsyncStorage.getItem("user")
            if (user) {
                router.navigate("/")
            }
            else {
                router.navigate("/login/")
            }
        }
        protectRoute()
    }, [user])

    return <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}