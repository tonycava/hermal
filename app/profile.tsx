import { Image, Text, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";
import Navbar from "@/components/Navbar";
import React from "react";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";

const Profile = () => {
    const { user, setUser } = useGlobalContext();
    if (!user) return <Redirect href="/login"/>;

    return (
        <View className="flex-1 items-center bg-white">
            <Image
                source={require("@/assets/svg/rond.svg")}
                className=" fixed -top-12 -left-12 w-48 h-48"
            />

            <View className="m-8 mt-16 w-full h-full">
                <View className="flex flex-col w-full h-full items-center">
                    <Image
                        source={require("@/assets/images/profile.png")}
                        alt="profile picture"
                        style={{ width: 80, height: 80, borderRadius: 100, borderWidth: 2, borderColor: 'black' }}
                    />
                    <InputField title="Username" value={user.username} placeholder="Username" handleChangeText={(name: string) => setUser({ ...user, name })} otherStyles="mt-4"/>
                    <PrimaryButton title="Save" handlePress={() => {}} containerStyles="bg-[#D6955B] rounded-xl min-h-[62px] mt-4 mx-4">
                        <Text>Save</Text>
                    </PrimaryButton>
                </View>
            </View>
            <Navbar></Navbar>
        </View>
    )
}

export default Profile;