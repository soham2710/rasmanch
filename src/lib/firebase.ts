// lib/firebase.ts - Production-Ready Firebase Configuration with Proper Types
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase Client Configuration with fallbacks and validation
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
};

// Mock types for when Firebase is not initialized
interface MockAuth {
  currentUser: null;
  onAuthStateChanged: () => () => void;
  signInWithEmailAndPassword: () => Promise<never>;
  createUserWithEmailAndPassword: () => Promise<never>;
  signOut: () => Promise<never>;
}

interface MockFirestore {
  collection: () => {
    add: () => Promise<never>;
    get: () => Promise<never>;
  };
}

interface MockStorage {
  ref: () => {
    put: () => Promise<never>;
  };
}

// Validate Firebase configuration
function validateFirebaseConfig() {
  const requiredFields = [
    'apiKey',
    'authDomain', 
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missingFields = requiredFields.filter(
    field => !firebaseConfig[field as keyof typeof firebaseConfig]
  );

  if (missingFields.length > 0) {
    console.warn('Missing Firebase environment variables:', missingFields);
    
    // In development, we can continue with warnings
    if (process.env.NODE_ENV === 'development') {
      console.warn('Firebase will not work properly. Please check your .env.local file.');
      return false;
    }
    
    // In production, we need all variables
    throw new Error(
      `Missing required Firebase environment variables: ${missingFields.join(', ')}\n` +
      'Please set all NEXT_PUBLIC_FIREBASE_* variables in your deployment environment.'
    );
  }
  
  return true;
}

// Initialize Firebase with error handling
let app: FirebaseApp | null = null;
let auth: Auth | MockAuth | null = null;
let db: Firestore | MockFirestore | null = null;
let storage: FirebaseStorage | MockStorage | null = null;

try {
  if (validateFirebaseConfig()) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log('Firebase initialized successfully');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  
  // Create mock objects for SSR/Build compatibility
  if (typeof window === 'undefined') {
    console.warn('Running in server environment - Firebase services will be mocked');
    
    // Mock services for build-time
    auth = {
      currentUser: null,
      onAuthStateChanged: () => () => {},
      signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not initialized')),
      createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not initialized')),
      signOut: () => Promise.reject(new Error('Firebase not initialized'))
    } as MockAuth;
    
    db = {
      collection: () => ({
        add: () => Promise.reject(new Error('Firebase not initialized')),
        get: () => Promise.reject(new Error('Firebase not initialized'))
      })
    } as MockFirestore;
    
    storage = {
      ref: () => ({
        put: () => Promise.reject(new Error('Firebase not initialized'))
      })
    } as MockStorage;
  }
}

export { auth, db, storage };
export default app;

// Helper function to check if Firebase is properly initialized
export const isFirebaseInitialized = (): boolean => {
  return !!(app && auth && db && storage);
};

// Environment check helper
export const getEnvironmentInfo = () => ({
  hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  isInitialized: isFirebaseInitialized(),
  environment: process.env.NODE_ENV
});