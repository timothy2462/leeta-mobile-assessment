import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/lib/design-system';

import tw from '@/lib/tailwind';
import { useAuth } from '@/shared/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSection } from '@/components/profile/ProfileSection';
import { ProfileMenuItem } from '@/components/profile/ProfileMenuItem';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { AuthButton } from '@/components/auth/AuthButton';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    setLogoutVisible(true);
  };

  const confirmLogout = () => {
    setLogoutVisible(false);
    logout();
  };

  return (
    <SafeAreaView style={[tw`flex-1 bg-neutral-100`, { alignSelf: 'center', width: '100%', maxWidth: 600 }]} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tw`px-5 pt-8 pb-10`}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        <ProfileSection title="Business & Documents">
          <ProfileMenuItem 
            label="Business Profile" 
            icon="business" 
          />
          <ProfileMenuItem 
            label="Document Verification" 
            icon="document-text" 
          />
          <ProfileMenuItem 
            label="Payout Bank Account" 
            icon="wallet" 
            isLast 
          />
        </ProfileSection>

        <ProfileSection title="Preferences & Security">
          <ProfileMenuItem 
            label="Order Notifications" 
            icon="notifications" 
            showSwitch 
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />
          <ProfileMenuItem 
            label="Availability Mode" 
            icon="time" 
            showSwitch
            switchValue={onlineStatus}
            onSwitchChange={setOnlineStatus}
          />
          <ProfileMenuItem 
            label="Security & Password" 
            icon="shield-checkmark" 
          />
          <ProfileMenuItem 
            label="Vehicle Information" 
            icon="car-sport" 
            isLast 
          />
        </ProfileSection>

        <ProfileSection title="Support & Legal">
          <ProfileMenuItem 
            label="Help Center & FAQs" 
            icon="help-circle" 
          />
          <ProfileMenuItem 
            label="Contact Support" 
            icon="chatbubbles" 
          />
          <ProfileMenuItem 
            label="Terms of Service" 
            icon="reader" 
          />
          <ProfileMenuItem 
            label="Privacy Policy" 
            icon="lock-closed" 
            isLast 
          />
        </ProfileSection>

        <ProfileSection title="Account Actions">
          <ProfileMenuItem 
            label="Log Out" 
            icon="log-out" 
            onPress={handleLogout}
          />
          <ProfileMenuItem 
            label="Delete Account" 
            icon="trash" 
            destructive 
            isLast 
          />
        </ProfileSection>
      </ScrollView>

      <BottomSheet 
        visible={logoutVisible} 
        onClose={() => setLogoutVisible(false)}
      >
        <View style={tw`items-center mb-6`}>
          <View style={tw`w-16 h-16 bg-error/10 rounded-full items-center justify-center mb-4`}>
            <Ionicons name="log-out" size={32} color={Colors.error.DEFAULT} />
          </View>
          <Text style={tw`text-xl font-bold text-neutral-900 mb-2`}>Log Out</Text>
          <Text style={tw`text-base text-neutral-500 text-center px-4`}>
            Are you sure you want to log out? You'll need to sign in again to access your orders.
          </Text>
        </View>

        <View style={tw`gap-3`}>
          <AuthButton 
            title="Log Out" 
            onPress={confirmLogout}
            style={tw`bg-error`}
          />
          <AuthButton 
            title="Cancel" 
            variant="outline"
            onPress={() => setLogoutVisible(false)}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
