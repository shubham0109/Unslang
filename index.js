let labels = require('./data/labels.json');
//let file = require('./data/input.txt');
let str_labels = JSON.stringify(labels);
let obj_labels = JSON.parse(str_labels)
let _ = require('underscore');
//console.log(Object.keys(obj_labels));

//console.log(obj_labels['abhor']);

let string = "df hdhtrdtrh fdthh gsgdh."
let natural = require('natural');
let tokenizer = new natural.TreebankWordTokenizer();
//console.log(tokenizer.tokenize(string));

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

rl.on('line', function (line) {
    let tokenizedArray = tokenizer.tokenize(line);
    let improvedArray = tokenizedArray.map((word) => {
        if (obj_labels[word] <= -3) {
            let wordLength = word.length;
            if (wordLength >= 3){
                word = word.substr(0, 1) + '****' + word.substr(wordLength-1, 1);
            }
        }
        return word;
    });
    let improvedLine = '';
    _.each(improvedArray, (word) => {
        improvedLine += word + ' ';
    });
    console.log('Improved line:', improvedLine);
    console.log(improvedArray);
});