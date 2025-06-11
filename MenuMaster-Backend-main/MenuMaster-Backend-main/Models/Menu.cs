namespace MenuMaster.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public Restaurant restaurant { get; set; }
    }
}
