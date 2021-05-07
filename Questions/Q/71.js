function* startGame() {
    const 答案 = yield "Do you love JavaScript?";
    console.log(111,答案)
    if (答案 !== "Yes") {
        return "Oh wow... Guess we're gone here";
    }
    return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log( game.next().value ); // Do you love JavaScript?
console.log( game.next('Yes').value ); // JavaScript loves you back ❤️