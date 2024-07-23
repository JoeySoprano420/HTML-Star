class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse() {
        let program = this.parseProgram();
        return program;
    }

    parseProgram() {
        this.expect("START_PROGRAM");
        let blocks = [];
        while (!this.match("END_PROGRAM")) {
            blocks.push(this.parseBlock());
        }
        this.expect("END_PROGRAM");
        return { type: "Program", blocks };
    }

    parseBlock() {
        this.expect("START_BLOCK");
        let sections = [];
        while (!this.match("END_BLOCK")) {
            sections.push(this.parseSection());
        }
        this.expect("END_BLOCK");
        return { type: "Block", sections };
    }

    parseSection() {
        this.expect("START_SECTION");
        let statements = [];
        while (!this.match("END_SECTION")) {
            statements.push(this.parseStatement());
        }
        this.expect("END_SECTION");
        return { type: "Section", statements };
    }

    parseStatement() {
        if (this.match("COMMAND")) {
            return this.parseCommand();
        } else if (this.match("COMMENT")) {
            return this.parseComment();
        } else if (this.match("DIRECTIVE")) {
            return this.parseDirective();
        } else {
            throw new Error(`Unexpected token: ${this.peek().type}`);
        }
    }

    parseCommand() {
        let command = this.consume("IDENTIFIER");
        let args = [];
        while (!this.match(";")) {
            args.push(this.parseExpression());
        }
        this.expect(";");
        return { type: "Command", command: command.value, args };
    }

    parseComment() {
        let comment = this.consume("STRING");
        return { type: "Comment", comment: comment.value };
    }

    parseDirective() {
        let directive = this.consume("STRING");
        return { type: "Directive", directive: directive.value };
    }

    parseExpression() {
        // Implement expression parsing based on grammar
    }

    expect(type) {
        let token = this.consume(type);
        if (!token) {
            throw new Error(`Expected token of type ${type} but got ${this.peek().type}`);
        }
        return token;
    }

    consume(type) {
        if (this.peek().type === type) {
            return this.tokens[this.position++];
        }
        return null;
    }

    match(type) {
        if (this.peek().type === type) {
            this.position++;
            return true;
        }
        return false;
    }

    peek()
