import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import tw from '@/lib/tailwind';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSection } from '@/components/profile/ProfileSection';
import { ProfileMenuItem } from '@/components/profile/ProfileMenuItem';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

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
          />
          <ProfileMenuItem 
            label="Delete Account" 
            icon="trash" 
            destructive 
            isLast 
          />
        </ProfileSection>
      </ScrollView>
    </SafeAreaView>
  );
}
