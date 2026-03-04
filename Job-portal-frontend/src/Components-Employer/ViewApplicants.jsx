import React from "react";
import UserIcon from '../assets/Employer/User.png'
import "./ViewApplicants.css";

export const ViewApplicants = () => {
  const applicants = [
    { id: 1, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited", profileImg: null },
    { id: 2, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Applied", profileImg: "https://via.placeholder.com/40" },
    { id: 3, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "In progress", profileImg: null },
    { id: 4, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Selected", profileImg: null },
    { id: 5, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Rejected", profileImg: null },
    { id: 6, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "On hold", profileImg: null },
    { id: 7, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited", profileImg: null },
    { id: 8, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited", profileImg: null },
    { id: 9, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited", profileImg: null },
    { id: 10, name: "Adam Smith", phone: "8286462832", designation: "UI/UX Designer", location: "Coimbatore", appliedOn: "02-01-2026 10:32 AM", status: "Invited", profileImg: null },
  ];

  return (
    <div className="view-applicants-page" style={{ paddingTop: "0px", marginTop: "0px" }}>
      
      <h1 className="view-applicants-page-main-title" style={{ marginTop: "-25px", paddingTop: "0px" }}>
        View applicants
      </h1>
      
      <div className="view-applicants-list-container">
        <div className="view-applicant-shared-card applicant-header-row-style">
          <div className="view-applicants-column-name-layout">
            <div className="view-applicants-header-avatar-placeholder">

              <img src={UserIcon} alt="usericon" style={{ width: "20px"}} />
            </div>
            <div className="view-applicants-text-stack">
              <span className="view-applicants-header-label">Name</span>
              <span className="view-applicants-header-sub-label">Applied role</span>
            </div>
          </div>
          <div className="view-applicants-header-label">Phone number</div>
          <div className="view-applicants-header-label">Designation</div>
          <div className="view-applicants-header-label">Location</div>
          <div className="view-applicants-header-label">Applied on</div>
          <div className="view-applicants-header-label">Status</div>
        </div>

        {applicants.map((applicant) => (
          <div key={applicant.id} className="view-applicant-shared-card applicant-data-row-style">
            <div className="view-applicants-column-name-layout">
              {applicant.profileImg ? (
                <img 
                  src={applicant.profileImg} 
                  alt={applicant.name} 
                  className="view-applicants-avatar-img" 
                />
              ) : (
                <div className="view-applicants-avatar-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>

                  <img src={UserIcon} alt="usericon" style={{ width: "20px"}}/>
                </div>
              )}

              <div className="view-applicants-text-stack">
                <span className="view-applicants-full-name">{applicant.name}</span>
                <span className="view-applicants-role-info">Applied for {applicant.designation}</span>
              </div>
            </div>
            <div className="view-applicants-data-text">{applicant.phone}</div>
            <div className="view-applicants-data-text">{applicant.designation}</div>
            <div className="view-applicants-data-text">{applicant.location}</div>
            <div className="view-applicants-data-text">{applicant.appliedOn}</div>
            <div className="view-applicants-status-text">{applicant.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};