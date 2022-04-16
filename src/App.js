import { useState } from "react";

// firebase
import firebaseAuthService from "./FirebaseAuthService";

// css
import "./App.css";

// components
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  firebaseAuthService.subcribeToAuthChanges(setUser);

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
