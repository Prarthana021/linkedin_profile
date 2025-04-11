import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePreview from "./ProfilePreview";
import MyDocument from "./ProfilePreviewPdf";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { FaFilePdf } from "react-icons/fa";
import HomePage from "./HomePage";
import dummy from './dummy.json'

function App() {
  const [profileData, setProfileData] = useState(dummy);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage setProfileData={setProfileData} />} />
          <Route
            path="/profile"
            element={
              profileData && (
                <>
                  <ProfilePreview profile={profileData} />
                  <button
                    className="pdf-generate-button"
                    onClick={async () => {
                      const doc = <MyDocument />;
                      const asPdf = pdf({});
                      asPdf.updateContainer(doc);
                      const blob = await asPdf.toBlob();
                      saveAs(blob, "document.pdf");
                    }}
                  >
                    <FaFilePdf className="pdf-icon" />
                    Download PDF
                  </button>
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
