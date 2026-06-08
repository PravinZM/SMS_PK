using SMS_Backend.DTOs;

namespace SMS_Backend.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync();
        Task<StudentResponseDto?> GetStudentByIdAsync(string id);
        Task<bool> CreateStudentAsync(CreateStudentDto studentDto);
        Task<bool> UpdateStudentAsync(string id, CreateStudentDto studentDto);
        Task<bool> DeleteStudentAsync(string id);
    }
}
