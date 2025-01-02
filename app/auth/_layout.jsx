import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AdminLayout() {
    return (
    <Stack screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="login" options={{ title: 'Login' }} /> */}
        <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />

        {/* <Stack.Screen name="signup" options={{ title: 'Sign Up' }} /> */}
    </Stack>
    )
}
