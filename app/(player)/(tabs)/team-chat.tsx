import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function TeamChat() {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load current team
      const team = JSON.parse(localStorage.getItem('currentTeam') || 'null');
      setCurrentTeam(team);

      // Load team messages
      const teamMessages = JSON.parse(localStorage.getItem(`team_${team?.id}_messages`) || '[]');
      setMessages(teamMessages);
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() && currentTeam) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'You',
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(`team_${currentTeam.id}_messages`, JSON.stringify(updatedMessages));
      setMessage('');

      // Scroll to bottom
      scrollViewRef.current?.scrollToEnd();
    }
  };

  if (!currentTeam) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No team selected</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.teamName}>{currentTeam.name}</Text>
        <Text style={styles.subtitle}>Team Chat</Text>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
        {messages.map((msg, index) => (
          <Animated.View
            key={msg.id}
            entering={FadeInUp.delay(index * 100)}
            style={[
              styles.messageContainer,
              msg.sender === 'You' ? styles.sentMessage : styles.receivedMessage
            ]}
          >
            <Text style={styles.sender}>{msg.sender}</Text>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          multiline
        />
        <Pressable 
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Send size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  teamName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E3A8A',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#374151',
  },
  sender: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1F2937',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 20,
  },
});