import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'amanfo97_auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [user]);

  const login = ({ role, name, email, id }) => {
    setUser({
      role: role || 'senior',
      name: name || (role === 'admin' ? 'Admin User' : 'Senior Kwame'),
      email: email || (role === 'admin' ? 'admin@amanfo97.org' : 'kwame.mensah@amanfo97.org'),
      id: id || (role === 'admin' ? 'ADMIN001' : 'AM97001'),
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin', isSenior: user?.role === 'senior' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
