import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { User, Mail, Phone, MapPin, Calendar, Trophy, FileEdit as Edit2, Building2, LogOut } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function OrganizerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sports Organization',
    organizerName: 'Jane Smith',
    email: 'contact@sportsorg.com',
    phone: '+1 234 567 8900',
    location: 'Los Angeles, USA',
    dateJoined: 'December 2023',
    totalTournaments: 25,
    activeTournaments: 3,
    completedTournaments: 22,
    recentTournaments: [
      {
        name: 'Summer Championship 2024',
        date: 'Mar 15 - Apr 20, 2024',
        status: 'Active'
      },
      {
        name: 'Spring League 2024',
        date: 'Feb 1 - Mar 10, 2024',
        status: 'Completed'
      },
      {
        name: 'Winter Cup 2023',
        date: 'Dec 10 - Jan 15, 2024',
        status: 'Completed'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
  };

  const handleLogout = () => {
    // Clear any stored data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('organizer');
    }
    // Navigate to home screen
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=3540&auto=format&fit=crop' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      />
      <View style={styles.overlay} />

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=3474&auto=format&fit=crop' }}
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
        <Text style={styles.organizationName}>{profile.name}</Text>
      </View>

      <Animated.View 
        entering={FadeInDown}
        style={styles.content}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.totalTournaments}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.activeTournaments}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.completedTournaments}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Building2 size={20} color="#E5E7EB" />
            <Text style={styles.sectionTitle}>Organization Details</Text>
          </View>
          
          {isEditing ? (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Organization Name"
                placeholderTextColor="#9CA3AF"
              />
              <TextInput
                style={styles.input}
                value={profile.organizerName}
                onChangeText={(text) => setProfile({ ...profile, organizerName: text })}
                placeholder="Organizer Name"
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
                <Text style={styles.detailText}>Organizer: {profile.organizerName}</Text>
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
                <Text style={styles.detailText}>Member since {profile.dateJoined}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={20} color="#E5E7EB" />
            <Text style={styles.sectionTitle}>Recent Tournaments</Text>
          </View>
          <View style={styles.tournaments}>
            {profile.recentTournaments.map((tournament, index) => (
              <View key={index} style={styles.tournament}>
                <View>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <Text style={styles.tournamentDate}>{tournament.date}</Text>
                </View>
                <Text style={[
                  styles.tournamentStatus,
                  { color: tournament.status === 'Active' ? '#059669' : '#9CA3AF' }
                ]}>
                  {tournament.status}
                </Text>
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
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#F59E0B',
  },
  organizationName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F59E0B',
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
    backgroundColor: '#F59E0B',
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
  tournaments: {
    gap: 12,
  },
  tournament: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  tournamentName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  tournamentDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  tournamentStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
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