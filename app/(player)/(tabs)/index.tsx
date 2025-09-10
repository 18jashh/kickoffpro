import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { MapPin, Calendar, DollarSign, Users, Trophy } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PlayerTournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadTournaments = () => {
        const storedTournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        setTournaments(storedTournaments.filter(t => t.status === 'Open'));
      };

      loadTournaments();
      window.addEventListener('storage', loadTournaments);
      return () => window.removeEventListener('storage', loadTournaments);
    }
  }, []);

  const handleRegister = (tournament) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTournament', JSON.stringify(tournament));
      router.push('/(player)/(tabs)/teams');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tournamentList}>
        {tournaments.map((tournament) => (
          <Pressable 
            key={tournament.id} 
            style={styles.tournamentCard}
            onPress={() => handleRegister(tournament)}
          >
            {tournament.bannerUrl && (
              <Image source={{ uri: tournament.bannerUrl }} style={styles.tournamentImage} />
            )}
            <View style={styles.tournamentInfo}>
              <Text style={styles.tournamentName}>{tournament.name}</Text>
              
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
                
                <View style={styles.prizeInfo}>
                  <View style={styles.detail}>
                    <DollarSign size={16} color="#6B7280" />
                    <Text style={styles.detailText}>Entry: ₹{tournament.entryFee}</Text>
                  </View>
                  <Text style={styles.prizePool}>Prize: ₹{tournament.prizePool}</Text>
                </View>
              </View>

              <View style={styles.deadlineContainer}>
                <Text style={styles.deadline}>
                  Registration Deadline: {tournament.registrationDeadline}
                </Text>
              </View>

              <Pressable 
                style={styles.registerButton}
                onPress={() => handleRegister(tournament)}
              >
                <Text style={styles.registerButtonText}>Register Now</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}

        {tournaments.length === 0 && (
          <View style={styles.emptyState}>
            <Trophy size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No Open Tournaments</Text>
            <Text style={styles.emptyStateText}>
              Check back later for new tournaments
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
    backgroundColor: '#F9FAFB',
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
  tournamentName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 8,
    marginBottom: 16,
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
  prizeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  prizePool: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#059669',
  },
  deadlineContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginBottom: 12,
  },
  deadline: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  registerButton: {
    backgroundColor: '#1E3A8A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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