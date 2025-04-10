import "./App.css";
import profileData from "./dummy.json"; // or define in App.js
import ProfilePreview from "./ProfilePreview";
import MyDocument from "./ProfilePreviewPdf";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

function App() {
  return (
    <div className="App">
      {/* <div>
        
      </div> */}
      <ProfilePreview profile={profileData}></ProfilePreview>
      <button
        onClick={async () => {
          const doc = <MyDocument />;
          const asPdf = pdf({});
          asPdf.updateContainer(doc);
          const blob = await asPdf.toBlob();
          saveAs(blob, "document.pdf");
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default App;
