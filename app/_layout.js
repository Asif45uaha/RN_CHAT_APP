import { Stack } from 'expo-router'
import AuthProvider from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const RootLayout = () => {
    return <AuthProvider>
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
    </AuthProvider>


}

export default RootLayout