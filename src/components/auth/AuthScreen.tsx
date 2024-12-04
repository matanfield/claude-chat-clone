import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../services/supabase/client';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthScreen = () => {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/app';

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Rather
          </h2>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4F46E5',
                  brandAccent: '#4338CA'
                }
              }
            }
          }}
          providers={['google', 'github']}
          redirectTo={`${window.location.origin}/app`}
        />
      </div>
    </div>
  );
};

export default AuthScreen; 