class Lexer {
    constructor(source) {
        this.source = source;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {
        while (this.position < this.source.length) {
            this.skipWhitespace();
            if (this.match("+HTML Star+")) {
                this.addToken("START_PROGRAM");
            } else if (this.match("+Finished+")) {
                this.addToken("END_PROGRAM");
            } else if (this.match("~HTML Star~")) {
                this.addToken("START_BLOCK");
            } else if (this.match("Star")) {
                this.addToken("END_BLOCK");
            } else if (this.match("<>")) {
                this.addToken("START_SECTION");
            } else if (this.match("*")) {
                this.addToken("END_SECTION");
            } else if (this.match("{|}")) {
                this.addToken("START_SEGMENT");
            } else if (this.match("-$")) {
                this.addToken("END_SEGMENT");
            } else if (this.match("@")) {
                this.addToken("COMMAND");
            } else if (this.match("^")) {
                this.addToken("COMMENT");
            } else if (this.match("#")) {
                this.addToken("DIRECTIVE");
            } else {
                this.readToken();
            }
        }
        return this.tokens;
    }

    match(expected) {
        if (this.source.substr(this.position, expected.length) === expected) {
            this.position += expected.length;
            return true;
        }
        return false;
    }

    readToken() {
        let char = this.source[this.position];
        if (this.isIdentifierStart(char)) {
            this.readIdentifier();
        } else if (this.isDigit(char)) {
            this.readNumber();
        } else if (char === '"') {
            this.readString();
        } else {
            throw new Error(`Unexpected character: ${char}`);
        }
    }

    readIdentifier() {
        let start = this.position;
        while (this.isIdentifierPart(this.source[this.position])) {
            this.position++;
        }
        let identifier = this.source.slice(start, this.position);
        this.addToken("IDENTIFIER", identifier);
    }

    readNumber() {
        let start = this.position;
        while (this.isDigit(this.source[this.position])) {
            this.position++;
        }
        if (this.source[this.position] === '.') {
            this.position++;
            while (this.isDigit(this.source[this.position])) {
                this.position++;
            }
        }
        let number = this.source.slice(start, this.position);
        this.addToken("NUMBER", parseFloat(number));
    }

    readString() {
        this.position++;
        let start = this.position;
        while (this.source[this.position] !== '"') {
            this.position++;
        }
        let string = this.source.slice(start, this.position);
        this.position++;
        this.addToken("STRING", string);
    }

    addToken(type, value = null) {
        this.tokens.push({ type, value });
    }

    isIdentifierStart(char) {
        return /[a-zA-Z_]/.test(char);
    }

    isIdentifierPart(char) {
        return /[a-zA-Z0-9_]/.test(char);
    }

    isDigit(char) {
        return /[0-9]/.test(char);
    }

    skipWhitespace() {
        while (/\s/.test(this.source[this.position])) {
            this.position++;
        }
    }
}
