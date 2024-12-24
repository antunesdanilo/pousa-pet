import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout, selectUser, UserSliceState } from '@/reducers/user.slice';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

/**
 * Layout component for the main app screen with navigation tabs.
 * The layout contains a header with a logo, user name, and a logout button.
 * The component handles tab navigation and allows the user to log out.
 *
 * @returns {JSX.Element} The rendered layout component with tab navigation.
 */
const Layout: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector<UserSliceState>(selectUser);

  /**
   * Handles user logout by dispatching the logout action
   * and redirecting to the login page.
   */
  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerLeft: () => (
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                marginLeft: 10,
                height: 35,
                aspectRatio: 1.5,
              }}
            />
          ),
          headerTitle: () => null,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                marginRight: 10,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  marginLeft: 70,
                  flex: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user?.name}
              </Text>
              <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" size={32} color="gray" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="pets/index"
          options={{
            title: 'Pets',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="paw" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tutors/index"
          options={{
            title: 'Tutores',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="shield-account"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="species/index"
          options={{
            title: 'Espécies',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={28} name="dog" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="breeds/index"
          options={{
            title: 'Raças',
            tabBarIcon: ({ color }) => (
              <Foundation size={28} name="guide-dog" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home/form"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="home/details"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="pets/form"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="tutors/form"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="species/form"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="breeds/form"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;
