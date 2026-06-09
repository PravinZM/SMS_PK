using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SMS_Backend.Models
{
    [Table("student_parent_mapping")]
    public class StudentParentMapping
    {
        [Key]
        [Column("mapping_id")]
        public string MappingId { get; set; } = string.Empty;

        [Column("student_id")]
        public string StudentId { get; set; } = string.Empty;

        [Column("parent_id")]
        public string ParentId { get; set; } = string.Empty;
    }
}
