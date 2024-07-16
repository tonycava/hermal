import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from "expo-router";

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
                <Link href={'/'}>
                    <Image  source={require("@/assets/icons/home.png")} alt="home" className='w-8 h-8 scale-50'/>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Link href={'/settings'}>
                    <Image src='../assets/icons/menu.png' alt="menu" className='h-8'/>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Link href={'/profile'}>
                    <Image
                        source={require("@/assets/images/profile.png")}
                        alt="profile picture"
                        style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: 'black' }}
                    />
                </Link>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: '#18534F',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItem: {
        padding: 10,
    },
});

export default Navbar;
