import React, { useState } from "react";
import { auth, googleProvider } from "../config/fireBase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User signed In successfully");
        } catch (error) {
            console.error(error);
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert("User signed In With Google successfully");
        } catch (error) {
            console.error(error);
        }
    };
    const logOut = async () => {
        try {
            await signOut(auth);
            alert("User signed out Successfully");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <input
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign Up</button>
            <button onClick={signInWithGoogle}>Sign In with google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}

export default Auth;
