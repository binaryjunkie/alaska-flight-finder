using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using AlaskaReact.Models;

namespace AlaskaReact.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")] 
    public class FlightsController : Controller
    {
        private Flight[] GetFlightsData()
        {
            using (TextReader reader = new StreamReader("./Data/flights.csv"))
            {
                CsvReader csv = new CsvReader(reader);
                return csv.GetRecords<Flight>().ToArray();
            }
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Flight> Get()
        {
            return GetFlightsData();
        }
    }
}
