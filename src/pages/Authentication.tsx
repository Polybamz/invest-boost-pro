// src/components/Authentication.jsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'react-router-dom';

const Authentication = () => {
    const { ref } = useParams()
    // State to toggle between login and sign up
    const [isLogin, setIsLogin] = useState(false);

    // Form field states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [referredBy, setreferredBy] = useState([ref || null]);
    
    // Destructure state and functions from the custom useAuth hook
    // The hook now handles the loading and error states for us.
    const { loading, error,user,signIn, register } = useAuth();

    // The single function to handle both login and sign up form submissions
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isLogin) {
                // Use the signIn function from the useAuth hook
                await signIn(email, password);
                console.log("User logged in successfully!");
            } else {
                // Use the register function from the useAuth hook
                // Pass the additional user data as an object
                const userProfile = {
                    firstName,
                    lastName,
                    username,
                    referredBy,
                    createdAt: new Date().toLocaleString()
                };
                await register(email, password, userProfile);
                console.log("New user created and data saved to Firestore!");
            }
        } catch (err) {
            // The useAuth hook already sets the error state, so no need for manual setError
            // You can, however, log it here for debugging
            console.error("Authentication Error:", err.message);
        }
    };

    if(user){
        window.location.href = "/";
        return null;
    }

    console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',ref)

    return (
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        {isLogin ? "Welcome Back" : "Start Trading Crypto Today"}
                    </CardTitle>
                    <CardDescription>
                        {isLogin ? "Enter your email and password to log in to your account." : "Create an account to start buying and selling crypto."}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleFormSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* Conditional rendering for new sign-up fields */}
                        {!isLogin && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="John"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="johndoe123"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                               { !ref && ( <div className="grid gap-2">
                                    <Label htmlFor="referral">Referred By (Optional)</Label>
                                    <Input
                                        id="referral"
                                        type="text"
                                        placeholder="Enter your referral link here"
                                        value={referredBy[0]}
                                        onChange={(e) => setreferredBy([e.target.value])}
                                    />
                                </div>)}
                            </>
                        )}
                        {/* Display error message from the useAuth hook */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Loading..." : (isLogin ? "Log In" : "Create Account")}
                        </Button>
                        <Separator className="my-4" />
                        <Button
                            variant="link"
                            className="text-sm"
                            onClick={() => setIsLogin(!isLogin)}
                            type="button" // This is important to prevent form submission
                        >
                            {isLogin ? "New to our platform? Create an account" : "Already have an account? Log In"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Authentication;
