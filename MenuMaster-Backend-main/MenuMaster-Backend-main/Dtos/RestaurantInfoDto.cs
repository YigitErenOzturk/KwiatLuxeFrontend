namespace MenuMaster.Dtos
{
    public class RestaurantInfoDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
