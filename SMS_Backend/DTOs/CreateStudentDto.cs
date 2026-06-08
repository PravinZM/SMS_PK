namespace SMS_Backend.DTOs
{
    public class CreateStudentDto
    {
        // Student Info
        public string AdmissionNo { get; set; } = string.Empty;
        public string RollNo { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime Dob { get; set; }
        public string BloodGroup { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string AadhaarNumber { get; set; } = string.Empty;
        public string? ProfileImage { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";

        // Parent Info
        public string FatherName { get; set; } = string.Empty;
        public string MotherName { get; set; } = string.Empty;
        public string? GuardianName { get; set; }
        public string FatherMobile { get; set; } = string.Empty;
        public string MotherMobile { get; set; } = string.Empty;
        public string? GuardianMobile { get; set; }
        public string ParentEmail { get; set; } = string.Empty;
        public string Occupation { get; set; } = string.Empty;
        public string AnnualIncome { get; set; } = string.Empty;

        // Academic Info
        public string AcademicYear { get; set; } = string.Empty;
        public string StudentClass { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public DateTime AdmissionDate { get; set; }
    }
}
