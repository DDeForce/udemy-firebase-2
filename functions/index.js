// const { async } = require("@firebase/util");
// const FirebaseConfig = require("./FirebaseConfig");
// const functions = FirebaseConfig.functions;
// const firestore = FirebaseConfig.firestore;
// const storageBucket = FirebaseConfig.storageBucket;
// const admin = FirebaseConfig.admin;

// exports.onCreateRecipe = functions.firestore
//   .document("recipes/{recipeId")
//   .onCreate(async (snapshot) => {
//     const countDocRef = firestore.collection("recipeCounts").doc("all");
//     const countDoc = await countDocRef.get();

//     if (countDoc.exists) {
//       countDocRef.update({ count: admin.firestore.FieldValue.increment(1) });
//     } else {
//       countDocRef.set({ count: 1 });
//     }

//     const recipe = snapshot.data();

//     if (recipe.isPublihsed) {
//       const countPublishedDocRef = firestore
//         .collection("recipeCounts")
//         .doc("published");
//       const countPublishedDoc = await countPublishedDocRef.get();

//       if (countPublishedDoc.exists) {
//         countPublishedDocRef.update({
//           count: admin.firestore.FieldValue.increment(1),
//         });
//       } else {
//         countPublishedDocRef.set({ count: 1 });
//       }
//     }
//   });

// exports.onDeleteRecipe = functions.firestore
//   .document("recipes/{recipeId")
//   .onDelete(async (snapshot) => {
//     const recipe = snapshot.data();
//     const imageUrl = recipe.imageUrl;

//     if (imageUrl) {
//       const decodedUrl = decodeURIComponent(imageUrl);
//       const startIndex = decodedUrl.indexOf("/o/") + 3;
//       const endIndex = decodedUrl.indexOf("?");
//       const fullFilePath = decodedUrl.substring(startIndex, endIndex);
//       const file = storageBucket.file(fullFilePath);

//       console.log(`Attemting to delete ${fullFilePath}`);

//       try {
//         await file.delete();
//         console.log("succsessfuly deleted image");
//       } catch (error) {
//         console.log(`Failed to delete file: ${error.message}`);
//       }
//     }

//     const countDocRef = firestore.collection("recipeCounts").doc("all");
//     const countDoc = await countDocRef.get();

//     if (countDoc.exists) {
//       countDocRef.update({
//         count: admin.firestore.FieldValue.increment(-1),
//       });
//     } else {
//       countDocRef.set({ count: 0 });
//     }

//     if (recipe.isPublihsed) {
//       const countPublishedDocRef = firestore
//         .collection("recipeCounts")
//         .doc("published");
//       const countPublishedDoc = await countPublishedDocRef.get();

//       if (countPublishedDoc.exists) {
//         countPublishedDocRef.update({
//           count: admin.firestore.FieldValue.increment(-1),
//         });
//       } else {
//         countPublishedDocRef.set({ count: 0 });
//       }
//     }
//   });

// exports.onUpdateRecipe = functions.firestore
//   .document("recipes/{recipeId")
//   .onUpdate(async (changes) => {
//     const oldRecipe = changes.before.data();
//     const newRecipe = changes.after.data();

//     let publishCount = 0;

//     if (!oldRecipe.isPublihsed && newRecipe.isPublihsed) {
//       publishCount += 1;
//     } else if (oldRecipe && !newRecipe.isPublihsed) {
//       publishCount -= 1;
//     }

//     if (publishCount !== 0) {
//       const publishCountDocRef = firestore
//         .collection("recipeCounts")
//         .doc("published");

//       const publishCountDoc = await publishCountDocRef.get();

//       if (publishCountDoc.exists) {
//         publishCountDocRef.update({
//           count: admin.firestore.FieldValue.increment(publishCount),
//         });
//       } else {
//         if (publishCount > 0) {
//           publishCountDocRef.set({ count: publishCount });
//         } else {
//           publishCountDocRef.set({ count: 0 });
//         }
//       }
//     }
//   });
