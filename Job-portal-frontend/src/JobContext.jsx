import React, { createContext, useState, useContext } from 'react';
import { Joblist } from './JobList';



const JobContext = createContext();

export const JobProvider = ({ children }) => {
    // Total JobList
    const [jobs, setJobs] = useState(Joblist);

    // States to Toggle online status in chats
    const [onlineStatus, setOnlineStatus] = useState("yes");

    // Jobs to show when Applied
    const [appliedJobs, setAppliedJobs] = useState([]);

    // Jobs to show when Saved
    const [savedJobs, setSavedJobs] = useState([]);

    // Using Id to Toggle Menu in Notification Window
    const [activeMenuId, setActiveMenuId] = useState(null);

    // const [Alluser, setAlluser] = useState([
    //     {
    //         id: "1",
    //         profile: { "fullName": "Harsha", "gender": "Female", "dob": "1999-08-22", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Frontend Developer", "company": "Pixel Logic", experience: "2 Years", "currentLocation": "Chennai", "prefLocation": "Chennai" },
    //         contact: { "mobile": "+91 9123456780", "altMobile": "", "email": "Harshavarthini.dev@email.com", "altEmail": "", "address": "No 5, Velachery Main Rd", "street": "Velachery", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600042", "country": "India" },
    //         resume: { "size": "850KB", "portfolio": "" },
    //         education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "KV School", "percentage": "95%", "location": "Chennai", "year": "2015" }, "hsc": { "stream": "Biology-Maths", "institution": "KV School", "location": "Chennai", "year": "2017", "percentage": "90%" }, "graduations": [{ id: 1, "degree": "B.Tech IT", "status": "Completed", "dept": "IT", "percentage": "8.8 CGPA", "startYear": "2017", "endYear": "2021", "college": "SSN College", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Frontend Developer", "company": "Pixel Logic", "startDate": "2021-07-01", "endDate": "Present", "industry": "Software", "jobType": "Full-Time", "location": "Chennai", "responsibilities": "Building responsive UI using React and Tailwind CSS." }] },
    //         skills: ["React", "JavaScript", "Tailwind CSS", "Git"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }, { "name": "Malayalam", "proficiency": "Fluent" }],
    //         certs: [{ "name": "Meta Frontend Certificate", "file": "meta_fe.pdf" }],
    //         preferences: [{ "currentCTC": "5 LPA", "expectedCTC": "8 LPA", "jobType": "Hybrid", "role": "Senior Frontend Developer", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "2",
    //         profile: { "fullName": "Ajeeth", "gender": "Male", "dob": "2001-03-10", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Data Analyst Trainee", "company": "DataPoint Solutions", experience: "Fresher", "currentLocation": "Coimbatore", "prefLocation": "Bangalore" },
    //         contact: { "mobile": "+91 9988776655", "altMobile": "", "email": "AjeetH.data@email.com", "altEmail": "", "address": "7/2, Peelamedu", "street": "Avinashi Road", "city": "Coimbatore", "state": "Tamil Nadu", "pincode": "641004", "country": "India" },
    //         resume: { "size": "1.1MB", "portfolio": "" },
    //         education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "SVM School", "percentage": "89%", "location": "Coimbatore", "year": "2017" }, "hsc": { "stream": "Computer Science", "institution": "SVM School", "location": "Coimbatore", "year": "2019", "percentage": "92%" }, "graduations": [{ id: 1, "degree": "B.Sc Data Science", "status": "Completed", "dept": "Science", "percentage": "8.2 CGPA", "startYear": "2019", "endYear": "2022", "college": "PSG Arts", "city": "Coimbatore", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Frontend Developer", "company": "Pixel Logic", "startDate": "2021-07-01", "endDate": "Present", "industry": "Software", "jobType": "Full-Time", "location": "Chennai", "responsibilities": "Building responsive UI using React and Tailwind CSS." }] },
    //         skills: ["Python", "SQL", "Tableau", "Excel"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Professional" }, { "name": "Malayalam", "proficiency": "Fluent" }],
    //         certs: [{ "name": "Google Data Analytics", "file": "g_data.pdf" }],
    //         preferences: [{ "currentCTC": "0", "expectedCTC": "4 LPA", "jobType": "Full-Time", "role": "Junior Data Analyst", "ready": "Yes", "relocate": "Yes" }]
    //     },
    //     {
    //         id: "3",
    //         profile: { "fullName": "SuryaKumar Ravi", "gender": "Male", "dob": "1996-11-30", "maritalStatus": "Married", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Backend Engineer", "company": "CloudScale Systems", experience: "4 Years", "currentLocation": "Bangalore", "prefLocation": "Remote" },
    //         contact: { "mobile": "+91 9000112233", "altMobile": "", "email": "Surya.dev@email.com", "altEmail": "", "address": "HSR Layout Sector 2", "street": "27th Main", "city": "Bangalore", "state": "Karnataka", "pincode": "560102", "country": "India" },
    //         resume: { "size": "2MB", "portfolio": "" },
    //         education: { "highestQual": "Master's Degree", "sslc": { "institution": "Government Hr Sec", "percentage": "85%", "location": "Madurai", "year": "2012" }, "hsc": { "stream": "Pure Science", "institution": "Government Hr Sec", "location": "Madurai", "year": "2014", "percentage": "80%" }, "graduations": [{ id: 1, "degree": "MCA", "status": "Completed", "dept": "Computer Apps", "percentage": "7.5 CGPA", "startYear": "2017", "endYear": "2019", "college": "Anna University", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Senior Backend Developer", "company": "CloudScale Systems", "startDate": "2020-01-15", "endDate": "Present", "industry": "SaaS", "jobType": "Full-Time", "location": "Bangalore", "responsibilities": "Managing microservices and database optimization." }] },
    //         skills: ["Node.js", "MongoDB", "AWS", "Docker"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
    //         certs: [{ "name": "AWS Certified Developer", "file": "aws_dev.pdf" }],
    //         preferences: [{ "currentCTC": "12 LPA", "expectedCTC": "18 LPA", "jobType": "Remote", "role": "Backend Lead", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "4",
    //         profile: { "fullName": "Chutki Bheem", "gender": "Female", "dob": "2000-02-14", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Content Writer", "company": "Media Works", experience: "1 Year", "currentLocation": "Chennai", "prefLocation": "Chennai" },
    //         contact: { "mobile": "+91 9444123456", "altMobile": "", "email": "Chuki.write@email.com", "altEmail": "", "address": "Anna Nagar East", "street": "3rd Cross", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600102", "country": "India" },
    //         resume: { "size": "900KB", "portfolio": "" },
    //         education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "Holy Cross", "percentage": "96%", "location": "Trichy", "year": "2016" }, "hsc": { "stream": "Arts", "institution": "Holy Cross", "location": "Trichy", "year": "2018", "percentage": "94%" }, "graduations": [{ id: 1, "degree": "B.A. English", "status": "Completed", "dept": "Literature", "percentage": "82%", "startYear": "2018", "endYear": "2021", "college": "Loyola College", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Content Creator", "company": "Media Works", "startDate": "2022-05-10", "endDate": "Present", "industry": "Marketing", "jobType": "Contract", "location": "Chennai", "responsibilities": "SEO writing and social media management." }] },
    //         skills: ["SEO", "Copywriting", "Canva", "WordPress"],
    //         languages: [{ "name": "English", "proficiency": "Fluent" }, { "name": "Tamil", "proficiency": "Native" }],
    //         certs: [{ "name": "HubSpot Content Marketing", "file": "hubspot.pdf" }],
    //         preferences: [{ "currentCTC": "3.5 LPA", "expectedCTC": "5 LPA", "jobType": "Full-Time", "role": "Senior Content Strategist", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "5",
    //         profile: { "fullName": "Thomas Antony", "gender": "Male", "dob": "1997-07-07", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "DevOps Engineer", "company": "InfraGenie", experience: "3 Years", "currentLocation": "Hyderabad", "prefLocation": "Chennai" },
    //         contact: { "mobile": "+91 8877665544", "altMobile": "", "email": "Thomas.devops@email.com", "altEmail": "", "address": "Madhapur", "street": "HITEC City", "city": "Hyderabad", "state": "Telangana", "pincode": "500081", "country": "India" },
    //         resume: { "size": "1.5MB", "portfolio": "" },
    //         education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "Zion Matric", "percentage": "88%", "location": "Kanchi", "year": "2013" }, "hsc": { "stream": "CS", "institution": "Zion Matric", "location": "Kanchi", "year": "2015", "percentage": "82%" }, "graduations": [{ id: 1, "degree": "B.E. ECE", "status": "Completed", "dept": "Engineering", "percentage": "7.8 CGPA", "startYear": "2015", "endYear": "2019", "college": "Sathyabama University", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "DevOps Associate", "company": "InfraGenie", "startDate": "2020-08-01", "endDate": "Present", "industry": "IT", "jobType": "Full-Time", "location": "Hyderabad", "responsibilities": "CI/CD pipeline automation and Kubernetes management." }] },
    //         skills: ["Kubernetes", "Jenkins", "Terraform", "Linux"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }, { "name": "Telugu", "proficiency": "Basic" }],
    //         certs: [{ "name": "CKA Certification", "file": "cka.pdf" }],
    //         preferences: [{ "currentCTC": "9 LPA", "expectedCTC": "13 LPA", "jobType": "Full-Time", "role": "DevOps Architect", "ready": "Yes", "relocate": "Yes" }]
    //     },
    //     {
    //         id: "6",
    //         profile: { "fullName": "Karthiga", "gender": "Female", "dob": "1995-12-05", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Product Manager", "company": "FinTech Hub", experience: "5 Years", "currentLocation": "Bangalore", "prefLocation": "Bangalore" },
    //         contact: { "mobile": "+91 9112233445", "altMobile": "", "email": "Karthiga.pm@email.com", "altEmail": "", "address": "Indiranagar", "street": "100ft Road", "city": "Bangalore", "state": "Karnataka", "pincode": "560038", "country": "India" },
    //         resume: { "size": "1.8MB", "portfolio": "" },
    //         education: { "highestQual": "MBA", "sslc": { "institution": "BVB School", "percentage": "94%", "location": "Erode", "year": "2011" }, "hsc": { "stream": "Commerce", "institution": "BVB School", "location": "Erode", "year": "2013", "percentage": "96%" }, "graduations": [{ id: 1, "degree": "MBA", "status": "Completed", "dept": "Management", "percentage": "9.0 CGPA", "startYear": "2017", "endYear": "2019", "college": "IIM Bangalore", "city": "Bangalore", "state": "Karnataka", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Product Manager", "company": "FinTech Hub", "startDate": "2019-05-01", "endDate": "Present", "industry": "Banking", "jobType": "Full-Time", "location": "Bangalore", "responsibilities": "Roadmap planning and stakeholder management." }] },
    //         skills: ["Agile", "Jira", "Market Research", "Product Strategy"],
    //         languages: [{ "name": "English", "proficiency": "Fluent" }, { "name": "Tamil", "proficiency": "Fluent" }, { "name": "Kannada", "proficiency": "Basic" }],
    //         certs: [{ "name": "CSPO", "file": "cspo.pdf" }],
    //         preferences: [{ "currentCTC": "22 LPA", "expectedCTC": "28 LPA", "jobType": "Full-Time", "role": "Senior PM", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "7",

    //         profile: { "fullName": "Arul Varman", "gender": "Male", "dob": "2002-01-20", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "QA Automation Engineer", "company": "TestX", experience: "Fresher", "currentLocation": "Chennai", "prefLocation": "Chennai" },
    //         contact: { "mobile": "+91 8080808080", "altMobile": "", "email": "Sudhakar.qa@email.com", "altEmail": "", "address": "T Nagar", "street": "Burkit Rd", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600017", "country": "India" },
    //         resume: { "size": "1.1MB", "portfolio": "" },
    //         education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "Don Bosco", "percentage": "91%", "location": "Chennai", "year": "2018" }, "hsc": { "stream": "CS", "institution": "Don Bosco", "location": "Chennai", "year": "2020", "percentage": "87%" }, "graduations": [{ id: 1, "degree": "B.E. CSE", "status": "Completed", "dept": "Engineering", "percentage": "8.0 CGPA", "startYear": "2020", "endYear": "2024", "college": "Velammal Engineering", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Fresher", "hasExperience": "No", "entries": [] },
    //         skills: ["Selenium", "Java", "Manual Testing", "Python"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
    //         certs: [{ "name": "ISTQB Foundation", "file": "istqb.pdf" }],
    //         preferences: [{ "currentCTC": "0", "expectedCTC": "4.5 LPA", "jobType": "Full-Time", "role": "QA Engineer", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "8",
    //         profile: { "fullName": "Naveen chand", "gender": "male", "dob": "1998-04-12", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Full Stack Developer", "company": "AppSmiths", experience: "2.5 Years", "currentLocation": "Pune", "prefLocation": "Remote" },
    //         contact: { "mobile": "+91 7766554433", "altMobile": "", "email": "abi.dev@email.com", "altEmail": "", "address": "Viman Nagar", "street": "Lane 4", "city": "Pune", "state": "Maharashtra", "pincode": "411014", "country": "India" },
    //         resume: { "size": "1.3MB", "portfolio": "https://abi-codes.io" },
    //         education: { "highestQual": "Bachelor's Degree", "sslc": { "institution": "SBOA", "percentage": "98%", "location": "Madurai", "year": "2014" }, "hsc": { "stream": "CS", "institution": "SBOA", "location": "Madurai", "year": "2016", "percentage": "95%" }, "graduations": [{ id: 1, "degree": "B.Tech IT", "status": "Completed", "dept": "IT", "percentage": "9.1 CGPA", "startYear": "2016", "endYear": "2020", "college": "TCE Madurai", "city": "Madurai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Full Stack Dev", "company": "AppSmiths", "startDate": "2020-09-10", "endDate": "Present", "industry": "Software", "jobType": "Full-Time", "location": "Pune", "responsibilities": "MERN stack development." }] },
    //         skills: ["React", "Node.js", "Express", "PostgreSQL"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
    //         certs: [{ "name": "MERN Stack Mastery", "file": "mern.pdf" }],
    //         preferences: [{ "currentCTC": "7.5 LPA", "expectedCTC": "12 LPA", "jobType": "Remote", "role": "Senior Full Stack Developer", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "9",
    //         profile: { "fullName": "Gowtham Sam Sundar", "gender": "Male", "dob": "1994-09-18", "maritalStatus": "Married", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "Cybersecurity Analyst", "company": "SafeNet", experience: "6 Years", "currentLocation": "Bangalore", "prefLocation": "Bangalore" },
    //         contact: { "mobile": "+91 9898989898", "altMobile": "", "email": "Samsunder.sec@email.com", "altEmail": "", "address": "Whitefield", "street": "ITPL Main Rd", "city": "Bangalore", "state": "Karnataka", "pincode": "560066", "country": "India" },
    //         resume: { "size": "1.6MB", "portfolio": "" },
    //         education: { "highestQual": "Master's Degree", "sslc": { "institution": "DAV", "percentage": "82%", "location": "Chennai", "year": "2010" }, "hsc": { "stream": "CS", "institution": "DAV", "location": "Chennai", "year": "2012", "percentage": "78%" }, "graduations": [{ id: 1, "degree": "M.Tech Cyber", "status": "Completed", "dept": "CS", "percentage": "8.5 CGPA", "startYear": "2016", "endYear": "2018", "college": "Amrita Vishwa Vidyapeetham", "city": "Coimbatore", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "Security Lead", "company": "SafeNet", "startDate": "2018-06-01", "endDate": "Present", "industry": "Security", "jobType": "Full-Time", "location": "Bangalore", "responsibilities": "Pentesting and vulnerability assessment." }] },
    //         skills: ["Metasploit", "Ethical Hacking", "Python", "SOC"],
    //         languages: [{ "name": "English", "proficiency": "Fluent" }, { "name": "Tamil", "proficiency": "Native" }, { "name": "Hindi", "proficiency": "Conversational" }],
    //         certs: [{ "name": "CEH", "file": "ceh.pdf" }],
    //         preferences: [{ "currentCTC": "18 LPA", "expectedCTC": "25 LPA", "jobType": "Full-Time", "role": "Security Manager", "ready": "Yes", "relocate": "No" }]
    //     },
    //     {
    //         id: "10",
    //         profile: { "fullName": "Lithin and Boys", "gender": "male", "dob": "1997-11-11", "maritalStatus": "Single", "nationality": "Indian" },
    //         currentDetails: { "jobTitle": "HR Generalist", "company": "Global Talent", experience: "4 Years", "currentLocation": "Chennai", "prefLocation": "Chennai" },
    //         contact: { "mobile": "+91 9333222111", "altMobile": "", "email": "Lithinandco.hr@email.com", "altEmail": "", "address": "Mylapore", "street": "Luz Church Rd", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600004", "country": "India" },
    //         resume: { "size": "1.2MB", "portfolio": "" },
    //         education: { "highestQual": "Master's Degree", "sslc": { "institution": "Rosary Matric", "percentage": "90%", "location": "Chennai", "year": "2013" }, "hsc": { "stream": "Commerce", "institution": "Rosary Matric", "location": "Chennai", "year": "2015", "percentage": "93%" }, "graduations": [{ id: 1, "degree": "MBA HR", "status": "Completed", "dept": "Management", "percentage": "78%", "startYear": "2019", "endYear": "2021", "college": "Ethiraj College", "city": "Chennai", "state": "Tamil Nadu", "country": "India" }] },
    //         experience: { "status": "Experienced", "hasExperience": "Yes", "entries": [{ id: 1, "title": "HR Associate", "company": "Global Talent", "startDate": "2021-06-01", "endDate": "Present", "industry": "HR Services", "jobType": "Full-Time", "location": "Chennai", "responsibilities": "End-to-end recruitment and payroll." }] },
    //         skills: ["Recruitment", "Employee Engagement", "Payroll", "MS Office"],
    //         languages: [{ "name": "Tamil", "proficiency": "Native" }, { "name": "English", "proficiency": "Fluent" }],
    //         certs: [{ "name": "SHRM Certified", "file": "shrm.pdf" }],
    //         preferences: [{ "currentCTC": "6 LPA", "expectedCTC": "9 LPA", "jobType": "Full-Time", "role": "HR Manager", "ready": "Yes", "relocate": "No" }]
    //     },
    // ]


    // )


    // Chats/messages between Employer and Jobseeker 1:1;
    const [chats, setChats] = useState([
    // Employer-ah manual-ah first-la vachupom
    { id: 0, name: "Sudhakar", role: "employer", messages: [] },
    
    // Alluser array-la irukura ellarukum automatic-ah create aagum
    ...Alluser.map(user => ({
        id: parseInt(user.id),
        name: user.profile.fullName,
        role: "jobseeker",
        messages: []
    }))
]);

    

    // Profile List from my profile
    const [allData, setAllData] = useState({
        profile: { fullName: '', gender: 'Select', dob: '', maritalStatus: 'Select', nationality: '' },
        currentDetails: { jobTitle: '', company: '', experience: '', currentLocation: '', prefLocation: '' },
        contact: { mobile: '', altMobile: '', email: '', altEmail: '', address: '', street: '', city: '', state: '', pincode: '', country: '' },
        resume: { size: '', portfolio: '' },
        education: { highestQual: 'Select', sslc: { institution: '', percentage: '', location: '', year: '' }, hsc: { stream: 'Select', institution: '', location: '', year: '', percentage: '' }, graduations: [{ id: 1, degree: '', status: 'Select', dept: '', percentage: '', startYear: '', endYear: '', college: '', city: '', state: '', country: '' }] },
        experience: { status: 'Fresher', hasExperience: 'No', entries: [{ id: 1, title: '', company: '', startDate: '', endDate: '', industry: 'Select', jobType: 'Select', location: '', responsibilities: '' }] },
        skills: ["User Research", "Problem solving", "Figma"],
        languages: [{ name: "English", proficiency: "Fluent" }, { name: "Tamil", proficiency: "Native" }],
        certs: [{ name: "Full-Stack Development", file: "cert1.pdf" }, { name: "UI/UX Design", file: "cert2.pdf" }],
        preferences: [{ currentCTC: '', expectedCTC: '', jobType: 'Select', role: '', ready: '', relocate: '' }]
    });

    const postJob = (newJobData) => {
        const newJob = {
            ...newJobData,
            id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
            postedDate: getFormattedDate(),
        };
        setJobs((prev) => [newJob, ...prev]);
        alert(`Job "${newJob.jobTitle}" posted successfully!`);
    };

    // 2. Edit an Existing Job
    const editJob = (jobId, updatedData) => {
        setJobs((prev) =>
            prev.map((job) => (job.id === jobId ? { ...job, ...updatedData } : job))
        );

        // Also update saved jobs if the edited job was saved
        setSavedJobs((prev) =>
            prev.map((job) => (job.id === jobId ? { ...job, ...updatedData } : job))
        );
    };

    // Toggle End Conversation Logic In Employer Chat Window
    const [isChatEnded, setIsChatEnded] = useState(false);

    // NotificationData previously passed from AfterLoginLanding page
    const [notificationsData, setNotificationsData] = useState([{
        id: Date.now(),
        text: "Welcome to Job Portal",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
    }]);

    // New Messages Notification Logic
    const [showNotification, setShowNotification] = useState(false);

    // to add NewNotification in NotificationData 
    const addNotification = (text, targetId = null) => {
    const newNotif = {
        id: Date.now(),
        text: text,
        targetId: targetId, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
    };
    setNotificationsData(prev => [newNotif, ...prev]);
};


    const getFormattedDate = () => {
        return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    const isJobSaved = (jobId) => savedJobs.some((j) => j.id === jobId);

    const applyForJob = (originalJob) => {
        const newAppliedJob = {
            ...originalJob,
            appliedDate: `Applied on ${getFormattedDate()}`,
            status: { text: 'Hiring in Progress', type: 'progress' },
            applicationStatus: [
                { label: 'Application Submitted', sub: "Your profile, resume, and cover letter have successfully entered the company's database, and an acknowledgment has been sent.", status: 'completed' },
                { label: 'Resume Screening', sub: "Your resume is currently being reviewed...", status: 'pending' },
                { label: 'Recruiter Review', sub: "A hiring manager manually reviews your specific experience...", status: 'pending' },
                { label: 'Shortlisted', sub: "You have passed the initial review stages...", status: 'pending' },
                { label: 'Interview Called', sub: "The hiring team has officially reached out...", status: 'pending' },
            ]
        };
        setAppliedJobs((prev) => [...prev, newAppliedJob]);
        setJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        setSavedJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        alert(`Successfully applied to ${originalJob.title} at ${originalJob.company}!`);
    };

    const toggleSaveJob = (originalJob) => {
        if (isJobSaved(originalJob.id)) {
            setSavedJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        } else {
            const newSavedJob = {
                ...originalJob,
                savedDate: `Saved on ${getFormattedDate()}`
            };
            setSavedJobs((prev) => [...prev, newSavedJob]);
        }
    };
    const addJob = (newJob) => {
        setJobs((prevJobs) => [...prevJobs, newJob]);
    };

    const deleteJob = (jobId) => {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
        setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
        addNotification("Job posting has been successfully deleted.");
    };
    const [activeSidebarUsers, setActiveSidebarUsers] = useState([]);

const addChatToSidebar = (userId) => {
  if (!activeSidebarUsers.includes(parseInt(userId))) {
    setActiveSidebarUsers(prev => [...prev, parseInt(userId)]);
  }
};

    return (
        <JobContext.Provider value={{
            jobs, appliedJobs, setAppliedJobs, savedJobs, chats, setChats, setJobs,
            onlineStatus, setOnlineStatus, isJobSaved, isChatEnded, setIsChatEnded,
            setNotificationsData, addNotification, toggleSaveJob, applyForJob, notificationsData, showNotification, setShowNotification,
            activeMenuId, setActiveMenuId, addJob, deleteJob, allData, setAllData, postJob, editJob, Alluser,setAlluser,activeSidebarUsers, 
            addChatToSidebar
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);