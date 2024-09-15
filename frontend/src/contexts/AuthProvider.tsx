
import { createContext, ReactNode, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '@/firebase/firebase.init';
import useAxiosPublic from '@/hooks/useAxiosPublic';

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
    const axiosPublic = useAxiosPublic();
    const GoogleProvider = new GoogleAuthProvider();

    const Signup = ({email, password}:TInput) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const SignIn = ({email,password} : TInput) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email, password);
    }

    const GoogleSignIn = () =>{
        return signInWithPopup(auth, GoogleProvider);
    }

    const SignOut = () =>{
        setLoading(true);
        return (signOut(auth)
                .then(()=>{
                  localStorage.removeItem('nailsalon-token')
                })
                .catch(err => console.log(err)))
    }

    const UpdateUserProfile = (name: string) =>{
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(currentUser);
        if (currentUser?.email)  {
          const userInfo = { email: currentUser.email };
          axiosPublic.post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              localStorage.setItem("nailsalon-token", res.data.token);
            }
          });
        }
        setLoading(false);
      });
      return () => {
        return unsubscribe();
      };
    }, [axiosPublic]);
    const authInfo = {
      user,
      loading,
      Signup,
      SignIn,
      GoogleSignIn,
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