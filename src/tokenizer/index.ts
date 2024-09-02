export enum TokenTypes {
    Integer,
    Float,
    Plus,
    Minus,
    Multiply,
    Divide,
    Exponent,
}

type TokenObject =
    | { tokenType: TokenTypes.Integer; value: number }
    | { tokenType: TokenTypes.Float; value: number }
    | { tokenType: TokenTypes.Plus }
    | { tokenType: TokenTypes.Minus }
    | { tokenType: TokenTypes.Multiply }
    | { tokenType: TokenTypes.Divide }
    | { tokenType: TokenTypes.Exponent };

export class Tokenizer {
    private input: string;
    private position: [number, number] = [0, 0];
    private currentChar: string = "";

    public constructor(input: string) {
        this.input = input;
    }

    private peek(): string {
        return this.input[0];
    }

    private advance(): void {
        this.input = this.input.slice(1);
        this.position[1]++;
    }

    private isDigit(char: string): boolean {
        return /\d/.test(char);
    }

    private isWhiteSpace(char: string): boolean {
        // If nextline, go to next line, else go to next character
        if (char === "\n") {
            this.position[0]++;
            this.position[1] = 0;
        } else {
            this.position[1]++;
        }

        return /\s/.test(char);
    }

    private isOperator(char: string): boolean {
        return /[\+\-\*\/\^]/.test(char);
    }

    public tokenize(): TokenObject[] {
        const tokens: TokenObject[] = [];

        while (this.input.length > 0) {
            this.currentChar = this.peek();

            if (this.isWhiteSpace(this.currentChar)) {
                this.advance();
            } else if (this.isDigit(this.currentChar)) {
                let number = this.currentChar;
                this.advance();

                while (this.isDigit(this.peek())) {
                    number += this.peek();
                    this.advance();
                }

                if (this.peek() === ".") {
                    number += this.peek();
                    this.advance();

                    while (this.isDigit(this.peek())) {
                        number += this.peek();
                        this.advance();
                    }

                    tokens.push({
                        tokenType: TokenTypes.Float,
                        value: parseFloat(number),
                    });
                } else {
                    tokens.push({
                        tokenType: TokenTypes.Integer,
                        value: parseInt(number),
                    });
                }
            } else if (this.isOperator(this.currentChar)) {
                switch (this.currentChar) {
                    case "+":
                        tokens.push({ tokenType: TokenTypes.Plus });
                        break;
                    case "-":
                        tokens.push({ tokenType: TokenTypes.Minus });
                        break;
                    case "*":
                        tokens.push({ tokenType: TokenTypes.Multiply });
                        break;
                    case "/":
                        tokens.push({ tokenType: TokenTypes.Divide });
                        break;
                    case "^":
                        tokens.push({ tokenType: TokenTypes.Exponent });
                        break;
                }

                this.advance();
            } else {
                throw new Error(
                    `Invalid character found: ${this.currentChar} at position ${this.position[0]}:${this.position[1]}`
                );
            }
        }

        return tokens;
    }
}
