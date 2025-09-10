import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Trophy, Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2',
  'https://images.unsplash.com/photo-1577412647305-991150c7d163',
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d',
];

export default function OrganizerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (isLogin) {
      // Store organizer data
      if (typeof window !== 'undefined') {
        localStorage.setItem('organizer', JSON.stringify({
          email: formData.email,
          name: formData.name,
        }));
      }
      router.push('/(organizer)/(tabs)');
    } else {
      // Handle signup
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Store organizer data
      if (typeof window !== 'undefined') {
        localStorage.setItem('organizer', JSON.stringify({
          email: formData.email,
          name: formData.name,
        }));
      }
      router.push('/(organizer)/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ 
          uri: `${BACKGROUND_IMAGES[currentImageIndex]}?q=80&w=3540&auto=format&fit=crop` 
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View 
          entering={FadeIn.delay(500)}
          style={styles.content}
        >
          <Trophy size={80} color="#F59E0B" />
          <Text style={styles.title}>Tournament Organizer</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </Text>

          <Animated.View 
            entering={FadeInDown.delay(1000)}
            style={styles.form}
          >
            {!isLogin && (
              <View style={styles.inputContainer}>
                <User size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Mail size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Lock size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                />
              </View>
            )}

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Text>
            </Pressable>

            <Pressable 
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchButtonText}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </Text>
            </Pressable>

            <Pressable 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#FFFFFF" />
              <Text style={styles.backButtonText}>Back to Home</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginTop: 12,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  inputContainer: {
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
  button: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  switchButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  switchButtonText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});