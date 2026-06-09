using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SMS_Backend.Models
{
    [Table("parents")]
    public class Parent
    {
        [Key]
        [Column("parent_id")]
        public string ParentId { get; set; } = string.Empty;

        [Column("father_name")]
        public string FatherName { get; set; } = string.Empty;

        [Column("mother_name")]
        public string MotherName { get; set; } = string.Empty;

        [Column("guardian_name")]
        public string? GuardianName { get; set; }

        [Column("father_mobile")]
        public string FatherMobile { get; set; } = string.Empty;

        [Column("mother_mobile")]
        public string MotherMobile { get; set; } = string.Empty;

        [Column("guardian_mobile")]
        public string? GuardianMobile { get; set; }

        [Column("parent_email")]
        public string ParentEmail { get; set; } = string.Empty;

        [Column("occupation")]
        public string Occupation { get; set; } = string.Empty;

        [Column("annual_income")]
        public string AnnualIncome { get; set; } = string.Empty;
    }
}
