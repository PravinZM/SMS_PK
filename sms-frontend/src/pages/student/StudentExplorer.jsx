import React, { useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import studentService from '../../services/studentService';
import { UserGraduate } from 'lucide-react'; // Using lucide icon instead of FontAwesome
import './StudentExplorer.css';

const StudentExplorer = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [loading, setLoading] = useState({
        classes: false,
        sections: false,
        students: false,
        details: false
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        setLoading(prev => ({ ...prev, classes: true }));
        try {
            const res = await studentService.getClasses();
            if (res.success) {
                setClasses(res.data);
                if (res.data.length > 0) {
                    handleClassClick(res.data[0]);
                }
            }
        } catch (err) {
            console.error("Error fetching classes:", err);
        } finally {
            setLoading(prev => ({ ...prev, classes: false }));
        }
    };

    const handleClassClick = async (className) => {
        setSelectedClass(className);
        setSelectedSection(null);
        setStudents([]);
        setSelectedStudent(null);
        setStudentDetails(null);
        
        setLoading(prev => ({ ...prev, sections: true }));
        try {
            const res = await studentService.getSections(className);
            if (res.success) {
                setSections(res.data);
                if (res.data.length > 0) {
                    handleSectionClick(className, res.data[0]);
                }
            }
        } catch (err) {
            console.error("Error fetching sections:", err);
        } finally {
            setLoading(prev => ({ ...prev, sections: false }));
        }
    };

    const handleSectionClick = async (className, section) => {
        setSelectedSection(section);
        setSelectedStudent(null);
        setStudentDetails(null);

        setLoading(prev => ({ ...prev, students: true }));
        try {
            const res = await studentService.getStudentsByClassAndSection(className, section);
            if (res.success) {
                setStudents(res.data);
            }
        } catch (err) {
            console.error("Error fetching students:", err);
        } finally {
            setLoading(prev => ({ ...prev, students: false }));
        }
    };

    const handleStudentClick = async (student) => {
        setSelectedStudent(student.studentId);
        setLoading(prev => ({ ...prev, details: true }));
        try {
            const res = await studentService.getStudentDetails(student.studentId);
            if (res.success) {
                setStudentDetails(res.data);
            }
        } catch (err) {
            console.error("Error fetching student details:", err);
        } finally {
            setLoading(prev => ({ ...prev, details: false }));
        }
    };

    const renderTabContent = () => {
        if (!studentDetails) return null;

        switch (activeTab) {
            case 'personal':
                return (
                    <div className="tab-pane">
                        <DetailRow label="Full Name" value={`${studentDetails.firstName} ${studentDetails.lastName}`} />
                        <DetailRow label="Admission No" value={studentDetails.admissionNo} />
                        <DetailRow label="Roll No" value={studentDetails.rollNo} />
                        <DetailRow label="Gender" value={studentDetails.gender} />
                        <DetailRow label="Date of Birth" value={new Date(studentDetails.dob).toLocaleDateString()} />
                        <DetailRow label="Blood Group" value={studentDetails.bloodGroup} />
                        <DetailRow label="Mobile" value={studentDetails.mobileNumber} />
                        <DetailRow label="Email" value={studentDetails.email} />
                        <DetailRow label="Aadhaar No" value={studentDetails.aadhaarNumber} />
                    </div>
                );
            case 'academics':
                return (
                    <div className="tab-pane">
                        <DetailRow label="Class" value={studentDetails.studentClass} />
                        <DetailRow label="Section" value={studentDetails.section} />
                        <DetailRow label="Academic Year" value={studentDetails.academicYear} />
                        <DetailRow label="Admission Date" value={studentDetails.admissionDate ? new Date(studentDetails.admissionDate).toLocaleDateString() : 'N/A'} />
                        <DetailRow label="Status" value={studentDetails.status} />
                    </div>
                );
            case 'family':
                return (
                    <div className="tab-pane">
                        <DetailRow label="Father's Name" value={studentDetails.fatherName} />
                        <DetailRow label="Mother's Name" value={studentDetails.motherName} />
                        <DetailRow label="Guardian's Name" value={studentDetails.guardianName || 'N/A'} />
                        <DetailRow label="Father's Mobile" value={studentDetails.fatherMobile} />
                        <DetailRow label="Mother's Mobile" value={studentDetails.motherMobile} />
                        <DetailRow label="Parent Email" value={studentDetails.parentEmail} />
                        <DetailRow label="Occupation" value={studentDetails.occupation} />
                        <DetailRow label="Annual Income" value={studentDetails.annualIncome} />
                    </div>
                );
            case 'address':
                return (
                    <div className="tab-pane">
                        <DetailRow label="Address" value={studentDetails.address} />
                        <DetailRow label="City" value={studentDetails.city} />
                        <DetailRow label="State" value={studentDetails.state} />
                        <DetailRow label="Pincode" value={studentDetails.pincode} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <div className="student-explorer-container">
                {/* Left Panel: Class & Section Sidebar + Student Grid */}
                <div className="explorer-left-panel">
                    {/* Level 1: Classes */}
                    <div className="class-sidebar">
                        {classes.map(cls => (
                            <div 
                                key={cls} 
                                className={`class-item ${selectedClass === cls ? 'active' : ''}`}
                                onClick={() => handleClassClick(cls)}
                            >
                                {cls}
                            </div>
                        ))}
                    </div>

                    {/* Level 2: Sections */}
                    <div className="section-sidebar">
                        {sections.map(sec => (
                            <div 
                                key={sec} 
                                className={`section-item ${selectedSection === sec ? 'active' : ''}`}
                                onClick={() => handleSectionClick(selectedClass, sec)}
                            >
                                {sec}
                            </div>
                        ))}
                    </div>

                    {/* Student Cards List */}
                    <div className="student-list-area">
                        <div className="student-list-header">
                            <h2>Students in Class {selectedClass} - {selectedSection}</h2>
                        </div>
                        
                        {loading.students ? (
                            <div className="loading-state">Loading students...</div>
                        ) : (
                            <div className="student-cards-grid">
                                {students.length > 0 ? (
                                    students.map(student => (
                                        <div 
                                            key={student.studentId} 
                                            className={`student-card ${selectedStudent === student.studentId ? 'active' : ''}`}
                                            onClick={() => handleStudentClick(student)}
                                        >
                                            <div className="student-avatar">
                                                {student.profileImage ? (
                                                    <img src={student.profileImage} alt={student.firstName} />
                                                ) : (
                                                    <span>{student.firstName.charAt(0)}{student.lastName.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="student-info-short">
                                                <h3>{student.firstName} {student.lastName}</h3>
                                                <p>Adm: {student.admissionNo}</p>
                                                <p>{student.mobileNumber}</p>
                                            </div>
                                            <div className={`status-indicator ${student.status === 'Active' ? 'status-active' : 'status-inactive'}`}></div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-students">No students found in this section.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Level 3 - Full Details */}
                <div className="student-details-panel">
                    {studentDetails ? (
                        <>
                            <div className="details-header">
                                <div className="details-avatar-large">
                                    {studentDetails.firstName.charAt(0)}{studentDetails.lastName.charAt(0)}
                                </div>
                                <h2>{studentDetails.firstName} {studentDetails.lastName}</h2>
                                <p>Class {studentDetails.studentClass} - {studentDetails.section} | ID: {studentDetails.admissionNo}</p>
                            </div>
                            
                            <div className="details-tabs">
                                <button 
                                    className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('personal')}
                                >
                                    Personal
                                </button>
                                <button 
                                    className={`tab-btn ${activeTab === 'academics' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('academics')}
                                >
                                    Academics
                                </button>
                                <button 
                                    className={`tab-btn ${activeTab === 'family' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('family')}
                                >
                                    Family
                                </button>
                                <button 
                                    className={`tab-btn ${activeTab === 'address' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('address')}
                                >
                                    Address
                                </button>
                            </div>

                            <div className="details-content">
                                {renderTabContent()}
                            </div>
                        </>
                    ) : (
                        <div className="empty-details">
                            <p>Select a student to view full profile details</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

const DetailRow = ({ label, value }) => (
    <div className="detail-row">
        <div className="detail-label">{label}</div>
        <div className="detail-value">{value || 'N/A'}</div>
    </div>
);

export default StudentExplorer;
