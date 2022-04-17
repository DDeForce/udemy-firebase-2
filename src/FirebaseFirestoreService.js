import firebase from "./FirebaseConfig";

const firestore = firebase.firestore();

const createDocument = (collection, document) => {
  return firestore.collection(collection).add(document);
};

const FirebaseFirestoreService = {
  createDocument,
};

export default FirebaseFirestoreService;
