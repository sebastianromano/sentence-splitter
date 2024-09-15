"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var commonAbbreviations = [
    'Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.',
    'etc.', 'i.e.', 'e.g.', 'vs.', 'viz.',
    'St.', 'Jr.', 'Sr.', 'Inc.', 'Ltd.',
    'a.m.', 'p.m.'
];
function splitIntoSentences(text) {
    // Step 1: Protect abbreviations
    var protectedText = text;
    commonAbbreviations.forEach(function (abbr, index) {
        var safeAbbr = abbr.replace('.', '\\.');
        var regex = new RegExp("\\b".concat(safeAbbr, "(?=\\s|$)"), 'g');
        protectedText = protectedText.replace(regex, "".concat(abbr.slice(0, -1), "PROTECTED_PERIOD").concat(index));
    });
    // Step 2: Split sentences while keeping the ending punctuation
    var sentenceEndPattern = /([.!?])\s+/g;
    var rawSentences = protectedText.split(sentenceEndPattern);
    // Step 3: Pair sentences with their ending punctuation
    var sentences = [];
    for (var i = 0; i < rawSentences.length - 1; i += 2) {
        sentences.push(rawSentences[i] + (rawSentences[i + 1] || ''));
    }
    // Step 4: Restore abbreviations and clean up
    return sentences.map(function (sentence) {
        var restoredSentence = sentence.trim();
        commonAbbreviations.forEach(function (abbr, index) {
            var protectedAbbr = "".concat(abbr.slice(0, -1), "PROTECTED_PERIOD").concat(index);
            restoredSentence = restoredSentence.replace(new RegExp(protectedAbbr, 'g'), abbr);
        });
        return restoredSentence;
    }).filter(Boolean);
}
function main() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Welcome to the Sentence Splitter!");
    console.log("Enter your text below. Press Enter twice to process the input.");
    console.log("To exit the program, type 'exit' and press Enter.");
    var inputText = '';
    rl.on('line', function (line) {
        if (line.toLowerCase() === 'exit') {
            rl.close();
            return;
        }
        if (line === '') {
            if (inputText.trim() !== '') {
                var sentences = splitIntoSentences(inputText);
                console.log("\nSplit Sentences:");
                sentences.forEach(function (sentence, index) {
                    console.log("".concat(index + 1, ". ").concat(sentence));
                });
                console.log("\nEnter your next text or type 'exit' to quit:");
                inputText = '';
            }
        }
        else {
            inputText += line + ' ';
        }
    });
    rl.on('close', function () {
        console.log('Thank you for using the Sentence Splitter. Goodbye!');
        process.exit(0);
    });
}
main();
