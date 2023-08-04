import { useState, useEffect } from 'react';
import { Auth } from '@supabase/ui'; // Import the Auth component from the correct package
import supabase from './config/supabaseClient';

export default function Signin({ onLogin }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        onLogin();
      }
    });

    // Check for the existing session
    const currentSession = supabase.auth.session();
    if (currentSession) {
      setSession(currentSession);
    }
  }, [onLogin]);

  if (!session) {
    return <Auth supabaseClient={supabase} />;
  }

  // Render your logged-in content here if needed
  return null;
}
