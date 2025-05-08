using System.Numerics;

namespace _1491unrealstory
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int knightCount = int.Parse(Console.ReadLine());

            var numbersInput = new List<(int start, int end, int value)>();
            for (int i = 0; i < knightCount + 1; i++)
            {
                string[] input = Console.ReadLine().Split(" ");
                numbersInput.Add((int.Parse(input[0]), int.Parse(input[1]), int.Parse(input[2])));
            }
            var res = CalculatePaycheck(knightCount, numbersInput);
            Console.WriteLine(string.Join(" " ,res[1..]));
        }
        static int[] CalculatePaycheck(int knightCount, List<(int start, int end, int value)> numbersInput)
        {
            var paycheck = new int[knightCount + 1];
            var diffArray = new int[paycheck.Length + 1];

            var arthur = numbersInput[0];
            diffArray[arthur.start] += arthur.value;
            diffArray[arthur.end + 1] -= arthur.value;

            for (int speaker = 1; speaker <= knightCount; speaker++)
            {
                var (start, end, value) = numbersInput[speaker];
                diffArray[start] += value;
                diffArray[end + 1] -= value;
                
            }
            int current = 0;
            for (int i = 0; i <= knightCount; i++)
            {
                current += diffArray[i];
                paycheck[i] += current;
            }

            return paycheck;
        }
    }
}
