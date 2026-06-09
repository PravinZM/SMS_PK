using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SMS_Backend.Models
{
    [Table("students")]
    public class Student
    {
        [Key]
        [Column("student_id")]
        public Guid StudentId { get; set; }

        [Column("admission_no")]
        public string AdmissionNo { get; set; } = string.Empty;

        [Column("roll_no")]
        public string RollNo { get; set; } = string.Empty;

        [Column("first_name")]
        public string FirstName { get; set; } = string.Empty;

        [Column("last_name")]
        public string LastName { get; set; } = string.Empty;

        [Column("gender")]
        public string Gender { get; set; } = string.Empty;

        [Column("dob")]
        public DateTime Dob { get; set; }

        [Column("blood_group")]
        public string BloodGroup { get; set; } = string.Empty;

        [Column("mobile_number")]
        public string MobileNumber { get; set; } = string.Empty;

        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("aadhaar_number")]
        public string AadhaarNumber { get; set; } = string.Empty;

        [Column("profile_image")]
        public string? ProfileImage { get; set; }

        [Column("address")]
        public string Address { get; set; } = string.Empty;

        [Column("city")]
        public string City { get; set; } = string.Empty;

        [Column("state")]
        public string State { get; set; } = string.Empty;

        [Column("pincode")]
        public string Pincode { get; set; } = string.Empty;

        [Column("status")]
        public string Status { get; set; } = "Active";

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
