namespace TextAnalysis;

static class TextGeneratorTask
{
    public static string ContinuePhrase(
        Dictionary<string, string> nextWords,
        string phraseBeginning,
        int wordsCount)
    {
        for (int i = 0; i < wordsCount; i++)
        {
            var words = phraseBeginning.Split(" ");
            if (words.Length >= 2 && nextWords.ContainsKey(string.Join(" ", words[^2], words[^1])))
            {
                phraseBeginning += " "  + nextWords[string.Join(" ", words[^2], words[^1])];
            }
            else if (nextWords.ContainsKey(words[^1]))
            {
                phraseBeginning += " " + nextWords[words[^1]];
            }
            else
            {
                return phraseBeginning;
            }
        }
        return phraseBeginning;
    }
}