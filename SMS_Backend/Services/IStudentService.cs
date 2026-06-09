using SMS_Backend.DTOs;

namespace SMS_Backend.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync();
        Task<StudentResponseDto?> GetStudentByIdAsync(Guid id);
        Task<bool> CreateStudentAsync(CreateStudentDto studentDto);
        Task<bool> UpdateStudentAsync(Guid id, CreateStudentDto studentDto);
        Task<bool> DeleteStudentAsync(Guid id);

        // Explorer Methods
        Task<IEnumerable<string>> GetClassesAsync();
        Task<IEnumerable<string>> GetSectionsByClassAsync(string className);
        Task<IEnumerable<StudentResponseDto>> GetStudentsByClassAndSectionAsync(string className, string section);
    }
}
