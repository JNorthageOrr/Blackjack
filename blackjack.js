
$(function(){

console.log('loaded')

var deckProto = [];

function createDeck(){
//creates array of 52 numbers
	for(var i=0;i<52;i++) {
	deckProto.push(i);
	}
}

createDeck();

var completeDeck = [];
var z=0;

function createSuit_Value_Color(){
//Create suit, hearts = 0, diamonds = 1, clubs = 2, spades = 3
//Determine suit value: 
//Assign color
	for(var i=0; i< 52; i++, z++){
		
		var colorR = "Red";
		var colorB = "Black";

		var suit = Math.floor(deckProto[i] / 13);
		var value = deckProto[z] % 13;
		
		if (suit === 0){
			if(i<13){
			suit = "♡";
			completeDeck.push([(value+1), suit, colorR]);
			}
		}
		if (suit === 1&&i<26){
			suit = "♦";
			completeDeck.push([(value+1), suit, colorR]);
		}
		if (suit === 2){
			suit = "♧";
			completeDeck.push([(value+1), suit, colorB]);
		}
		if (suit === 3){
			suit = "♠";
			completeDeck.push([(value+1), suit, colorB]);
		}
	}
}

createSuit_Value_Color();

//shuffles a deck of cards, call !!!!!      thisDeck(completeDeck)    !!!!
var thisDeck = function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}














// var deckObj = [
// 		{values: ['A',2,3,4,5,6,7,8,9,10,'J','Q','K']},
// 		{suit: ['Heart', 'Diamond', 'Spade', 'Club']},
// 		{color: ['Red', 'Black']},
// 		{symbol: ['♡', '♦', '♠', '♧']},
// 		{drawn: [true,false]}   

// 		];



// var gameDeck = function createGameDeck(){
// 	//object that will have this game deck, same elements as reference deck
// 	var deck = [deckObj.suit.Heart, deckObj.suit.Diamond, deckObj.suit.Spade, deckObj.suit.Club]


// 	for(var i = 0; i<14;i++){
// 	 	var heartss = beckObj.suit.Heart;
// 	 }

	
// 	return deck;
// } 





// var thisDeck = gameDeck();




































});