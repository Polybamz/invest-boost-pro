import { useState, useEffect } from 'react';
import {  User as FirebaseUser } from 'firebase/auth';

// The custom user data interface for Firestore
interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    createdAt: string;
    referredBy: string[] | null;
}

// The authentication state interface for the hook
interface AuthState {
    user: FirebaseUser | null;
    loading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null
    });

    // Handle auth state changes
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setAuthState({
                user: JSON.parse(storedUser),
                loading: false,
                error: null
            });
        } else {
            setAuthState({
                user: null,
                loading: false,
                error: null
            });
        }

    }, []);

    const signIn = async (email: string, password: string) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        console.log(email, password)

        try {
            // await signInWithEmailAndPassword(auth, email, password);
            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": password })
            });
            console.log(response)

            const data = await response.json();
            console.log(data);
            setAuthState({
                user: data.data,
                loading: false,
                error: null,
            });
          localStorage.setItem('user', JSON.stringify(data.data));

        } catch (error: any) {
            setAuthState({
                user: null,
                loading: false,
                error: error.message
            });
        }
    };

    const register = async (email: string, password: string, userProfile: Omit<UserProfile, 'email' | 'createdAt'>) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        const payload = {
            "email": email,
            "firstName": userProfile.firstName,
            "lastName": userProfile.lastName,
            "username": userProfile.username,
            "createdAt": userProfile.createdAt,
            "referredBy": userProfile.referredBy,
            password: password
        }

        console.log(
            payload
        )

        try {

            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    payload
                )
            });

            const data = await response.json();
            setAuthState({
                user: data.data,
                loading: false,
                error: null,
            });
            localStorage.setItem('user', JSON.stringify(data.data));
            console.log(data);

        } catch (error: any) {
            setAuthState({
                user: null,
                loading: false,
                error: error.message
            });
            // Re-throw the error so the component can handle it
            console.error(error)
            throw error;
        }
    };

    const logOut = async () => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        try {
            localStorage.removeItem('user');
            setAuthState({
                user: null,
                loading: false,
                error: null
            });
            location.href = "/auth";
            // await signOut(auth);
        } catch (error: any) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
        }
    };

    return {
        ...authState,
        signIn,
        register,
        logOut
    };
};