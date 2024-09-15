const commonAbbreviations = [
  'Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.',
  'etc.', 'i.e.', 'e.g.', 'vs.', 'viz.',
  'St.', 'Jr.', 'Sr.', 'Inc.', 'Ltd.',
  'a.m.', 'p.m.'
];

function splitIntoSentences(text: string): string[] {
  // Step 1: Protect abbreviations
  let protectedText = text;
  commonAbbreviations.forEach((abbr, index) => {
    const safeAbbr = abbr.replace('.', '\\.');
    const regex = new RegExp(`\\b${safeAbbr}(?=\\s|$)`, 'g');
    protectedText = protectedText.replace(regex, `${abbr.slice(0, -1)}PROTECTED_PERIOD${index}`);
  });

  // Step 2: Split sentences while keeping the ending punctuation
  const sentenceEndPattern = /([.!?])\s+/g;
  const rawSentences = protectedText.split(sentenceEndPattern);

  // Step 3: Pair sentences with their ending punctuation
  const sentences: string[] = [];
  for (let i = 0; i < rawSentences.length - 1; i += 2) {
    sentences.push(rawSentences[i] + (rawSentences[i + 1] || ''));
  }

  // Step 4: Restore abbreviations and clean up
  return sentences.map(sentence => {
    let restoredSentence = sentence.trim();
    commonAbbreviations.forEach((abbr, index) => {
      const protectedAbbr = `${abbr.slice(0, -1)}PROTECTED_PERIOD${index}`;
      restoredSentence = restoredSentence.replace(new RegExp(protectedAbbr, 'g'), abbr);
    });
    return restoredSentence;
  }).filter(Boolean);
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
