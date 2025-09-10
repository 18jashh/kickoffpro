import { Tabs } from 'expo-router';
import { Trophy, Users, Activity, Settings, Newspaper, CircleUser as UserCircle } from 'lucide-react-native';

export default function PlayerTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarActiveTintColor: '#1E3A8A',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tournaments',
          headerTitle: 'Available Tournaments',
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'My Teams',
          headerTitle: 'My Teams',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="team-chat"
        options={{
          title: 'Team Chat',
          headerTitle: 'Team Chat',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          title: 'Performance',
          headerTitle: 'Performance Analysis',
          tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          headerTitle: 'Sports News',
          tabBarIcon: ({ color, size }) => <Newspaper size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}