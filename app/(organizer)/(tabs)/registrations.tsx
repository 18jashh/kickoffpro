import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Users, MapPin, Calendar, Trophy, Check, X, MessageSquare } from 'lucide-react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

export default function Registrations() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadTournaments = () => {
        const storedTournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
        setTournaments(storedTournaments.filter(t => t.teams && t.teams.length > 0));
      };

      loadTournaments();
      window.addEventListener('storage', loadTournaments);
      return () => window.removeEventListener('storage', loadTournaments);
    }
  }, []);

  const handleApproval = (tournamentId, teamId, status) => {
    if (typeof window !== 'undefined') {
      const updatedTournaments = tournaments.map(tournament => {
        if (tournament.id === tournamentId) {
          return {
            ...tournament,
            teams: tournament.teams.map(team => 
              team.id === teamId 
                ? { ...team, registrationStatus: status }
                : team
            )
          };
        }
        return tournament;
      });

      localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));
      setTournaments(updatedTournaments);

      // Update the team's status in myTeams storage as well
      const myTeams = JSON.parse(localStorage.getItem('myTeams') || '[]');
      const updatedMyTeams = myTeams.map(team => 
        team.id === teamId 
          ? { ...team, registrationStatus: status }
          : team
      );
      localStorage.setItem('myTeams', JSON.stringify(updatedMyTeams));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=3540&auto=format&fit=crop' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      />
      <View style={styles.overlay} />
      
      {tournaments.map((tournament, index) => (
        <Animated.View 
          key={tournament.id}
          entering={FadeInUp.delay(index * 200)}
          style={styles.tournamentCard}
        >
          <Text style={styles.tournamentName}>{tournament.name}</Text>
          
          {tournament.teams.map((team) => (
            <Animated.View 
              key={team.id}
              style={[
                styles.teamCard,
                team.registrationStatus === 'approved' && styles.approvedCard,
                team.registrationStatus === 'denied' && styles.deniedCard
              ]}
              entering={FadeInUp}
              exiting={FadeOutDown}
            >
              <View style={styles.teamHeader}>
                <Text style={styles.teamName}>{team.name}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    {team.registrationStatus || 'Pending'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.teamDetails}>
                <Text style={styles.detailText}>Captain: {team.captain}</Text>
                <Text style={styles.detailText}>Players: {team.players.length}</Text>
                <Text style={styles.detailText}>Contact: {team.phone}</Text>
                <Text style={styles.detailText}>Email: {team.email}</Text>
              </View>

              {!team.registrationStatus && (
                <View style={styles.actionButtons}>
                  <Pressable
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleApproval(tournament.id, team.id, 'approved')}
                  >
                    <Check size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.actionButton, styles.denyButton]}
                    onPress={() => handleApproval(tournament.id, team.id, 'denied')}
                  >
                    <X size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Deny</Text>
                  </Pressable>
                </View>
              )}
            </Animated.View>
          ))}
        </Animated.View>
      ))}

      {tournaments.length === 0 && (
        <View style={styles.emptyState}>
          <Users size={48} color="#9CA3AF" />
          <Text style={styles.emptyStateTitle}>No Team Registrations</Text>
          <Text style={styles.emptyStateText}>
            Teams will appear here once they register for your tournaments
          </Text>
        </View>
      )}
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
  tournamentCard: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tournamentName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  teamCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  approvedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  deniedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  teamDetails: {
    gap: 4,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#059669',
  },
  denyButton: {
    backgroundColor: '#DC2626',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    margin: 16,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
  },
});