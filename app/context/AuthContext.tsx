'use client';

import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  city: string;
  email: string;
  phone: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthenticationContext);
