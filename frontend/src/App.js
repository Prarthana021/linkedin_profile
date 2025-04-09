import logo from "./logo.svg";
import "./App.css";
import profileData from "./dummy.json"; // or define in App.js
import ProfilePreview from "./ProfilePreview";

function App() {
  return (
    <div className="App">
      <div>
        <ProfilePreview profile={profileData}></ProfilePreview>
      </div>
    </div>
  );
}

export default App;
