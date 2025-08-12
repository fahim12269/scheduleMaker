import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const [step, setStep] = useState<'enterNumber' | 'enterCode'>('enterNumber');
  const [customerNumber, setCustomerNumber] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { sendVerificationCode, verifyCode, codeSentTo } = useAuthStore(s => ({
    sendVerificationCode: s.sendVerificationCode,
    verifyCode: s.verifyCode,
    codeSentTo: s.codeSentTo,
  }));

  const canSend = useMemo(() => customerNumber.replace(/\D/g, '').length >= 6, [customerNumber]);
  const canVerify = useMemo(() => code.trim().length >= 4, [code]);

  function handleSend() {
    setError('');
    if (!canSend) return;
    const generated = sendVerificationCode(customerNumber);
    setStep('enterCode');
    // For demo, surface the generated code so testers can log in without SMS backend
    setTimeout(() => setError(`Demo code: ${generated}`), 0);
  }

  function handleVerify() {
    setError('');
    if (!canVerify) return;
    const ok = verifyCode(code);
    if (!ok) {
      setError('Invalid code. Please try again.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <Text style={styles.title}>Welcome</Text>
          {step === 'enterNumber' && (
            <>
              <Text style={styles.subtitle}>Enter your customer number</Text>
              <TextInput
                style={styles.input}
                value={customerNumber}
                onChangeText={setCustomerNumber}
                keyboardType="number-pad"
                placeholder="Customer number"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity style={[styles.button, !canSend && styles.buttonDisabled]} onPress={handleSend} disabled={!canSend}>
                <Text style={styles.buttonText}>Send verification code</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 'enterCode' && (
            <>
              <Text style={styles.subtitle}>Enter the code sent to {codeSentTo}</Text>
              <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                placeholder="6-digit code"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity style={[styles.button, !canVerify && styles.buttonDisabled]} onPress={handleVerify} disabled={!canVerify}>
                <Text style={styles.buttonText}>Verify & Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.link} onPress={() => setStep('enterNumber')}>
                <Text style={styles.linkText}>Edit customer number</Text>
              </TouchableOpacity>
            </>
          )}

          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  inner: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#374151', marginBottom: 12, textAlign: 'center' },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  link: { marginTop: 12, alignItems: 'center' },
  linkText: { color: '#2563EB', fontSize: 14, fontWeight: '600' },
  error: { color: '#DC2626', marginTop: 12, textAlign: 'center' },
});