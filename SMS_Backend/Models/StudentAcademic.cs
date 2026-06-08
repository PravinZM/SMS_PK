using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SMS_Backend.Models
{
    [Table("student_academic")]
    public class StudentAcademic
    {
        [Key]
        [Column("academic_id")]
        public Guid AcademicId { get; set; }

        [Column("student_id")]
        public Guid StudentId { get; set; }

        [Column("academic_year")]
        public string AcademicYear { get; set; } = string.Empty;

        [Column("class_name")]
        public string ClassName { get; set; } = string.Empty;

        [Column("section")]
        public string Section { get; set; } = string.Empty;

        [Column("admission_date")]
        public DateTime AdmissionDate { get; set; }
    }
}
