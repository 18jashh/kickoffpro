import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { Users, UserPlus, Trophy, MessageSquare } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function Teams() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [myTeams, setMyTeams] = useState([]);
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    phoneNumber: '',
    email: '',
    players: [
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' }, // Starting 11
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' },
      { name: '', position: '', number: '', age: '' }, // 5 substitutes
    ]
  });

  const POSITIONS = [
    'Goalkeeper',
    'Right Back',
    'Center Back',
    'Left Back',
    'Defensive Midfielder',
    'Central Midfielder',
    'Attacking Midfielder',
    'Right Winger',
    'Left Winger',
    'Striker'
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load selected tournament
      const tournament = JSON.parse(localStorage.getItem('selectedTournament') || 'null');
      setSelectedTournament(tournament);

      // Load my teams
      const storedTeams = JSON.parse(localStorage.getItem('myTeams') || '[]');
      setMyTeams(storedTeams);
    }
  }, []);

  const handleRegister = () => {
    if (typeof window !== 'undefined' && selectedTournament) {
      const newTeam = {
        id: Date.now().toString(),
        name: formData.teamName,
        captain: formData.captainName,
        phone: formData.phoneNumber,
        email: formData.email,
        players: formData.players.filter(p => p.name !== ''),
        paymentStatus: 'Pending',
        tournamentId: selectedTournament.id,
        tournamentName: selectedTournament.name
      };

      // Update tournament teams
      const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
      const updatedTournaments = tournaments.map(t => {
        if (t.id === selectedTournament.id) {
          return {
            ...t,
            teams: [...(t.teams || []), newTeam],
            registeredTeams: (t.registeredTeams || 0) + 1
          };
        }
        return t;
      });
      localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));

      // Update my teams
      const myTeams = JSON.parse(localStorage.getItem('myTeams') || '[]');
      localStorage.setItem('myTeams', JSON.stringify([...myTeams, newTeam]));
      setMyTeams([...myTeams, newTeam]);

      // Clear form and selected tournament
      setFormData({
        teamName: '',
        captainName: '',
        phoneNumber: '',
        email: '',
        players: formData.players.map(() => ({ name: '', position: '', number: '', age: '' }))
      });
      localStorage.removeItem('selectedTournament');
      setSelectedTournament(null);
      setShowForm(false);
    }
  };

  const openTeamChat = (team) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentTeam', JSON.stringify(team));
      router.push('/(player)/(tabs)/team-chat');
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

      {selectedTournament && !showForm && (
        <View style={styles.selectedTournament}>
          <Text style={styles.selectedTournamentTitle}>Selected Tournament</Text>
          <Text style={styles.selectedTournamentName}>{selectedTournament.name}</Text>
          <Pressable 
            style={styles.createTeamButton}
            onPress={() => setShowForm(true)}
          >
            <UserPlus size={24} color="#FFFFFF" />
            <Text style={styles.createTeamButtonText}>Create Team</Text>
          </Pressable>
        </View>
      )}

      {showForm ? (
        <Animated.View 
          entering={FadeInDown}
          style={styles.formContainer}
        >
          <Text style={styles.formTitle}>Team Registration</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Team Name</Text>
            <TextInput
              style={styles.input}
              value={formData.teamName}
              onChangeText={(text) => setFormData({ ...formData, teamName: text })}
              placeholder="Enter team name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Captain Name</Text>
            <TextInput
              style={styles.input}
              value={formData.captainName}
              onChangeText={(text) => setFormData({ ...formData, captainName: text })}
              placeholder="Enter captain name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Players (Minimum 11)</Text>
            {formData.players.map((player, index) => (
              <View key={index} style={styles.playerInputGroup}>
                <Text style={styles.playerNumber}>#{index + 1}</Text>
                <TextInput
                  style={styles.input}
                  value={player.name}
                  onChangeText={(text) => {
                    const newPlayers = [...formData.players];
                    newPlayers[index].name = text;
                    setFormData({ ...formData, players: newPlayers });
                  }}
                  placeholder="Player Name"
                  placeholderTextColor="#9CA3AF"
                />
                <View style={styles.playerDetails}>
                  <TextInput
                    style={[styles.input, styles.numberInput]}
                    value={player.number}
                    onChangeText={(text) => {
                      const newPlayers = [...formData.players];
                      newPlayers[index].number = text;
                      setFormData({ ...formData, players: newPlayers });
                    }}
                    placeholder="No."
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={[styles.input, styles.ageInput]}
                    value={player.age}
                    onChangeText={(text) => {
                      const newPlayers = [...formData.players];
                      newPlayers[index].age = text;
                      setFormData({ ...formData, players: newPlayers });
                    }}
                    placeholder="Age"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <View style={styles.positionPicker}>
                    <Picker
                      selectedValue={player.position}
                      onValueChange={(itemValue) => {
                        const newPlayers = [...formData.players];
                        newPlayers[index].position = itemValue;
                        setFormData({ ...formData, players: newPlayers });
                      }}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select Position" value="" />
                      {POSITIONS.map((pos) => (
                        <Picker.Item key={pos} label={pos} value={pos} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.buttonGroup}>
            <Pressable 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable 
              style={[styles.button, styles.registerButton]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Register Team</Text>
            </Pressable>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.teamsList}>
          <Text style={styles.teamsListTitle}>My Teams</Text>
          {myTeams.map((team, index) => (
            <Animated.View 
              key={team.id}
              entering={FadeInDown.delay(index * 100)}
              style={styles.teamCard}
            >
              <View style={styles.teamHeader}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Pressable
                  style={styles.chatButton}
                  onPress={() => openTeamChat(team)}
                >
                  <MessageSquare size={20} color="#1E3A8A" />
                </Pressable>
              </View>
              
              <Text style={styles.tournamentName}>
                Tournament: {team.tournamentName}
              </Text>
              
              <View style={styles.teamDetails}>
                <Text style={styles.detailText}>Captain: {team.captain}</Text>
                <Text style={styles.detailText}>Players: {team.players.length}</Text>
                <Text style={styles.detailText}>Status: {team.paymentStatus}</Text>
              </View>
            </Animated.View>
          ))}

          {myTeams.length === 0 && !selectedTournament && (
            <View style={styles.emptyState}>
              <Users size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateTitle}>No Teams Yet</Text>
              <Text style={styles.emptyStateText}>
                Join a tournament to create your team
              </Text>
            </View>
          )}
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
  selectedTournament: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedTournamentTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  selectedTournamentName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  createTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createTeamButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  formContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  formTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  playerInputGroup: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  playerNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  playerDetails: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  numberInput: {
    width: 60,
    textAlign: 'center',
  },
  ageInput: {
    width: 60,
    textAlign: 'center',
  },
  positionPicker: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: '#FFFFFF',
    height: 40,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#374151',
  },
  registerButton: {
    backgroundColor: '#1E3A8A',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  teamsList: {
    padding: 16,
  },
  teamsListTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  teamCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  tournamentName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  chatButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  teamDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
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