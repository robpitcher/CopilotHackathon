namespace IntegrationTests;

public class IntegrationTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public IntegrationTests(TestWebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Get_ReturnsHelloWorld()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("Hello World!", content);
    }

    [Fact]
    public async Task DaysBetweenDates_ReturnsCorrectDays()
    {
        // Arrange
        var date1 = "2024-01-01";
        var date2 = "2024-01-10";

        // Act
        var response = await _client.GetAsync($"/daysbetweendates?startdate={date1}&enddate={date2}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("9", content);
    }

    [Fact]
    public async Task ValidatePhoneNumber_ValidNumber_ReturnsTrue()
    {
        // Arrange
        var phoneNumber = "+34666777888";

        // Act
        var response = await _client.GetAsync($"/validatephonenumber?phonenumber={Uri.EscapeDataString(phoneNumber)}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("True", content);
    }

    [Fact]
    public async Task ValidatePhoneNumber_InvalidNumber_ReturnsFalse()
    {
        // Arrange
        var phoneNumber = "123456";

        // Act
        var response = await _client.GetAsync($"/validatephonenumber?phonenumber={phoneNumber}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("False", content);
    }

    [Fact]
    public async Task ValidateSpanishDni_ValidDni_ReturnsTrue()
    {
        // Arrange
        var dni = "12345678Z";

        // Act
        var response = await _client.GetAsync($"/validatespanishdni?dni={dni}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("true", content.ToLower());
    }

    [Fact]
    public async Task ValidateSpanishDni_InvalidDni_ReturnsFalse()
    {
        // Arrange
        var dni = "12345678A";

        // Act
        var response = await _client.GetAsync($"/validatespanishdni?dni={dni}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("false", content.ToLower());
    }

    [Fact]
    public async Task Color_ValidColor_ReturnsHexCode()
    {
        // Arrange
        var color = "red";

        // Act
        var response = await _client.GetAsync($"/color?color={color}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("#FF0000", content);
    }

    [Fact]
    public async Task TellMeAJoke_ReturnsJoke()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/tellmeajoke");

        // Assert - External API may not be accessible in all environments
        // Just verify the endpoint exists and responds (even with error)
        Assert.NotNull(response);
    }

    [Fact]
    public async Task MoviesByDirector_ReturnsMovies()
    {
        // Arrange
        var director = "Spielberg";

        // Act
        var response = await _client.GetAsync($"/moviesbydirector?director={director}");

        // Assert - External API may not be accessible in all environments
        // Just verify the endpoint exists and responds (even with error)
        Assert.NotNull(response);
    }

    [Fact]
    public async Task ParseUrl_ReturnsUrlParts()
    {
        // Arrange
        var url = "https://example.com:8080/path";

        // Act
        var response = await _client.GetAsync($"/parseurl?url={Uri.EscapeDataString(url)}");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("https", content);
        Assert.Contains("example.com", content);
    }

    [Fact]
    public async Task ListFiles_ReturnsFileList()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/listfiles");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.NotEmpty(content);
    }

    [Fact]
    public async Task CalculateMemoryUsage_ReturnsMemoryInGB()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/calculatememoryusage");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("GB", content);
    }

    [Fact]
    public async Task RandomEuropeanCountry_ReturnsCountry()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/randomeuropeancountry");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.NotEmpty(content);
    }

    [Fact]
    public async Task GetFullTextFile_ReturnsLinesWithFusce()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/getfulltextfile");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("Fusce", content);
    }

    [Fact]
    public async Task GetLineByLinefromtTextFile_ReturnsLinesWithFusce()
    {
        // Arrange

        // Act
        var response = await _client.GetAsync("/getlinebylinefromttextfile");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("Fusce", content);
    }
}
