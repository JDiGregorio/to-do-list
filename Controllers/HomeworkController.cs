using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using TODO_LIST.Models;

namespace TODO_LIST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeworkController : ControllerBase
    {
        private readonly PubContext _dbcontext;

        public HomeworkController(PubContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("GetHomeworks")]
        public async Task<IActionResult> GetHomeworks() {
            List<Homework> lista = _dbcontext.Homeworks.OrderByDescending(option => option.IdHomework).ThenBy(option => option.CreatedAt).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("StoreHomework")]
        public async Task<IActionResult> StoreHomework([FromBody] Homework homework) {
            await _dbcontext.Homeworks.AddAsync(homework);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("CloseHomework/{id:int}")]
        public async Task<IActionResult> CloseHomework(int id)
        {
            long vId = Convert.ToInt64(id);

            Homework homework = _dbcontext.Homeworks.Find(vId);

            _dbcontext.Homeworks.Remove(homework);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");

        }
    }
}
