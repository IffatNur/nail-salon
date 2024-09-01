
import { createContext, ReactNode, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '@/firebase/firebase.init';

export const AuthContext = createContext({});
 const auth = getAuth(app);

type TChildren = {
    children: ReactNode
}
type TInput = {
  email: string;
  password: string;
};

const AuthProvider = ({children} : TChildren) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const Signup = ({email, password}:TInput) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const SignIn = ({email,password} : TInput) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email, password);
    }

    const SignOut = () =>{
        setLoading(true);
        return (signOut(auth)
                .then(()=>{})
                .catch(err => console.log(err)))
    }

    const UpdateUserProfile = (name) =>{
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            console.log(currentUser);
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        } 
    } ,[])
    const authInfo = {
      user,
      loading,
      Signup,
      SignIn,
      SignOut,
      UpdateUserProfile,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;