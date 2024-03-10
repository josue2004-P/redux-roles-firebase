import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    // Crear un documento en Firestore para el usuario
    const docuRef = doc(FirebaseDB, `usuarios/${uid}`);
    await setDoc(docuRef, { correo: email, rol: 1 });

  
    const docSnap = await getDoc(docuRef);

    const rol = docSnap.data().rol;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
      rol
    };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    // Crear un documento en Firestore para el usuario
    const docuRef = doc(FirebaseDB, `usuarios/${uid}`);    
    const docSnap = await getDoc(docuRef);
    const rol = docSnap.data().rol;

    return {
      ok: true,
      uid,
      photoURL,
      rol,
      displayName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
