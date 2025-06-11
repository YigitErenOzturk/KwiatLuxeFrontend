namespace MenuMaster.Models
{
    public class Dish
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public Menu menu { get; set; }
    }
}
