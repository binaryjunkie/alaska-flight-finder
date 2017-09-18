using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using AlaskaReact.Models;

namespace AlaskaReact.Controllers
{
    [Produces("application/json")]
    [Route("api/airports")]
    public class AirportsController : Controller
    {
        private Airport[] GetAirportsData()
        {
            using (TextReader reader = new StreamReader("./Data/airports.csv"))
            {
                CsvReader csv = new CsvReader(reader);
                return csv.GetRecords<Airport>().ToArray();
            }
        }

        // GET: data/Airports
        [HttpGet]
        public IEnumerable<Airport> Get()
        {
            return GetAirportsData();
        }
    }
}
