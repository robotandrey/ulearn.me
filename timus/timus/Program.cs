using System.Globalization;

namespace timus
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var input = Console.In.ReadToEnd();
            var numbers = input
                .Split((char[])null, StringSplitOptions.RemoveEmptyEntries)
                .Select(ulong.Parse)
                .Reverse();

            foreach (var item in numbers)
            {
                double sqrt = Math.Sqrt(item);
                Console.WriteLine(sqrt.ToString("F4", CultureInfo.InvariantCulture));
            }
        }
    }
}
