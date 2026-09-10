import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Callout } from '../../../components';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hello! I am your Hornomi virtual assistant. How can I help you today?',
    isUser: false,
  }
];

export default function GuidanceScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate auto-response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for sharing. I recommend checking our Education Hub for articles on this topic. If you are experiencing severe symptoms, please contact a healthcare professional directly.',
        isUser: false,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <Callout 
          variant="safety"
          message="Responses here are automated and not medical advice. For urgent or severe symptoms, please contact a healthcare professional directly."
          style={styles.disclaimer}
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.messageText, item.isUser ? styles.userText : styles.botText]}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardAvoid: { flex: 1 },
  disclaimer: { margin: spacing.md },
  messageList: { padding: spacing.md, gap: spacing.sm },
  messageBubble: { maxWidth: '80%', padding: spacing.md, borderRadius: 16 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: colors.line },
  messageText: { fontFamily: typography.body, fontSize: 16, lineHeight: 22 },
  userText: { color: colors.onBrand },
  botText: { color: colors.ink },
  inputContainer: { flexDirection: 'row', padding: spacing.md, backgroundColor: colors.surface, borderTopWidth: 1, borderColor: colors.line, alignItems: 'center' },
  input: { flex: 1, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.line, borderRadius: 20, paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.sm, maxHeight: 100, fontFamily: typography.body, fontSize: 16 },
  sendButton: { marginLeft: spacing.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.primarySoft, borderRadius: 20 },
  sendButtonText: { fontFamily: typography.body, fontSize: 14, fontWeight: '600', color: colors.primary },
});
