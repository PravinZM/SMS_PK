using Microsoft.AspNetCore.Mvc;
using SMS_Backend.DTOs;
using SMS_Backend.Services;

namespace SMS_Backend.Controllers
{
[Route("api/students")]
[ApiController]
public class StudentController : ControllerBase
{
private readonly IStudentService _studentService;

    public StudentController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var students = await _studentService.GetAllStudentsAsync();

        return Ok(new
        {
            success = true,
            data = students
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var student = await _studentService.GetStudentByIdAsync(id);

        if (student == null)
        {
            return NotFound(new
            {
                success = false,
                message = "Student not found"
            });
        }

        return Ok(new
        {
            success = true,
            data = student
        });
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(
        [FromBody] CreateStudentDto studentDto
    )
    {
        try
        {
            // Validation check
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Save student
            var result = await _studentService.CreateStudentAsync(studentDto);

            if (!result)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to create student"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Student created successfully"
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

            return StatusCode(500, new
            {
                success = false,
                message = ex.Message
            });
        }
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] CreateStudentDto studentDto
    )
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _studentService.UpdateStudentAsync(id, studentDto);

            if (!result)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to update student"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Student updated successfully"
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

            return StatusCode(500, new
            {
                success = false,
                message = ex.Message
            });
        }
    }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _studentService.DeleteStudentAsync(id);

                if (!result)
                {
                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Failed to delete student"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Student deleted successfully"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        // Explorer Endpoints

        [HttpGet("classes")]
        public async Task<IActionResult> GetClasses()
        {
            var classes = await _studentService.GetClassesAsync();
            return Ok(new { success = true, data = classes });
        }

        [HttpGet("sections/{className}")]
        public async Task<IActionResult> GetSections(string className)
        {
            var sections = await _studentService.GetSectionsByClassAsync(className);
            return Ok(new { success = true, data = sections });
        }

        [HttpGet("list/{className}/{section}")]
        public async Task<IActionResult> GetStudentsByClassAndSection(string className, string section)
        {
            var students = await _studentService.GetStudentsByClassAndSectionAsync(className, section);
            return Ok(new { success = true, data = students });
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDetails(Guid id)
        {
            var student = await _studentService.GetStudentByIdAsync(id);
            if (student == null) return NotFound(new { success = false, message = "Student not found" });
            return Ok(new { success = true, data = student });
        }
    }
}
