/// <summary>
/// Minimal Web API with multiple endpoints for demonstrating various .NET features
/// </summary>
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register a HttpClient so IHttpClientFactory can be used to create HttpClient instances.
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/// <summary>
/// GET / - Returns a simple "Hello World!" greeting
/// </summary>
app.MapGet("/", () => "Hello World!")
    .WithName("HelloWorld")
    .WithTags("Basic");

/// <summary>
/// GET /daysbetweendates - Calculates the number of days between two dates
/// </summary>
/// <param name="startdate">The start date</param>
/// <param name="enddate">The end date</param>
/// <returns>The number of days between the two dates as a string</returns>
app.MapGet("/daysbetweendates", (DateTime startdate, DateTime enddate) => (enddate - startdate).TotalDays.ToString())
    .WithName("DaysBetweenDates")
    .WithTags("Date Operations");

/// <summary>
/// GET /validatephonenumber - Validates a phone number using regex
/// </summary>
/// <param name="phonenumber">The phone number to validate (e.g., +34666777888)</param>
/// <returns>True if valid, False otherwise</returns>
app.MapGet("/validatephonenumber", (string phonenumber) => Regex.IsMatch(phonenumber, @"^\+\d{10,15}$").ToString())
    .WithName("ValidatePhoneNumber")
    .WithTags("Validation");

/// <summary>
/// GET /validatespanishdni - Validates a Spanish DNI number
/// </summary>
/// <param name="dni">The DNI to validate (e.g., 12345678Z)</param>
/// <returns>True if valid, False otherwise</returns>
app.MapGet("/validatespanishdni", (string dni) =>
{
    if (dni.Length != 9) return false;
    var dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
    var dniNumber = int.Parse(dni.Substring(0, 8));
    var dniLetter = dniLetters[dniNumber % 23];
    return dniLetter == dni[8];
})
.WithName("ValidateSpanishDNI")
.WithTags("Validation");

/// <summary>
/// GET /color - Returns the hex color code for a given color name
/// </summary>
/// <param name="color">The color name (e.g., red, blue, green)</param>
/// <returns>The hex color code</returns>
app.MapGet("/color", (string color) =>
{
    var colors = JsonSerializer.Deserialize<Color[]>(File.ReadAllText("colors.json"));
    return colors.First(c => c.Name == color).Code.HEX;
})
.WithName("GetColorCode")
.WithTags("Data");

/// <summary>
/// GET /tellmeajoke - Fetches a random joke from an external API
/// </summary>
/// <returns>A random joke object</returns>
app.MapGet("/tellmeajoke", async (IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();
    var response = await client.GetAsync("https://v2.jokeapi.dev/joke/Any");
    var content = await response.Content.ReadAsStringAsync();
    return JsonSerializer.Deserialize<dynamic>(content);
})
.WithName("TellMeAJoke")
.WithTags("External APIs");

/// <summary>
/// GET /moviesbydirector - Fetches movies by a director from OMDB API
/// </summary>
/// <param name="director">The director's name</param>
/// <returns>A list of movies by the director</returns>
app.MapGet("/moviesbydirector", async (string director, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();
    var response = await client.GetAsync($"http://www.omdbapi.com/?apikey=4e3b711b&r=json&s={director}");
    var content = await response.Content.ReadAsStringAsync();
    return JsonSerializer.Deserialize<dynamic>(content);
})
.WithName("MoviesByDirector")
.WithTags("External APIs");

/// <summary>
/// GET /parseurl - Parses a URL and returns its components
/// </summary>
/// <param name="url">The URL to parse</param>
/// <returns>An object containing protocol, host, and path</returns>
app.MapGet("/parseurl", (string url) =>
{
    var uri = new Uri(url);
    return new { Protocol = uri.Scheme, Host = uri.Host, Path = uri.AbsolutePath };
})
.WithName("ParseUrl")
.WithTags("Utilities");

/// <summary>
/// GET /listfiles - Lists all files in the current directory
/// </summary>
/// <returns>A JSON array of file paths</returns>
app.MapGet("/listfiles", () =>
{
    var files = Directory.GetFileSystemEntries(Directory.GetCurrentDirectory());
    return JsonSerializer.Serialize(files);
})
.WithName("ListFiles")
.WithTags("File Operations");

/// <summary>
/// GET /calculatememoryusage - Returns the current memory usage of the process
/// </summary>
/// <returns>Memory usage in GB</returns>
app.MapGet("/calculatememoryusage", () =>
{
    var process = Process.GetCurrentProcess();
    return $"{process.WorkingSet64 / 1024 / 1024 / 1024} GB";
})
.WithName("CalculateMemoryUsage")
.WithTags("System");

/// <summary>
/// GET /randomeuropeancountry - Returns a random European country
/// </summary>
/// <returns>A random European country name</returns>
app.MapGet("/randomeuropeancountry", () =>
{
    var countries = new[] { "Spain", "France", "Germany", "Italy", "Portugal", "Sweden", "Norway", "Denmark", "Finland", "Iceland", "Ireland", "United Kingdom", "Greece", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Estonia", "Hungary", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Romania", "Slovakia", "Slovenia" };
    return countries[new Random().Next(0, countries.Length)];
})
.WithName("RandomEuropeanCountry")
.WithTags("Random");

/// <summary>
/// GET /getfulltextfile - Reads sample.txt and returns lines containing "Fusce"
/// </summary>
/// <returns>A list of lines containing "Fusce"</returns>
app.MapGet("/getfulltextfile", () =>
{
    var lines = File.ReadAllLines("sample.txt");
    return lines.Where(line => line.Contains("Fusce")).ToList();
})
.WithName("GetFullTextFile")
.WithTags("File Operations");

/// <summary>
/// GET /getlinebylinefromttextfile - Reads sample.txt line by line and returns lines containing "Fusce"
/// </summary>
/// <returns>A list of lines containing "Fusce"</returns>
app.MapGet("/getlinebylinefromttextfile", async () =>
{
    var result = new List<string>();
    using (var reader = new StreamReader("sample.txt"))
    {
        string line;
        while ((line = await reader.ReadLineAsync()) != null)
        {
            if (line.Contains("Fusce"))
            {
                result.Add(line);
            }
        }
    }
    return result;
})
.WithName("GetLineByLineFromTextFile")
.WithTags("File Operations");

app.Run();

// Needed to be able to access this type from the MinimalAPI.Tests project.
public partial class Program
{ }
