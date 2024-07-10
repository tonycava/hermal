import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from "expo-router";

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
                <Link href={'/'}>
                    <img src='../assets/icons/home.png' alt="home" className='w-8 h-8'/>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Link href={'/settings'}>
                    <img src='../assets/icons/menu.png' alt="menu" className='h-8'/>
                </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Link href={'/profile'}>
                    <img src='../assets/images/profile.png' alt="profile" className="border-2 border-black rounded-full w-10 h-10"/>
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
