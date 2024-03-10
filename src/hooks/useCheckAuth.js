import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth,FirebaseDB } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";

import { login, logout } from '../store/auth';



export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user ) return dispatch( logout() );


        const { uid, email, displayName, photoURL } = user;

        const docuRef = doc(FirebaseDB, `usuarios/${uid}`);          
        const docSnap = await getDoc(docuRef);
        const rol = docSnap.data().rol;

        dispatch( login({ uid, email, displayName, photoURL,rol }) );
        })
    }, []);

    return status;
}
