namespace Program
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int sensorCount = int.Parse(Console.ReadLine()); //N - количество датчиков
            int[] sensorIndications = new int[sensorCount];
            for (int i = 0; i < sensorCount; i++)
            {
                sensorIndications[i] = int.Parse(Console.ReadLine()); // показатели датчиков
            }
            int requestCount = int.Parse(Console.ReadLine()); // число запросов 
            var requestIndexes = new List<(int start, int finish)>();
            for (int i = 0; i < requestCount; i++)
            {
                string[] input = Console.ReadLine().Split(" ");
                int startIndex = int.Parse(input[0]);
                int finishIndex = int.Parse(input[1]);
                requestIndexes.Add((startIndex, finishIndex)); // номера датчиков в запросе
            }
            var voltage = GetVoltage(sensorCount, sensorIndications, requestCount, requestIndexes);
            foreach (var res in voltage)
            {
                Console.WriteLine(res);
            }
        }
        static List<int> GetVoltage(int sensorCount, int[] sensorIndications,
            int requestCount, List<(int start, int finish)> requestIndexes)
        {
            var prefixSum = new int[sensorCount + 1];
            for (int i = 1; i <= sensorCount; i++)
            {
                prefixSum[i] = prefixSum[i - 1] + sensorIndications[i - 1];
                
            }
            var voltageList = new List<int>();
            foreach (var request in requestIndexes)
            {
                voltageList.Add(prefixSum[request.finish] - prefixSum[request.start - 1]);
            }
            return voltageList;
        }
    }
}
