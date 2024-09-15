var commonAbbreviations = [
    'Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.',
    'etc.', 'i.e.', 'e.g.', 'vs.', 'viz.',
    'St.', 'Jr.', 'Sr.', 'Inc.', 'Ltd.',
    'a.m.', 'p.m.'
];
function splitIntoSentences(text) {
    var abbreviationPattern = commonAbbreviations.map(function (abbr) {
        return "(?<!".concat(abbr.replace('.', '\\.'), ")");
    }).join('');
    var sentenceEndPattern = new RegExp("".concat(abbreviationPattern, "[.!?]\\s+"), 'g');
    var sentences = text.split(sentenceEndPattern);
    return sentences.map(function (sentence) { return sentence.trim(); }).filter(Boolean);
}
function main() {
    var text = "Hello, Dr. Smith! How are you? I hope you're doing well. Let's meet at 2 p.m. tomorrow, i.e., after lunch. We can discuss the project, etc. Does that work for you?";
    var sentences = splitIntoSentences(text);
    console.log("Sentences:");
    sentences.forEach(function (sentence, index) {
        console.log("".concat(index + 1, ". ").concat(sentence));
    });
}
main();
