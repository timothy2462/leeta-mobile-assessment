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
        tabBarShowLabel: false,
        tabBarStyle: [
          tw`bg-white border-t border-neutral-200 flex-row items-center justify-between px-6 pt-3 shadow-lg`,
          {
            height: 65 + insets.bottom,
            paddingBottom: insets.bottom + 5,
          },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                tw`flex-row items-center justify-center rounded-full px-4 py-2`,
                focused ? tw`bg-[#FFF0E6]` : null, // light brand background
              ]}
            >
              <Ionicons
                name={focused ? 'receipt' : 'receipt-outline'}
                size={22}
                color={Colors.neutral[900]}
              />
              {focused && (
                <Text style={tw`ml-2 text-sm font-semibold text-neutral-900`}>
                  Orders
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center p-2`}>
              <Ionicons
                name={focused ? 'stats-chart' : 'stats-chart-outline'}
                size={24}
                color={focused ? Colors.neutral[900] : Colors.neutral[500]}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tw`items-center justify-center p-2`}>
              {/* Using a bag/package icon colored brand orange as shown in the design */}
              <MaterialCommunityIcons
                name="bag-personal"
                size={26}
                color={Colors.brand.DEFAULT}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
