import { create } from 'zustand';
import { getItem, setItem } from '../storage/mmkv';

export type AuthState = {
  /** Persisted when logged in */
  customerNumber: string | null;
  /** Number the current verification code was sent to */
  codeSentTo: string | null;
  /** The current verification code awaiting confirmation */
  pendingCode: string | null;
  /**
   * Sends a verification code to the provided customer number.
   * Returns the generated code (demo only) so we can display it.
   */
  sendVerificationCode: (customerNumber: string) => string;
  /** Verifies the user-provided code and logs the user in if correct. */
  verifyCode: (code: string) => boolean;
  /** Logs out and clears persisted session. */
  logout: () => void;
};

const AUTH_PERSIST_KEY = 'auth_v1';

type AuthPersistShape = { customerNumber: string | null } | null;

function loadInitialAuth(): Pick<AuthState, 'customerNumber'> {
  const persisted = getItem<AuthPersistShape>(AUTH_PERSIST_KEY);
  if (persisted && typeof persisted.customerNumber === 'string' && persisted.customerNumber.length > 0) {
    return { customerNumber: persisted.customerNumber };
  }
  return { customerNumber: null };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...loadInitialAuth(),
  codeSentTo: null,
  pendingCode: null,
  sendVerificationCode: (customerNumber: string) => {
    const normalized = customerNumber.replace(/\D/g, '');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    set({ codeSentTo: normalized, pendingCode: code });
    return code;
  },
  verifyCode: (code: string) => {
    const { pendingCode, codeSentTo } = get();
    if (!pendingCode || !codeSentTo) return false;
    const provided = code.replace(/\s/g, '');
    const ok = provided === pendingCode;
    if (ok) {
      set({ customerNumber: codeSentTo, codeSentTo: null, pendingCode: null });
      setItem<AuthPersistShape>(AUTH_PERSIST_KEY, { customerNumber: codeSentTo });
    }
    return ok;
  },
  logout: () => {
    set({ customerNumber: null, codeSentTo: null, pendingCode: null });
    setItem<AuthPersistShape>(AUTH_PERSIST_KEY, { customerNumber: null });
  },
}));