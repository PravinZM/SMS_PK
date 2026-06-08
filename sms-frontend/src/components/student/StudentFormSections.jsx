import React from 'react';
import { User, Users, GraduationCap, MapPin, Camera } from 'lucide-react';

export const PrimaryInformation = ({ formData, handleChange }) => (
  <div className="form-section-card">
    <div className="section-header">
      <h3><span>1</span> Primary Information</h3>
    </div>
    <div className="form-grid">
      <div className="input-group">
        <label>Admission No</label>
        <input 
          type="text" 
          name="admissionNo" 
          value={formData.admissionNo} 
          onChange={handleChange} 
          placeholder="e.g. ADM-2026-001"
        />
      </div>
      <div className="input-group">
        <label>Roll No</label>
        <input 
          type="text" 
          name="rollNo" 
          value={formData.rollNo} 
          onChange={handleChange} 
          placeholder="e.g. 101"
        />
      </div>
      <div className="input-group">
        <label>First Name</label>
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          placeholder="Enter first name"
        />
      </div>
      <div className="input-group">
        <label>Last Name</label>
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          placeholder="Enter last name"
        />
      </div>
      <div className="input-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-group">
        <label>Date of Birth</label>
        <input 
          type="date" 
          name="dob" 
          value={formData.dob} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group">
        <label>Blood Group</label>
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
      <div className="input-group">
        <label>Mobile Number</label>
        <input 
          type="tel" 
          name="mobileNumber" 
          value={formData.mobileNumber} 
          onChange={handleChange} 
          placeholder="+91 XXXXX XXXXX"
        />
      </div>
      <div className="input-group">
        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="student@example.com"
        />
      </div>
      <div className="input-group">
        <label>Aadhaar Number</label>
        <input 
          type="text" 
          name="aadhaarNumber" 
          value={formData.aadhaarNumber} 
          onChange={handleChange} 
          placeholder="XXXX XXXX XXXX"
        />
      </div>
      <div className="input-group full-width">
        <label>Profile Image</label>
        <div className="profile-upload-container">
          <div className="profile-preview">
            <Camera size={32} />
          </div>
          <div className="upload-info">
            <h4>Upload Student Photo</h4>
            <p>PNG, JPG or JPEG. Max 2MB.</p>
            <label className="upload-btn">
              Choose File
              <input type="file" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ParentInformation = ({ formData, handleChange }) => (
  <div className="form-section-card">
    <div className="section-header">
      <h3><span>2</span> Parent Information</h3>
    </div>
    <div className="form-grid">
      <div className="input-group">
        <label>Father Name</label>
        <input 
          type="text" 
          name="fatherName" 
          value={formData.fatherName} 
          onChange={handleChange} 
          placeholder="Enter father's name"
        />
      </div>
      <div className="input-group">
        <label>Mother Name</label>
        <input 
          type="text" 
          name="motherName" 
          value={formData.motherName} 
          onChange={handleChange} 
          placeholder="Enter mother's name"
        />
      </div>
      <div className="input-group">
        <label>Guardian Name</label>
        <input 
          type="text" 
          name="guardianName" 
          value={formData.guardianName} 
          onChange={handleChange} 
          placeholder="Enter guardian's name"
        />
      </div>
      <div className="input-group">
        <label>Father Mobile</label>
        <input 
          type="tel" 
          name="fatherMobile" 
          value={formData.fatherMobile} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group">
        <label>Mother Mobile</label>
        <input 
          type="tel" 
          name="motherMobile" 
          value={formData.motherMobile} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group">
        <label>Guardian Mobile</label>
        <input 
          type="tel" 
          name="guardianMobile" 
          value={formData.guardianMobile} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group">
        <label>Parent Email</label>
        <input 
          type="email" 
          name="parentEmail" 
          value={formData.parentEmail} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group">
        <label>Occupation</label>
        <input 
          type="text" 
          name="occupation" 
          value={formData.occupation} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group full-width">
        <label>Annual Income</label>
        <input 
          type="text" 
          name="annualIncome" 
          value={formData.annualIncome} 
          onChange={handleChange} 
        />
      </div>
    </div>
  </div>
);

export const AcademicInformation = ({ formData, handleChange }) => (
  <div className="form-section-card">
    <div className="section-header">
      <h3><span>3</span> Academic Information</h3>
    </div>
    <div className="form-grid">
      <div className="input-group">
        <label>Academic Year</label>
        <select name="academicYear" value={formData.academicYear} onChange={handleChange}>
          <option>2024-2025</option>
          <option>2023-2024</option>
        </select>
      </div>
      <div className="input-group">
        <label>Class</label>
        <select name="studentClass" value={formData.studentClass} onChange={handleChange}>
          <option value="">Select Class</option>
          {['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'].map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>Section</label>
        <select name="section" value={formData.section} onChange={handleChange}>
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>
      <div className="input-group">
        <label>Admission Date</label>
        <input 
          type="date" 
          name="admissionDate" 
          value={formData.admissionDate} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group full-width">
        <label>Student Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>
    </div>
  </div>
);

export const AddressInformation = ({ formData, handleChange }) => (
  <div className="form-section-card">
    <div className="section-header">
      <h3><span>4</span> Address Information</h3>
    </div>
    <div className="form-grid">
      <div className="input-group full-width">
        <label>Address</label>
        <textarea 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          rows="3"
          placeholder="Enter full address"
        ></textarea>
      </div>
      <div className="input-group">
        <label>City</label>
        <input 
          type="text" 
          name="city" 
          value={formData.city} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group">
        <label>State</label>
        <input 
          type="text" 
          name="state" 
          value={formData.state} 
          onChange={handleChange} 
        />
      </div>
      <div className="input-group full-width">
        <label>Pincode</label>
        <input 
          type="text" 
          name="pincode" 
          value={formData.pincode} 
          onChange={handleChange} 
        />
      </div>
    </div>
  </div>
);
