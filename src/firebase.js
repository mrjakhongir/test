import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDZ3uxeGGl5Ej64gDB1iEJfl10FcKCp7mI',
	authDomain: 'chat-75824.firebaseapp.com',
	projectId: 'chat-75824',
	storageBucket: 'chat-75824.appspot.com',
	messagingSenderId: '280894594722',
	appId: '1:280894594722:web:13b57dd405713ce1e601fb',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
