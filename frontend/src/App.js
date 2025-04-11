import "./App.css";
import profileData from "./dummy.json"; // or define in App.js
import ProfilePreview from "./ProfilePreview";
import MyDocument from "./ProfilePreviewPdf";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { FaFilePdf } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      {/* <div>
        
      </div> */}
      <ProfilePreview profile={profileData}></ProfilePreview>
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
    </div>
  );
}

export default App;
