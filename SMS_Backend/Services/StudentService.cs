using Microsoft.EntityFrameworkCore;
using SMS_Backend.Data;
using SMS_Backend.DTOs;
using SMS_Backend.Models;

namespace SMS_Backend.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync()
        {
            var students = await (from s in _context.Students
                                  join a in _context.StudentAcademics on s.StudentId equals a.StudentId into sa
                                  from a in sa.DefaultIfEmpty()
                                  join m in _context.StudentParentMappings on s.StudentId equals m.StudentId into sm
                                  from m in sm.DefaultIfEmpty()
                                  join p in _context.Parents on m.ParentId equals p.ParentId into mp
                                  from p in mp.DefaultIfEmpty()
                                  orderby s.CreatedAt descending
                                  select new StudentResponseDto
                                  {
                                      StudentId = s.StudentId,
                                      AdmissionNo = s.AdmissionNo,
                                      RollNo = s.RollNo,
                                      FirstName = s.FirstName,
                                      LastName = s.LastName,
                                      Gender = s.Gender,
                                      Dob = s.Dob,
                                      MobileNumber = s.MobileNumber,
                                      Email = s.Email,
                                      Status = s.Status,
                                      StudentClass = a != null ? a.ClassName : string.Empty,
                                      Section = a != null ? a.Section : string.Empty,
                                      AcademicYear = a != null ? a.AcademicYear : string.Empty,
                                      FatherName = p != null ? p.FatherName : string.Empty
                                  }).ToListAsync();

            return students;
        }

        public async Task<StudentResponseDto?> GetStudentByIdAsync(Guid id)
        {
            var student = await (from s in _context.Students
                                 join a in _context.StudentAcademics on s.StudentId equals a.StudentId into sa
                                 from a in sa.DefaultIfEmpty()
                                 join m in _context.StudentParentMappings on s.StudentId equals m.StudentId into sm
                                 from m in sm.DefaultIfEmpty()
                                 join p in _context.Parents on m.ParentId equals p.ParentId into mp
                                 from p in mp.DefaultIfEmpty()
                                 where s.StudentId == id
                                 select new StudentResponseDto
                                 {
                                     StudentId = s.StudentId,
                                     AdmissionNo = s.AdmissionNo,
                                     RollNo = s.RollNo,
                                     FirstName = s.FirstName,
                                     LastName = s.LastName,
                                     Gender = s.Gender,
                                     Dob = s.Dob,
                                     MobileNumber = s.MobileNumber,
                                     Email = s.Email,
                                     Status = s.Status,
                                     StudentClass = a != null ? a.ClassName : string.Empty,
                                     Section = a != null ? a.Section : string.Empty,
                                     AcademicYear = a != null ? a.AcademicYear : string.Empty,
                                     FatherName = p != null ? p.FatherName : string.Empty,
                                     MotherName = p != null ? p.MotherName : string.Empty,
                                     GuardianName = p != null ? p.GuardianName : string.Empty,
                                     FatherMobile = p != null ? p.FatherMobile : string.Empty,
                                     MotherMobile = p != null ? p.MotherMobile : string.Empty,
                                     GuardianMobile = p != null ? p.GuardianMobile : string.Empty,
                                     ParentEmail = p != null ? p.ParentEmail : string.Empty,
                                     Occupation = p != null ? p.Occupation : string.Empty,
                                     AnnualIncome = p != null ? p.AnnualIncome : string.Empty,
                                     AdmissionDate = a != null ? a.AdmissionDate : null,
                                     AadhaarNumber = s.AadhaarNumber,
                                     Address = s.Address,
                                     City = s.City,
                                     State = s.State,
                                     Pincode = s.Pincode,
                                     BloodGroup = s.BloodGroup
                                     }).FirstOrDefaultAsync();

                                     return student;
                                     }


public async Task<bool> CreateStudentAsync(CreateStudentDto dto)
{
    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {
        Console.WriteLine("===== CREATE STUDENT START =====");

        var studentId = Guid.NewGuid();
        var parentId = Guid.NewGuid();
        var mappingId = Guid.NewGuid();
        var academicId = Guid.NewGuid();

        // ==========================
        // SAVE STUDENT
        // ==========================
        Console.WriteLine("Saving Student...");

        var student = new Student
        {
            StudentId = studentId,
            AdmissionNo = dto.AdmissionNo,
            RollNo = dto.RollNo,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Gender = dto.Gender,
            Dob = dto.Dob,
            BloodGroup = dto.BloodGroup,
            MobileNumber = dto.MobileNumber,
            Email = dto.Email,
            AadhaarNumber = dto.AadhaarNumber,
            Address = dto.Address,
            City = dto.City,
            State = dto.State,
            Pincode = dto.Pincode,
            Status = dto.Status
        };

        _context.Students.Add(student);

        await _context.SaveChangesAsync();

        Console.WriteLine("Student Saved Successfully");

        // ==========================
        // SAVE PARENT
        // ==========================
        Console.WriteLine("Saving Parent...");

        var parent = new Parent
        {
            ParentId = parentId,
            FatherName = dto.FatherName,
            MotherName = dto.MotherName,
            GuardianName = dto.GuardianName,
            FatherMobile = dto.FatherMobile,
            MotherMobile = dto.MotherMobile,
            GuardianMobile = dto.GuardianMobile,
            ParentEmail = dto.ParentEmail,
            Occupation = dto.Occupation,
            AnnualIncome = dto.AnnualIncome
        };

        _context.Parents.Add(parent);

        await _context.SaveChangesAsync();

        Console.WriteLine("Parent Saved Successfully");

        // ==========================
        // SAVE ACADEMIC
        // ==========================
        Console.WriteLine("Saving Academic...");

        var academic = new StudentAcademic
        {
            AcademicId = academicId,
            StudentId = studentId,
            AcademicYear = dto.AcademicYear,
            ClassName = dto.StudentClass,
            Section = dto.Section,
            AdmissionDate = dto.AdmissionDate 
        };

        _context.StudentAcademics.Add(academic);

        await _context.SaveChangesAsync();

        Console.WriteLine("Academic Saved Successfully");

        // ==========================
        // SAVE MAPPING
        // ==========================
        Console.WriteLine("Saving Mapping...");

        var mapping = new StudentParentMapping
        {
            MappingId = mappingId,
            StudentId = studentId,
            ParentId = parentId,
            RelationshipType = "Father"
        };

        _context.StudentParentMappings.Add(mapping);

        await _context.SaveChangesAsync();

        Console.WriteLine("Mapping Saved Successfully");

        // ==========================
        // COMMIT
        // ==========================
        await transaction.CommitAsync();

        Console.WriteLine("===== ALL DATA SAVED SUCCESSFULLY =====");

        return true;
    }
    catch (Exception ex)
    {
        await transaction.RollbackAsync();

        Console.WriteLine("===== ERROR OCCURRED =====");
        Console.WriteLine(ex.ToString());

        return false;
    }
}


public async Task<bool> UpdateStudentAsync(Guid id, CreateStudentDto dto)
{
    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
            return false;

        // =========================
        // UPDATE STUDENT
        // =========================

        student.AdmissionNo = dto.AdmissionNo;
        student.RollNo = dto.RollNo;
        student.FirstName = dto.FirstName;
        student.LastName = dto.LastName;
        student.Gender = dto.Gender;
        student.Dob = dto.Dob;
        student.BloodGroup = dto.BloodGroup;
        student.MobileNumber = dto.MobileNumber;
        student.Email = dto.Email;
        student.AadhaarNumber = dto.AadhaarNumber;
        student.ProfileImage = dto.ProfileImage;
        student.Address = dto.Address;
        student.City = dto.City;
        student.State = dto.State;
        student.Pincode = dto.Pincode;
        student.Status = dto.Status;

        await _context.SaveChangesAsync();

        // =========================
        // UPDATE PARENT
        // =========================

        var mapping = await _context.StudentParentMappings
            .FirstOrDefaultAsync(m => m.StudentId == id);

        if (mapping != null)
        {
            var parent = await _context.Parents
                .FindAsync(mapping.ParentId);

            if (parent != null)
            {
                parent.FatherName = dto.FatherName;
                parent.MotherName = dto.MotherName;
                parent.GuardianName = dto.GuardianName;
                parent.FatherMobile = dto.FatherMobile;
                parent.MotherMobile = dto.MotherMobile;
                parent.GuardianMobile = dto.GuardianMobile;
                parent.ParentEmail = dto.ParentEmail;
                parent.Occupation = dto.Occupation;
                parent.AnnualIncome = dto.AnnualIncome;

                await _context.SaveChangesAsync();
            }
        }

        // =========================
        // UPDATE ACADEMIC
        // =========================

        var academic = await _context.StudentAcademics
            .FirstOrDefaultAsync(a => a.StudentId == id);

        if (academic != null)
        {
            academic.AcademicYear = dto.AcademicYear;
            academic.ClassName = dto.StudentClass;
            academic.Section = dto.Section;
            academic.AdmissionDate = dto.AdmissionDate;

            await _context.SaveChangesAsync();
        }

        await transaction.CommitAsync();

        return true;
    }
    catch (Exception ex)
    {
        await transaction.RollbackAsync();

        Console.WriteLine("=================================");
        Console.WriteLine("UPDATE STUDENT ERROR");
        Console.WriteLine(ex.ToString());
        Console.WriteLine("=================================");

        return false;
    }
}

        public async Task<bool> DeleteStudentAsync(Guid id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null) return false;

                var mapping = await _context.StudentParentMappings.FirstOrDefaultAsync(m => m.StudentId == id);
                if (mapping != null)
                {
                    var parentId = mapping.ParentId;
                    _context.StudentParentMappings.Remove(mapping);

                    // Check if parent is shared
                    var isShared = await _context.StudentParentMappings.AnyAsync(m => m.ParentId == parentId);
                    if (!isShared)
                    {
                        var parent = await _context.Parents.FindAsync(parentId);
                        if (parent != null) _context.Parents.Remove(parent);
                    }
                }

                var academics = _context.StudentAcademics.Where(a => a.StudentId == id);
                _context.StudentAcademics.RemoveRange(academics);

                _context.Students.Remove(student);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error deleting student: {ex.Message}");
                return false;
            }
        }

        public async Task<IEnumerable<string>> GetClassesAsync()
        {
            return await _context.StudentAcademics
                .Select(a => a.ClassName)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetSectionsByClassAsync(string className)
        {
            return await _context.StudentAcademics
                .Where(a => a.ClassName == className)
                .Select(a => a.Section)
                .Distinct()
                .OrderBy(s => s)
                .ToListAsync();
        }

        public async Task<IEnumerable<StudentResponseDto>> GetStudentsByClassAndSectionAsync(string className, string section)
        {
            return await (from s in _context.Students
                          join a in _context.StudentAcademics on s.StudentId equals a.StudentId
                          where a.ClassName == className && a.Section == section
                          orderby s.FirstName, s.LastName
                          select new StudentResponseDto
                          {
                              StudentId = s.StudentId,
                              AdmissionNo = s.AdmissionNo,
                              RollNo = s.RollNo,
                              FirstName = s.FirstName,
                              LastName = s.LastName,
                              Gender = s.Gender,
                              Dob = s.Dob,
                              MobileNumber = s.MobileNumber,
                              Email = s.Email,
                              Status = s.Status,
                              StudentClass = a.ClassName,
                              Section = a.Section,
                              AcademicYear = a.AcademicYear
                          }).ToListAsync();
        }
    }
}
