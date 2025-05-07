namespace _1296hypertransition
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            var consistency = new int[n];
            for (int i = 0; i < consistency.Length; i++)
            {
                consistency[i] = int.Parse(Console.ReadLine());
            }
            Console.WriteLine(FindBestConsistenty(consistency));
        }
        static int FindBestConsistenty(int[] consistency)
        {
            if (consistency.Length == 0)
                return 0;

            int maxSum = 0; int currentSum = 0;
            foreach (int number in consistency)
            {
                currentSum = Math.Max(number, currentSum + number);
                maxSum = Math.Max(maxSum, currentSum);
               
            }
            return maxSum;
        }
    }
}
