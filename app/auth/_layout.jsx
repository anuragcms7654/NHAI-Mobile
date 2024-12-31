import PublicRoutes from "@/src/components/RoutesGuard/PublicRoutes";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function _layout() {
    return (
        <PublicRoutes>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" options={{ title: 'Login' }} />
                <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
                {/* <Stack.Screen name="signup" options={{ title: 'Sign Up' }} /> */}
            </Stack>
        </PublicRoutes>
    )
}
