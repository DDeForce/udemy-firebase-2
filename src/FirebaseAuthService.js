import firebase from "./FirebaseConfig";

const auth = firebase.auth();

const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const loginUser = (email, password) => {
  return auth.signinUserWithEmailAndPassword(email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const sendPasswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return auth.signInWithPopup(provider);
};

const subcribeToAuthChanges = (handleAuthChanges) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChanges(user);
  });
};

const firebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subcribeToAuthChanges,
};

export default firebaseAuthService;