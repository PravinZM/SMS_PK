import React, { useState, useEffect, useCallback } from 'react';
import { X, Save, FileText, ChevronRight, LayoutList, Layers, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { 
  PrimaryInformation, 
  ParentInformation, 
  AcademicInformation, 
  AddressInformation 
} from './StudentFormSections';
import studentService from '../../services/studentService';
import SuccessModal from '../modals/SuccessModal';
import './studentForm.css';

const STEPS = [
  { id: 1, label: 'Primary Info' },
  { id: 2, label: 'Parent Info' },
  { id: 3, label: 'Academic Info' },
  { id: 4, label: 'Address Info' }
];

const INITIAL_FORM_DATA = {
  admissionNo: '',
  rollNo: '',
  firstName: '',
  lastName: '',
  gender: '',
  dob: '',
  bloodGroup: '',
  mobileNumber: '',
  email: '',
  aadhaarNumber: '',
  fatherName: '',
  motherName: '',
  guardianName: '',
  fatherMobile: '',
  motherMobile: '',
  guardianMobile: '',
  parentEmail: '',
  occupation: '',
  annualIncome: '',
  academicYear: '2024-2025',
  studentClass: '',
  section: '',
  admissionDate: '',
  status: 'Active',
  address: '',
  city: '',
  state: '',
  pincode: ''
};

const AddStudentDrawer = ({ isOpen, onClose, onSuccess }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'stepper'
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEsc = useCallback((event) => {
    if (event.keyCode === 27 && !isLoading) {
      onClose();
    }
  }, [onClose, isLoading]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc, false);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.removeEventListener('keydown', handleEsc, false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEsc]);

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'admissionNo', 'studentClass'];
    for (const field of required) {
      if (!formData[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    return true;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await studentService.createStudent(formData);
      if (result.success) {
        setShowSuccess(true);
        setFormData(INITIAL_FORM_DATA);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error('Error saving student:', err);
      setError(err.message || 'Failed to save student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    onClose();
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <PrimaryInformation formData={formData} handleChange={handleChange} />;
      case 1: return <ParentInformation formData={formData} handleChange={handleChange} />;
      case 2: return <AcademicInformation formData={formData} handleChange={handleChange} />;
      case 3: return <AddressInformation formData={formData} handleChange={handleChange} />;
      default: return null;
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div 
        className={`drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={!isLoading ? onClose : undefined}
      ></div>
      
      <div className={`student-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="header-title-container">
            <h2>Add Student</h2>
            <p>Register a new student to the system</p>
            <div className="breadcrumb-small">
              Home <ChevronRight size={10} style={{ display: 'inline' }} /> 
              Student <ChevronRight size={10} style={{ display: 'inline' }} /> 
              Add Student
            </div>
          </div>
          
          <div className="header-actions">
            <div className="view-switcher">
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
                disabled={isLoading}
              >
                <LayoutList size={20} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'stepper' ? 'active' : ''}`}
                onClick={() => setViewMode('stepper')}
                title="Stepper View"
                disabled={isLoading}
              >
                <Layers size={20} />
              </button>
            </div>

            <button className="btn-save-draft" onClick={handleSaveDraft} disabled={isLoading}>
              <FileText size={18} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
              Save Draft
            </button>
            <button className="btn-save-student" onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
              ) : (
                <Save size={18} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
              )}
              {isLoading ? 'Saving...' : 'Save Student'}
            </button>
            <button className="close-drawer-btn" onClick={onClose} disabled={isLoading}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="drawer-content">
          {error && (
            <div style={{ 
              background: '#fee2e2', 
              color: '#b91c1c', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          {viewMode === 'list' ? (
            <form onSubmit={handleSave}>
              <PrimaryInformation formData={formData} handleChange={handleChange} />
              <ParentInformation formData={formData} handleChange={handleChange} />
              <AcademicInformation formData={formData} handleChange={handleChange} />
              <AddressInformation formData={formData} handleChange={handleChange} />
            </form>
          ) : (
            <div className="stepper-view">
              <div className="stepper-container">
                {STEPS.map((step, index) => (
                  <div 
                    key={step.id} 
                    className={`step-item ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''}`}
                    onClick={() => !isLoading && setCurrentStep(index)}
                  >
                    <div className="step-dot">{index + 1}</div>
                    <div className="step-label">{step.label}</div>
                  </div>
                ))}
              </div>
              <div className="stepper-content">
                {renderStepContent()}
              </div>
            </div>
          )}
        </div>

        {viewMode === 'stepper' && (
          <div className="stepper-footer">
            <button 
              className="btn-prev" 
              onClick={prevStep}
              disabled={currentStep === 0 || isLoading}
              style={{ opacity: (currentStep === 0 || isLoading) ? 0.5 : 1, cursor: (currentStep === 0 || isLoading) ? 'not-allowed' : 'pointer' }}
            >
              <ArrowLeft size={18} />
              Previous
            </button>
            <button className="btn-next" onClick={nextStep} disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : currentStep === STEPS.length - 1 ? (
                <Save size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
              {isLoading ? 'Saving...' : currentStep === STEPS.length - 1 ? 'Save Student' : 'Next Step'}
            </button>
          </div>
        )}
      </div>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={handleSuccessClose} 
        title="Registration Successful" 
        message="The student has been successfully registered in the ERP system." 
      />
    </>
  );
};

export default AddStudentDrawer;
