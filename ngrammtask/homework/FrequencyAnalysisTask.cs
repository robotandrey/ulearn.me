namespace TextAnalysis;

static class FrequencyAnalysisTask
{
    public static Dictionary<string, string> GetMostFrequentNextWords(List<List<string>> text)
    {
        var result = new Dictionary<string, string>();
        var bigrams = GetBigrams(text);
        var trigrams = GetTrigrams(text);

        result = bigrams.Union(trigrams).ToDictionary(x => x.Key, x => x.Value);

        return result;
    }
    private static Dictionary<string, string> GetBigrams(List<List<string>> text)
    {
        var bigramsCounter = new Dictionary<(string, string), int>();
        foreach (var sentence in text)
        {
            for (int i = 0; i < sentence.Count - 1; i++)
            {
                var key = (sentence[i], sentence[i + 1]);
                if (!bigramsCounter.ContainsKey(key))
                {
                    bigramsCounter.Add(key, 1);
                }
                else
                {
                    bigramsCounter[key]++;
                }
            }
        }
        var bigrams = bigramsCounter
            .GroupBy(pair => pair.Key.Item1)
            .ToDictionary( 
            g => g.Key,
            g => g.OrderByDescending(p => p.Value)
            .ThenBy(p => p.Key.Item2)
            .First().Key.Item2); 
        return bigrams;
    }
    private static Dictionary<string, string> GetTrigrams(List<List<string>> text)
    {
        var trigramsCounter = new Dictionary<((string, string), string), int>();
        foreach (var sentence in text)
        {
            for (int i = 0; i < sentence.Count - 2; i++)
            {
                var key = ((sentence[i], sentence[i + 1]), sentence[i + 2]);
                if (!trigramsCounter.ContainsKey(key))
                {
                    trigramsCounter.Add(key, 1);
                }
                else
                {
                    trigramsCounter[key]++;
                }
            }
        }
        var trigrams = trigramsCounter
            .GroupBy(p => p.Key.Item1)
            .ToDictionary(
            g => g.Key
            .ToString()
            .Replace(",", "")
            .Replace("(", "")
            .Replace(")", ""),
            g => g.OrderByDescending(p => p.Value)
            .ThenBy(p => p.Key.Item2)
            .First().Key.Item2);
        return trigrams;
    }

}