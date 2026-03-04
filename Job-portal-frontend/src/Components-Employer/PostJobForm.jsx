import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';
import './PostJobForm.css';


export const PostJobForm = () => {
  const navigate = useNavigate();

  const categoryOptions = ["Aerospace & Defense", "Ai/MI", "Analytics", "Artificial Intelligence", "Automotive", "Big Data", "Biotechnology", "Business Consulting", "Business Intelligence", "Cloud Computing", "Cloud Services", "Construction", "Consulting", "Consumer Goods", "Consumer Tech", "Corporate", "Corporate Functions", "Customer Support", "Cybersecurity", "Data Infrastructure", "Data Science", "Design", "Digital Marketing", "Digital Media", "E-Commerce", "Ed-Tech", "Energy", "Enterprise Software", "Entertainment", "Finance", "Financial Services", "Fintech!!", "Fmcg", "Healthcare", "Hospital", "Hr Services", "Human Resources", "Internet", "It Consulting", "It Networking", "IT Services", "Logistics", "Marketing", "Marketing & Advertising", "Martech", "Mobile App Development", "Mobile Development", "Pharmaceutical", "Pharma", "Product Development", "Project Management", "Real Estate", "Recruitment", "Regional Sales", "Renewable Power", "Research", "Retail", "Retail Tech", "Saas", "Sales", "Site Reliability Engineering", "Software Development", "Software Product", "Software Testing", "Subscription Service", "Supply Chain", "Technology", "Telecommunications"];
  const educationOptions = ["BS (2)", "B.A (23)", "CA (28)", "B.Ed (2)", "M.Com (6)", "B.Sc (132)", "MCA (280)", "BCA (119)", "LLM (70)", "MS/M.Sc (Science) (134)", "Diploma (34)", "B.Com (15)", "M.Tech (301)", "MBA/PGDM (136)", "PG Diploma (21)", "B.B.A/ B.M.S (27)", "Medical-MS/MD (10)", "B.Tech/B.E. (1865)", "Any Graduate (4607)", "Other Post Graduate (8)", "ITI Certification (2)", "Any Postgraduate (4541)", "Graduation Not Required (25)", "Post Graduation Not Required (50)", "Bachelor Of Science (B.Sc.) In Business Economics (2)"];
  const departmentOptions = [
    "Engineering", "Marketing", "Sales", "Human Resources", "Finance",
    "Operations", "Product Management", "Customer Success", "Design",
    "Data Science", "Legal", "Information Technology", "Administrative"
  ];

  const [formData, setFormData] = useState({
    jobTitle: '',
    category: [],
    department: [],
    education: [],
    workType: { hybrid: false, remote: false, onSite: false },
    shift: { general: false, night: false, rotational: false },
    workDuration: '',
    jobPostDuration: '',
    salary: '',
    experience: '',
    location: '',
    openings: '',
    jobCategory: 'Full-time',
    keySkills: '',
    jobHighlights: [''],
    jobDescription: '',
    responsibilities: ['']
  });

  const [skillsList, setSkillsList] = useState(['Python', 'AWS']);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleCheckboxChange = (name, value, allOptions = []) => {
    setFormData(prev => {
      const currentList = prev[name] || [];
      if (value === "all") {
        const isAllSelected = currentList.length === allOptions.length;
        return { ...prev, [name]: isAllSelected ? [] : allOptions };
      }
      const newList = currentList.includes(value)
        ? currentList.filter(i => i !== value)
        : [...currentList, value];
      return { ...prev, [name]: newList };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [group, field] = name.split('.');
        setFormData((prev) => ({
          ...prev,
          [group]: { ...prev[group], [field]: checked }
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSkill = formData.keySkills.trim();
      if (newSkill && !skillsList.includes(newSkill)) {
        setSkillsList([...skillsList, newSkill]);
        setFormData({ ...formData, keySkills: '' });
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(skill => skill !== skillToRemove));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.jobHighlights];
    newHighlights[index] = value;
    setFormData({ ...formData, jobHighlights: newHighlights });
  };

  const addHighlightField = () => {
    setFormData({
      ...formData,
      jobHighlights: [...formData.jobHighlights, ""]
    });
  };

  const handleResponsibilityChange = (index, value) => {
    const updatedRes = [...formData.responsibilities];
    updatedRes[index] = value;
    setFormData({ ...formData, responsibilities: updatedRes });
  };

  const addResponsibilityField = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""]
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const submissionData = {
      ...formData,
      skills: skillsList
    };
    navigate('/Job-portal/Employer/PostJobpreview', { state: submissionData });
  };

  return (
    <div className="jobpost-page-title">
      <EHeader />
      <main className="jobpost-main-content">
        <header className="jobpost-form-header">
          <h1>Post a Job</h1>
          <p>Complete the steps below to reach thousands of qualified candidates</p>
        </header>

        <div className="jobpost-form-container">
          <form className="jobpost-form" onSubmit={handleSubmit}>
            <div className="jobpost-form-row">
              <label className="jobpost-label">Job title</label>
              <input className="jobpost-input" type="text" name="jobTitle" placeholder="e.g., Fullstack Developer" value={formData.jobTitle} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Industrial type</label>
              <div className={`jobpost-dropdown ${openDropdown === 'category' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('category')}>
                  {formData.category.length > 0 ? formData.category.join(', ') : 'Select'}
                  <i className="fas fa-angle-down jobpost-arrow"></i>
                </div>
                <div className="jobpost-dropdown-panel">
                  <label className="jobpost-select-all">
                    <input type="checkbox" onChange={() => handleCheckboxChange('category', 'all', categoryOptions)}
                      checked={formData.category.length === categoryOptions.length && categoryOptions.length > 0} />
                    <strong>Select all</strong>
                  </label>
                  <div className="jobpost-options-grid">
                    {categoryOptions.map(cat => (
                      <label key={cat} className="jobpost-option-item">
                        <input type="checkbox" checked={formData.category.includes(cat)} onChange={() => handleCheckboxChange('category', cat)} /> {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Department</label>

              <div className={`jobpost-dropdown ${openDropdown === 'department' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('department')}>
                  {/* Logic now checks formData.department */}
                  {formData.department.length > 0 ? formData.department.join(', ') : 'Select'}
                  <i className="fas fa-angle-down jobpost-arrow"></i>
                </div>

                <div className="jobpost-dropdown-panel">
                  {/* Optional: Add a Select All for Department */}
                  <label className="jobpost-select-all">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange('department', 'all', departmentOptions)}
                      checked={formData.department.length === departmentOptions.length}
                    />
                    <strong>Select all Departments</strong>
                  </label>

                  <div className="jobpost-options-grid">
                    {departmentOptions.map(dept => (
                      <label key={dept} className="jobpost-option-item">
                        <input
                          type="checkbox"
                          checked={formData.department.includes(dept)}
                          onChange={() => handleCheckboxChange('department', dept)}
                        />
                        {dept}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Work type</label>
              <div className="jobpost-inline-group">
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="workType.hybrid" checked={formData.workType.hybrid} onChange={handleChange} /> Hybrid
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="workType.remote" checked={formData.workType.remote} onChange={handleChange} /> Remote
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="workType.onSite" checked={formData.workType.onSite} onChange={handleChange} /> On-site
                </label>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Shift</label>
              <div className="jobpost-inline-group">
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="shift.general" checked={formData.shift.general} onChange={handleChange} /> General
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="shift.night" checked={formData.shift.night} onChange={handleChange} /> Night
                </label>
                <label className="jobpost-checkbox-label">
                  <input type="checkbox" name="shift.rotational" checked={formData.shift.rotational} onChange={handleChange} /> Rotational
                </label>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Work duration</label>
              <input className="jobpost-input" type="text" name="workDuration" placeholder='e.g., "3 Months", "6 Months", "permanent"' value={formData.workDuration} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Jobpost duration</label>
              <input className="jobpost-input" type="text" name="jobPostDuration" placeholder='e.g., "1 Months","2 Months", "6 Months"' value={formData.jobPostDuration} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Salary</label>
              <input className="jobpost-input" type="text" name="salary" placeholder="Max Annual CTC" value={formData.salary} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Experience</label>
              <input className="jobpost-input" type="text" name="experience" placeholder="Minimum years required" value={formData.experience} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Location</label>
              <input className="jobpost-input" type="text" name="location" placeholder="City name(e.g., Bengaluru)" value={formData.location} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Openings</label>
              <input className="jobpost-input" type="text" name="openings" placeholder="Total vacant positions" value={formData.openings} onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job category</label>
              <div className="jobpost-radio-container">
                <label className="jobpost-radio-label">
                  <input type="radio" name="jobCategory" value="Full-time" checked={formData.jobCategory === 'Full-time'} onChange={handleChange} /> Full-time
                </label>
                <label className="jobpost-radio-label">
                  <input type="radio" name="jobCategory" value="Internship" checked={formData.jobCategory === 'Internship'} onChange={handleChange} /> Internship
                </label>
              </div>
            </div>

            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Education</label>
              <div className={`jobpost-dropdown ${openDropdown === 'education' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('education')}>
                  {formData.education.length > 0 ? formData.education.join(', ') : 'Select Education'}
                  <i className="fas fa-angle-down jobpost-arrow"></i>
                </div>
                <div className="jobpost-dropdown-panel">
                  <div className="jobpost-options-grid">
                    {educationOptions.map(edu => (
                      <label key={edu} className="jobpost-option-item">
                        <input type="checkbox" checked={formData.education.includes(edu)} onChange={() => handleCheckboxChange('education', edu)} /> {edu}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Key skills</label>
              <div className="jobpost-skills-titile">
                <input
                  className="jobpost-input skills-input"
                  type="text"
                  name="keySkills"
                  placeholder="Press Enter to add skills  (e.g., Python, AWS, React etc...)"
                  value={formData.keySkills}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <div className="jobpost-tags-area">
                  {skillsList.map((skill, index) => (
                    <span key={index} className="jobpost-tag">
                      {skill} <button type="button" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job highlights</label>
              <div className="highlights-container">
                {formData.jobHighlights.map((highlight, index) => (
                  <div key={index} className="jobpost-input-icon-titile">
                    <input
                      className="jobpost-input"
                      type="text"
                      placeholder="Add top 3-5 selling points of the role"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                    />
                    {index === formData.jobHighlights.length - 1 && (
                      <span className="jobpost-plus-icon" onClick={addHighlightField}>+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Job description</label>
              <textarea className="jobpost-textarea" name="jobDescription" placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity unique.... "value={formData.jobDescription} onChange={handleChange}></textarea>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Responsibilities</label>
              <div className="responsibilities-list">
                {formData.responsibilities.map((res, index) => (
                  <div key={index} className="jobpost-input-icon-titile">
                    <input
                      className="jobpost-input"
                      type="text"
                      placeholder="Specific day-to-day tasks"
                      value={res}
                      onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    />
                    {index === formData.responsibilities.length - 1 && (
                      <span className="jobpost-plus-icon" onClick={addResponsibilityField}>+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="jobpost-actions">
          <button type="button" className="jobpost-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button type="button" className="jobpost-btn-preview" onClick={handleSubmit}>Preview</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
