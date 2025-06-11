using System.ComponentModel.DataAnnotations;

namespace MenuMaster.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
        public string Comment { get; set; }
        public User user { get; set; }
        public Restaurant restaurant { get; set; }

    }
}
