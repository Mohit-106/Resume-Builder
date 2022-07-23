import React from "react";
import ResumePreview from "./resumePreview";
import { NavLink } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { connect } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import Button from "@mui/material/Button";

function Finalize(props) {
  let educationSection = props.educationSection;
  let contactSection = props.contactSection;
  let documentd = props.document;
  let firestore = useFirestore();

  const saveToDatabase = async () => {
    //add or update to firestore
    let user = await firestore.collection("users").doc(props.auth.uid).get();
    user = user.data();
    let obj;
    if (user.resumeIds != undefined) {
      obj = {
        ...user.resumeIds,
        [documentd.id]: {
          educationSection: educationSection,
          contactSection: contactSection,
          document: documentd,
        },
      };
    } else {
      obj = {
        [documentd.id]: {
          educationSection: educationSection,
          contactSection: contactSection,
          document: documentd,
        },
      };
    }
    await firestore.collection("users").doc(props.auth.uid).update({
      resumeIds: obj,
    });
  };
  const downloadResume = () => {
    const input = document.getElementById("resumePreview");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("resume.pdf");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container full finalize-page">
      <div className="funnel-section ">
        <div className="finalize-preview-card " id="resumePreview">
          <ResumePreview
            contactSection={props.contactSection}
            educationSection={props.educationSection}
            skinCd={props?.document?.skinCd}
          ></ResumePreview>
          <Button variant="contained" style={{marginLeft:"45%"}}>
              <NavLink className="edit" to='/contact'>Edit Template</NavLink>
          </Button>
        </div>
        <div className="finalize-settings center">
          <div
            
            style={{ marginTop: "35vh" }}
          >
            <Button variant="contained" fullWidth="true">
              <a
                style={{ cursor: "pointer", textDecoration: "none" }}
                onClick={downloadResume}
              >
                Download Resume
              </a>
            </Button>
          </div>
          <div className=" download-resume resume-options">
           
            <Button variant="contained" fullWidth="true">
            <a
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={saveToDatabase}
            >
              Save to Database
            </a>
            </Button>

            
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    document: state.document,
    contactSection: state.contact,
    educationSection: state.education,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Finalize);
