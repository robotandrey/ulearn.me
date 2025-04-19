using System.Text;

namespace TextAnalysis;

static class SentencesParserTask
{
    public static List<List<string>> ParseSentences(string text)
    {
        var sentencesList = new List<List<string>>();
        char[] separators = { '.', '!', '?', ';', ':', '(', ')' };
        string[] sentenses = text.Split(separators);
        foreach (var sentense in sentenses)
        {
            var wordList = new List<string>();
            var words = FindWords(sentense).ToLower().Split(" ", StringSplitOptions.RemoveEmptyEntries);
            foreach (var word in words)
            {
                wordList.Add(word);
            }
            if (wordList.Count > 0)
            {
                sentencesList.Add(wordList);
            }
        }

        return sentencesList;
    }
    public static string FindWords(string sentense)
    {
        var words = new StringBuilder();

        foreach (var x in sentense)
        {
            if (char.IsLetter(x) || x == '\'')
            {
                words.Append(x);
            }
            else
            {
                words.Append(' ');
            }
        }

        return words.ToString();
    }
}
//Разделять текст на предложения, а предложения на слова.
//a.Считайте, что слова состоят только из букв(используйте метод char.IsLetter) или символа апострофа ' и отделены друг от друга любыми другими символами.
//b.Предложения состоят из слов и отделены друг от друга одним из следующих символов.!?;:()
//Приводить символы каждого слова в нижний регистр.
//Пропускать предложения, в которых не оказалось слов.
//Метод должен возвращать список предложений, где каждое предложение — это список из одного или более слов в нижнем регистре.