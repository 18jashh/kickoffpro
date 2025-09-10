import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Calendar, DollarSign, Users, Trophy, Upload, FileText, MessageSquare, Bell, Castle as Whistle, Award, Building2, Phone, Mail, Link, QrCode } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const TOURNAMENT_TYPES = ['Knockout', 'League', 'Round-robin'];
const SPORT_TYPES = ['Football', 'Cricket', 'Basketball', 'Volleyball'];
const GAME_LEVELS = ['Beginner', 'Intermediate', 'Expert'];
const AGE_GROUPS = ['U12', 'U16', 'U19', 'Open', '30+'];
const GENDER_CATEGORIES = ['Men', 'Women', 'Mixed'];
const VENUE_TYPES = ['Indoor', 'Outdoor'];

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function EditTournament() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    organizerName: 'Jane Smith',
    phone: '',
    email: '',
    bannerUrl: '',
    venue: '',
    venueType: 'Indoor',
    googleMapsLink: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    registrationDeadline: null as Date | null,
    tournamentType: 'Knockout',
    sportType: 'Football',
    maxTeams: '',
    minPlayersPerTeam: '',
    maxPlayersPerTeam: '',
    gameLevel: 'Beginner',
    ageGroup: 'Open',
    genderCategory: 'Mixed',
    prizePool: '',
    runnerUpPrize: '',
    entryFee: '',
    qrCodeUrl: '',
    rules: '',
    refereeInfo: '',
    sponsorshipAvailable: false,
    liveUpdates: false,
    teamChat: false,
    status: 'Open',
    registeredTeams: 0,
    teams: [],
  });

  const [showDatePicker, setShowDatePicker] = useState({
    show: false,
    field: '' as 'startDate' | 'endDate' | 'registrationDeadline',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tournament = JSON.parse(localStorage.getItem('editTournament') || '{}');
      if (tournament.id) {
        setFormData({
          ...tournament,
          startDate: tournament.startDate ? new Date(tournament.startDate) : null,
          endDate: tournament.endDate ? new Date(tournament.endDate) : null,
          registrationDeadline: tournament.registrationDeadline ? new Date(tournament.registrationDeadline) : null,
        });
      }
    }
  }, []);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || formData[showDatePicker.field];
    setShowDatePicker({ ...showDatePicker, show: false });
    if (currentDate) {
      setFormData({ ...formData, [showDatePicker.field]: currentDate });
    }
  };

  const pickImage = async (type: 'banner' | 'qrCode') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'banner' ? [16, 9] : [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      if (type === 'banner') {
        setFormData({ ...formData, bannerUrl: result.assets[0].uri });
      } else {
        setFormData({ ...formData, qrCodeUrl: result.assets[0].uri });
      }
    }
  };

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      const tournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
      const updatedTournaments = tournaments.map(t => 
        t.id === formData.id ? {
          ...formData,
          startDate: formData.startDate ? formatDate(formData.startDate) : '',
          endDate: formData.endDate ? formatDate(formData.endDate) : '',
          registrationDeadline: formData.registrationDeadline ? formatDate(formData.registrationDeadline) : '',
        } : t
      );
      localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));
      localStorage.removeItem('editTournament');
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a237e', '#000000']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <Animated.View 
        entering={FadeInDown.duration(1000)}
        style={styles.formContainer}
      >
        <Text style={styles.title}>Edit Tournament</Text>

        {/* Basic Tournament Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tournament Name</Text>
            <View style={styles.inputWrapper}>
              <Trophy size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter tournament name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Phone</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Enter contact phone"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Email</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter contact email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <Pressable style={styles.uploadButton} onPress={() => pickImage('banner')}>
            <Upload size={24} color="#FFFFFF" />
            <Text style={styles.uploadButtonText}>
              {formData.bannerUrl ? 'Change Tournament Banner' : 'Upload Tournament Banner'}
            </Text>
          </Pressable>

          {formData.bannerUrl && (
            <Image
              source={{ uri: formData.bannerUrl }}
              style={styles.bannerPreview}
            />
          )}
        </View>

        {/* Venue Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Venue Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Venue Name</Text>
            <View style={styles.inputWrapper}>
              <Building2 size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.venue}
                onChangeText={(text) => setFormData({ ...formData, venue: text })}
                placeholder="Enter venue name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Google Maps Link</Text>
            <View style={styles.inputWrapper}>
              <Link size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.googleMapsLink}
                onChangeText={(text) => setFormData({ ...formData, googleMapsLink: text })}
                placeholder="Enter Google Maps link"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.optionsContainer}>
            {VENUE_TYPES.map((type) => (
              <Pressable
                key={type}
                style={[
                  styles.optionButton,
                  formData.venueType === type && styles.optionButtonActive
                ]}
                onPress={() => setFormData({ ...formData, venueType: type })}
              >
                <Text style={[
                  styles.optionButtonText,
                  formData.venueType === type && styles.optionButtonTextActive
                ]}>
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Event Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tournament Type</Text>
            <View style={styles.optionsContainer}>
              {TOURNAMENT_TYPES.map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.optionButton,
                    formData.tournamentType === type && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, tournamentType: type })}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.tournamentType === type && styles.optionButtonTextActive
                  ]}>
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sport Type</Text>
            <View style={styles.optionsContainer}>
              {SPORT_TYPES.map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.optionButton,
                    formData.sportType === type && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, sportType: type })}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.sportType === type && styles.optionButtonTextActive
                  ]}>
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Maximum Teams</Text>
            <View style={styles.inputWrapper}>
              <Users size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.maxTeams}
                onChangeText={(text) => setFormData({ ...formData, maxTeams: text })}
                placeholder="Enter maximum teams"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Players per Team</Text>
            <View style={styles.row}>
              <View style={[styles.inputWrapper, { flex: 1 }]}>
                <Users size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  value={formData.minPlayersPerTeam}
                  onChangeText={(text) => setFormData({ ...formData, minPlayersPerTeam: text })}
                  placeholder="Min"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Users size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  value={formData.maxPlayersPerTeam}
                  onChangeText={(text) => setFormData({ ...formData, maxPlayersPerTeam: text })}
                  placeholder="Max"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Important Dates</Text>
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker({ show: true, field: 'startDate' })}
            >
              <Calendar size={20} color="#9CA3AF" />
              <Text style={styles.dateButtonText}>
                {formData.startDate ? formatDate(formData.startDate) : 'Select Start Date'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker({ show: true, field: 'endDate' })}
            >
              <Calendar size={20} color="#9CA3AF" />
              <Text style={styles.dateButtonText}>
                {formData.endDate ? formatDate(formData.endDate) : 'Select End Date'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker({ show: true, field: 'registrationDeadline' })}
            >
              <Calendar size={20} color="#9CA3AF" />
              <Text style={styles.dateButtonText}>
                {formData.registrationDeadline ? formatDate(formData.registrationDeadline) : 'Select Registration Deadline'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Player Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Player Requirements</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Skill Level</Text>
            <View style={styles.optionsContainer}>
              {GAME_LEVELS.map((level) => (
                <Pressable
                  key={level}
                  style={[
                    styles.optionButton,
                    formData.gameLevel === level && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, gameLevel: level })}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.gameLevel === level && styles.optionButtonTextActive
                  ]}>
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age Group</Text>
            <View style={styles.optionsContainer}>
              {AGE_GROUPS.map((age) => (
                <Pressable
                  key={age}
                  style={[
                    styles.optionButton,
                    formData.ageGroup === age && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, ageGroup: age })}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.ageGroup === age && styles.optionButtonTextActive
                  ]}>
                    {age}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender Category</Text>
            <View style={styles.optionsContainer}>
              {GENDER_CATEGORIES.map((gender) => (
                <Pressable
                  key={gender}
                  style={[
                    styles.optionButton,
                    formData.genderCategory === gender && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, genderCategory: gender })}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.genderCategory === gender && styles.optionButtonTextActive
                  ]}>
                    {gender}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Prize & Entry Fee */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prize & Entry Fee</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Winner Prize Pool</Text>
            <View style={styles.inputWrapper}>
              <DollarSign size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.prizePool}
                onChangeText={(text) => setFormData({ ...formData, prizePool: text })}
                placeholder="Enter prize pool amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Runner-up Prize</Text>
            <View style={styles.inputWrapper}>
              <DollarSign size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.runnerUpPrize}
                onChangeText={(text) => setFormData({ ...formData, runnerUpPrize: text })}
                placeholder="Enter runner-up prize"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Entry Fee per Team</Text>
            <View style={styles.inputWrapper}>
              <DollarSign size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                value={formData.entryFee}
                onChangeText={(text) => setFormData({ ...formData, entryFee: text })}
                placeholder="Enter entry fee"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          <Pressable style={styles.uploadButton} onPress={() => pickImage('qrCode')}>
            <QrCode size={24} color="#FFFFFF" />
            <Text style={styles.uploadButtonText}>
              {formData.qrCodeUrl ? 'Change Payment QR Code' : 'Upload Payment QR Code'}
            </Text>
          </Pressable>

          {formData.qrCodeUrl && (
            <Image
              source={{ uri: formData.qrCodeUrl }}
              style={styles.qrCodePreview}
            />
          )}
        </View>

        {/* Additional Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Features</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tournament Rules</Text>
            <View style={styles.inputWrapper}>
              <FileText size={20} color="#9CA3AF" />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.rules}
                onChangeText={(text) => setFormData({ ...formData, rules: text })}
                placeholder="Enter tournament rules"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Referee Information</Text>
            <View style={styles.inputWrapper}>
              <Whistle size={20} color="#9CA3AF" />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.refereeInfo}
                onChangeText={(text) => setFormData({ ...formData, refereeInfo: text })}
                placeholder="Enter referee details"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.toggleGroup}>
            <Pressable
              style={styles.toggleButton}
              onPress={() => setFormData({ ...formData, sponsorshipAvailable: !formData.sponsorshipAvailable })}
            >
              <Award size={20} color={formData.sponsorshipAvailable ? '#F59E0B' : '#9CA3AF'} />
              <Text style={[
                styles.toggleButtonText,
                formData.sponsorshipAvailable && styles.toggleButtonTextActive
              ]}>
                Sponsorship Available
              </Text>
            </Pressable>

            <Pressable
              style={styles.toggleButton}
              onPress={() => setFormData({ ...formData, liveUpdates: !formData.liveUpdates })}
            >
              <Bell size={20} color={formData.liveUpdates ? '#F59E0B' : '#9CA3AF'} />
              <Text style={[
                styles.toggleButtonText,
                formData.liveUpdates && styles.toggleButtonTextActive
              ]}>
                Live Match Updates
              </Text>
            </Pressable>

            <Pressable
              style={styles.toggleButton}
              onPress={() => setFormData({ ...formData, teamChat: !formData.teamChat })}
            >
              <MessageSquare size={20} color={formData.teamChat ? '#F59E0B' : '#9CA3AF'} />
              <Text style={[
                styles.toggleButtonText,
                formData.teamChat && styles.toggleButtonTextActive
              ]}>
                Team Chat
              </Text>
            </Pressable>
          </View>
        </View>

        <Animated.View entering={FadeInDown.duration(1000)}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>

      {showDatePicker.show && Platform.OS !== 'web' && (
        <DateTimePicker
          value={formData[showDatePicker.field] || new Date()}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionButtonActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  optionButtonText: {
    color: '#E5E7EB',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C1D95',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  bannerPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 16,
  },
  qrCodePreview: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 12,
  },
  toggleGroup: {
    gap: 12,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  toggleButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  toggleButtonTextActive: {
    color: '#F59E0B',
    fontFamily: 'Inter-Bold',
  },
  saveButton: {
    backgroundColor: '#F59E0B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});