import { useState, useEffect } from 'react';

interface Session {
  userId: string;
  tokenJwt: string;
  roleId: string;
  createdAt: number;
}

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      if (isSessionValid(parsedSession)) {
        setSession(parsedSession);
      } else {
        localStorage.removeItem('session');
      }
    }
  }, []);

  const saveSession = (newSession: Omit<Session, 'createdAt'>) => {
    const sessionWithTimestamp = { ...newSession, createdAt: Date.now() };
    localStorage.setItem('session', JSON.stringify(sessionWithTimestamp));
    setSession(sessionWithTimestamp);
  };

  const clearSession = () => {
    localStorage.removeItem('session');
    setSession(null);
  };

  const isSessionValid = (sessionToValidate: Session) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const now = Date.now();
    return now - sessionToValidate.createdAt < oneDayInMilliseconds;
  };

  const getSession = async () => {
    const jsonData = localStorage.getItem('session');
    if (!jsonData) {
      return null;
    }
    const data = JSON.parse(jsonData);
    if (!isSessionValid(data)) {
      localStorage.removeItem('session');
      setSession(null);
      return null;
    }
    setSession(data);
    return data;
  };

  return {
    session,
    getSession,
    saveSession,
    clearSession,
    isSessionValid,
  };
};

export default useSession;
