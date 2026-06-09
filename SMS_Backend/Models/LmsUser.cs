using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SMS_Backend.Models
{
    [Table("lms_user")]
    public class LmsUser
    {
        [Key]
        public Guid lms_user_id { get; set; }

        public string full_name { get; set; } = string.Empty;

        public string email { get; set; } = string.Empty;

        public string password { get; set; } = string.Empty;

        public string role_name { get; set; } = string.Empty;

        public bool is_active { get; set; }

        public bool is_deleted { get; set; }
    }
}