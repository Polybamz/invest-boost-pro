import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Assuming 'auth' and 'db' instances are exported from your firebase config file

// The custom user data interface for Firestore
interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    createdAt: Date;
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
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setAuthState({
                    user,
                    loading: false,
                    error: null
                });
            },
            (error) => {
                setAuthState({
                    user: null,
                    loading: false,
                    error: error.message
                });
            }
        );

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
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

           const response = await fetch('https://crypto-invest-backend-1.onrender.com/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(
        payload
)
});

const data = await response.json();
console.log(data);
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;

            // // Save the additional user data to Firestore
            // await setDoc(doc(db, "users", user.uid), {
            //     email: user.email,
            //     firstName: userProfile.firstName,
            //     lastName: userProfile.lastName,
            //     username: userProfile.username,
            //     createdAt: new Date(),
            //     referralLink: userProfile.referralLink || null, 
            // });
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
            await signOut(auth);
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