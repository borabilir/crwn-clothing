import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, snapshotEqual } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBFQBuWTkaq617ttsTPEcHznWwkA2fK2d0",
    authDomain: "crwn-clothing-db-a0a55.firebaseapp.com",
    projectId: "crwn-clothing-db-a0a55",
    storageBucket: "crwn-clothing-db-a0a55.appspot.com",
    messagingSenderId: "424395463261",
    appId: "1:424395463261:web:452777cb6261c903690bb4"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists()); // kullanıcı firebase içinde yaratılmış mı

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
    
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};