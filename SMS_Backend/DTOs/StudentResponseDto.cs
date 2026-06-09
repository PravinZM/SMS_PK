namespace SMS_Backend.DTOs
{
    public class StudentResponseDto
    {
        public string StudentId { get; set; } = string.Empty;
        public string AdmissionNo { get; set; } = string.Empty;
        public string RollNo { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime Dob { get; set; }
        public string MobileNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string StudentClass { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public string AcademicYear { get; set; } = string.Empty;
        public string FatherName { get; set; } = string.Empty;
        
        // Detailed info for GET BY ID
        public string? MotherName { get; set; }
        public string? GuardianName { get; set; }
        public string? FatherMobile { get; set; }
        public string? MotherMobile { get; set; }
        public string? GuardianMobile { get; set; }
        public string? ParentEmail { get; set; }
        public string? Occupation { get; set; }
        public string? AnnualIncome { get; set; }
        public DateTime? AdmissionDate { get; set; }
        public string? AadhaarNumber { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Pincode { get; set; }
        public string? BloodGroup { get; set; }
    }
}
