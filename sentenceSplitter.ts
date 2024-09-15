const commonAbbreviations = [
  'Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.',
  'etc.', 'i.e.', 'e.g.', 'vs.', 'viz.',
  'St.', 'Jr.', 'Sr.', 'Inc.', 'Ltd.',
  'a.m.', 'p.m.'
];

function splitIntoSentences(text: string): string[] {
  const abbreviationPattern = commonAbbreviations.map(abbr => 
    `(?<!${abbr.replace('.', '\\.')})`
  ).join('');
  
  const sentenceEndPattern = new RegExp(`${abbreviationPattern}[.!?]\\s+`, 'g');
  
  const sentences = text.split(sentenceEndPattern);
  
  return sentences.map(sentence => sentence.trim()).filter(Boolean);
}

function main() {
  const text = "Hello, Dr. Smith! How are you? I hope you're doing well. Let's meet at 2 p.m. tomorrow, i.e., after lunch. We can discuss the project, etc. Does that work for you?";

  const sentences = splitIntoSentences(text);
  console.log("Sentences:");
  sentences.forEach((sentence, index) => {
    console.log(`${index + 1}. ${sentence}`);
  });
}

main();
