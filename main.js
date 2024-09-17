class Term {
    constructor(word, description){
        this.word = word;
        this.description = description;
    }
}

function Sort(){

    var terms = [];

    var text = document.getElementById("mainTextArea").value.toString().split("\n");

    for (line = 0; line < text.length; line++){

        if (text[line].indexOf("\\newword") == 0){

            var term_word = "";
            var term_descritpion = "";

            var write1 = false;
            var write2 = false;

            for (i = 0; i < text[line].length; i++){

                var c = text[line][i];

                if (c == '{'){

                    if (write1){
                        write1 = false;
                        write2 = true;
                    } else {
                        write1 = true;
                    }
                    continue;
                } else if (c == '}'){
                    if (write2){
                        write2 = false;
                    } else {
                        write2 = true;
                    }
                    continue;
                }

                if (write1){
                    //console.log(c + "\t1");
                    term_word += c;
                } else if (write2){
                    //console.log(c + "\t2")
                    term_descritpion += c;
                }


            }

            let term = {
                "word": term_word,
                "description": term_descritpion
            };

            terms.push(term);


        }

    }

    Update(terms);

};

function Update(terms){
    document.getElementById("mainTextArea").value = "";

    terms.sort(function (a, b){
        return a.word.localeCompare(b.word);
    });

    for (i = 0; i < terms.length; i++){

        document.getElementById("mainTextArea").value += `\\newword{${terms[i].word}}{${terms[i].description}}\n`
    }
}
