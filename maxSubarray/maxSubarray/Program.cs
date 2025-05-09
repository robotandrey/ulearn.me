namespace maxSubarray
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var arrayInput = Console.ReadLine().Split(" ");
            var array = new int[arrayInput.Length];
            for (int i = 0; i < arrayInput.Length; i++)
            {
                array[i] = int.Parse(arrayInput[i]);
            }
            var m = int.Parse(Console.ReadLine());
            var index = FindMaxIndex(array, m);

            for (int i = index; i < index + m; i++)
                Console.Write(array[i] + " ");
        }
        static int FindMaxIndex(int[] array, int m)
        {
            int maxSum = 0;
            int maxIndex = 0;

            for (int i = 0; i < array.Length - m; i++)
            {
                int currentSum = 0;
                for (int j = i; j < i + m; j++)
                    currentSum += array[j];

                if (maxSum < currentSum)
                    maxIndex = i;
            }
            return maxIndex;
        }
    }
}
