import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import {useRouter} from "expo-router";

export default function DumpPage() {
    const router = useRouter();
    return (
        <View>
            <Text>DumpPage</Text>
            <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/main")}>
                <Text>Main</Text>
            </TouchableOpacity>


          



        </View>
    );
}
