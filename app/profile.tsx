import { Image, Text, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";
import Navbar from "@/components/Navbar";

const Profile = () => {
    const { user, setUser } = useGlobalContext();
    if (!user) return <Redirect href="/login"/>;

    return (
        <View className="flex-1 items-center bg-white">
            <Image
                source={require("@/assets/svg/rond.svg")}
                className=" fixed -top-12 -left-12 w-48 h-48"
            />

            <div className="m-8 mt-16 w-full h-full">
                <div className="flex flex-col w-full h-full items-center">
                    <img
                        src="../assets/images/profile.png"
                        alt="profile picture"
                        className="border-2 border-black rounded-full w-20 h-20"
                    />
                    <h2 className="text-secondary mt-4 text-2xl font-poppins-medium">
                        {user.username}
                    </h2>
                </div>
            </div>
            <Navbar></Navbar>
        </View>
    )
}

export default Profile;