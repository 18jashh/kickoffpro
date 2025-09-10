import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { Users, MapPin, Calendar, Trophy, CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function OrganizerTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if organizer is logged in
      const organizerData = JSON.parse(localStorage.getItem('organizer') || 'null');
      if (!organizerData) {
        router.replace('/(auth)/organizer');
        return;
      }
      setOrganizer(organizerData);

      const loadTournaments = () => {
        const storedTournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        setTournaments(storedTournaments);
      };

      loadTournaments();
      window.addEventListener('storage', loadTournaments);
      return () => window.removeEventListener('storage', loadTournaments);
    }
  }, []);

  const handleEdit = (tournament) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('editTournament', JSON.stringify(tournament));
      router.push('/(organizer)/(tabs)/edit');
    }
  };

  const handleDelete = (tournamentId) => {
    Alert.alert(
      "Delete Tournament",
      "Are you sure you want to delete this tournament?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (typeof window !== 'undefined') {
              const updatedTournaments = tournaments.filter(t => t.id !== tournamentId);
              localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));
              setTournaments(updatedTournaments);
            }
          }
        }
      ]
    );
  };

  if (!organizer) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      />
      <View style={styles.overlay} />
      
      <View style={styles.tournamentList}>
        {tournaments.map((tournament, index) => (
          <Animated.View 
            key={tournament.id} 
            entering={FadeInUp.delay(index * 200).springify()}
          >
            <View style={styles.tournamentCard}>
              {tournament.bannerUrl && (
                <Image source={{ uri: tournament.bannerUrl }} style={styles.tournamentImage} />
              )}
              <View style={styles.tournamentInfo}>
                <View style={styles.header}>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <View style={styles.actions}>
                    <Pressable 
                      style={styles.actionButton}
                      onPress={() => handleEdit(tournament)}
                    >
                      <Edit2 size={20} color="#1E3A8A" />
                    </Pressable>
                    <Pressable 
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDelete(tournament.id)}
                    >
                      <Trash2 size={20} color="#FFFFFF" />
                    </Pressable>
                  </View>
                </View>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.detail}>
                    <MapPin size={16} color="#6B7280" />
                    <Text style={styles.detailText}>{tournament.venue}</Text>
                  </View>
                  
                  <View style={styles.detail}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.detailText}>
                      {tournament.startDate} - {tournament.endDate}
                    </Text>
                  </View>
                  
                  <View style={styles.detail}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.detailText}>
                      {tournament.registeredTeams || 0} / {tournament.maxTeams} Teams
                    </Text>
                  </View>

                  <View style={styles.detail}>
                    <Trophy size={16} color="#6B7280" />
                    <Text style={styles.detailText}>
                      Prize Pool: ₹{tournament.prizePool}
                    </Text>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  <Text style={[
                    styles.status,
                    { color: tournament.status === 'Open' ? '#059669' : '#DC2626' }
                  ]}>
                    {tournament.status}
                  </Text>
                  <Text style={styles.deadline}>
                    Registration Deadline: {tournament.registrationDeadline}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        ))}

        {tournaments.length === 0 && (
          <View style={styles.emptyState}>
            <Trophy size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No Tournaments Yet</Text>
            <Text style={styles.emptyStateText}>
              Create your first tournament to get started
            </Text>
          </View>
        )}
      </View>
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
  tournamentList: {
    padding: 16,
    gap: 16,
  },
  tournamentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tournamentImage: {
    width: '100%',
    height: 160,
  },
  tournamentInfo: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
  },
  tournamentName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  detailsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  status: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  deadline: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    marginTop: 40,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});