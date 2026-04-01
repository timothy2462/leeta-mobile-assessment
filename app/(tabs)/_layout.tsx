import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.brand.DEFAULT,
        tabBarInactiveTintColor: Colors.neutral[500],
        tabBarStyle: [
          tw`bg-white border-t border-neutral-200 px-6 pt-2 shadow-lg`,
          {
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom + 5,
            alignSelf: 'center',
            width: '100%',
            maxWidth: 600,
          },
        ],
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: -2,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={'receipt'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={'stats-chart'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bag-personal"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
