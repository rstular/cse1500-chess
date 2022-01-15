class ChessPiece {

    /**
     * Creates a new ChessPiece
     * @param {ChessPieceType} type type of the piece
     * @param {ChessColor} color color of the piece
     */
    constructor(type, color) {
        if (typeof type !== "undefined") {
            this.type = type;
        }
        if (typeof color !== "undefined") {
            this.color = color;
        }
    }

    /**
     * Returns the type of the piece in question
     * @returns {ChessPieceType} type of the piece
     */
    getType() {
        return this.type;
    }

    /**
     * Returns the color of the piece in question
     * @returns {ChessColor} color of the piece
     */
    getColor() {
        return this.color;
    }

    /**
     * Sets the type of the piece in question
     * @param {ChessPieceType} type type of the piece
     */
    setType(type) {
        this.type = type;
    }

    /**
     * Sets the color of the piece in question
     * @param {ChessColor} color color of the piece
     */
    setColor(color) {
        this.color = color;
    }

    /**
     * 
     * @returns {object} JSON-serializable representation of the piece 
     */
    toJSON() {
        return {
            type: this.type ?? null,
            color: this.color ?? null
        };
    }
}

module.exports = ChessPiece;