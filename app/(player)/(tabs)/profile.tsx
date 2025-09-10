import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { User, Mail, Phone, MapPin, Calendar, Medal, FileEdit as Edit2, LogOut } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function PlayerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    dateJoined: 'January 2024',
    tournaments: 12,
    wins: 5,
    achievements: [
      'Tournament MVP 2023',
      'Best Player Award',
      'Championship Winner'
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
  };

  const handleLogout = () => {
    // Clear any stored data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('player');
    }
    // Navigate to home screen
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3535&auto=format&fit=crop' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      />
      <View style={styles.overlay} />

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=3387&auto=format&fit=crop' }}
            style={styles.avatar}
          />
          {!isEditing && (
            <Pressable 
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Edit2 size={20} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>

      <Animated.View 
        entering={FadeInDown}
        style={styles.content}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.tournaments}</Text>
            <Text style={styles.statLabel}>Tournaments</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.wins}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {((profile.wins / profile.tournaments) * 100).toFixed(0)}%
            </Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#E5E7EB" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>
          
          {isEditing ? (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Name"
                placeholderTextColor="#9CA3AF"
              />
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
                placeholder="Phone"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                value={profile.location}
                onChangeText={(text) => setProfile({ ...profile, location: text })}
                placeholder="Location"
                placeholderTextColor="#9CA3AF"
              />
              
              <Pressable 
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <User size={16} color="#9CA3AF" />
                <Text style={styles.detailText}>{profile.name}</Text>
              </View>
              <View style={styles.detailItem}>
                <Mail size={16} color="#9CA3AF" />
                <Text style={styles.detailText}>{profile.email}</Text>
              </View>
              <View style={styles.detailItem}>
                <Phone size={16} color="#9CA3AF" />
                <Text style={styles.detailText}>{profile.phone}</Text>
              </View>
              <View style={styles.detailItem}>
                <MapPin size={16} color="#9CA3AF" />
                <Text style={styles.detailText}>{profile.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Calendar size={16} color="#9CA3AF" />
                <Text style={styles.detailText}>Joined {profile.dateJoined}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Medal size={20} color="#E5E7EB" />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          <View style={styles.achievements}>
            {profile.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievement}>
                <Medal size={16} color="#1E3A8A" />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1E3A8A',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E3A8A',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  details: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  saveButton: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  achievements: {
    gap: 12,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  achievementText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});