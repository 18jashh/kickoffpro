import { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  FadeIn,
  FadeInDown,
  FadeInUp 
} from 'react-native-reanimated';
import { Trophy, Users } from 'lucide-react-native';

const BACKGROUND_IMAGES = [
  'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
  'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
  'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
  'https://images.pexels.com/photos/3448250/pexels-photo-3448250.jpeg',
  'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
  'https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg'
];

export default function SplashScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = useCallback((role: 'organizer' | 'player') => {
    // Check if user is registered
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(role);
      if (!userData) {
        router.push(`/(auth)/${role}`);
      } else {
        router.push(`/(${role})/(tabs)`);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      {BACKGROUND_IMAGES.map((image, index) => (
        <Image
          key={image}
          source={{ uri: image }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: currentImageIndex === index ? 1 : 0,
              display: Math.abs(currentImageIndex - index) <= 1 ? 'flex' : 'none',
            }
          ]}
        />
      ))}

      <View style={styles.content}>
        <View style={styles.spacer} />
        
        <View style={styles.mainContent}>
          <Animated.View 
            entering={FadeIn.delay(500)}
            style={styles.logoContainer}
          >
            <View style={styles.logoCircle}>
              <Trophy size={80} color="#F59E0B" strokeWidth={1.5} />
            </View>
            <Text style={styles.appName}>KickoffPro</Text>
          </Animated.View>

          <Animated.Text 
            entering={FadeInDown.delay(1000)}
            style={styles.tagline}
          >
            Your Ultimate Football Tournament Hub
          </Animated.Text>

          <View style={styles.buttonContainer}>
            <Animated.View entering={FadeInUp.delay(1500)}>
              <Pressable
                style={[styles.button, styles.organizerButton]}
                onPress={() => handleNavigation('organizer')}
              >
                <Trophy size={24} color="#1E3A8A" />
                <Text style={[styles.buttonText, styles.organizerText]}>
                  Tournament Organizer
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(1700)}>
              <Pressable
                style={[styles.button, styles.playerButton]}
                onPress={() => handleNavigation('player')}
              >
                <Users size={24} color="#FFFFFF" />
                <Text style={[styles.buttonText, styles.playerText]}>
                  Join as Player
                </Text>
              </Pressable>
            </Animated.View>
          </View>

          <Animated.Text 
            entering={FadeInUp.delay(1900)}
            style={styles.footer}
          >
            Create or join football tournaments with ease
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  spacer: {
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 40,
    color: '#FFFFFF',
    marginTop: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  organizerButton: {
    backgroundColor: '#F59E0B',
  },
  playerButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  organizerText: {
    color: '#1E3A8A',
  },
  playerText: {
    color: '#FFFFFF',
  },
  footer: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});