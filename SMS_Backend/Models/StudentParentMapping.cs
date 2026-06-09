using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SMS_Backend.Models
{
    [Table("student_parent_mapping")]
    public class StudentParentMapping
    {
        [Key]
        [Column("mapping_id")]
        public Guid MappingId { get; set; }

        [Column("student_id")]
        public Guid StudentId { get; set; }

        [Column("parent_id")]
        public Guid ParentId { get; set; }

        [Column("relationship_type")]
        public string RelationshipType { get; set; } = string.Empty;
    }
}
