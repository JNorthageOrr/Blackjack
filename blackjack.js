
$(function(){

//console.log('loaded')

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
			completeDeck.push([(value+1),suit, colorR]);
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

var playerDeck;
var computerDeck;
var shoeDeck;

var pHand = [];
var pHand2 = [];
var cHand = [];
var cHand2 = [];
var pScore = 0;
var fScore;
var cScore = 0;
var cScores;

var createDecks = function (){
	playerDeck = thisDeck(completeDeck);
	computerDeck = thisDeck(completeDeck);
	shoeDeck = thisDeck(completeDeck);

}
createDecks();

var initialDeal = function(){
	computerCard();
	computerCard();
	playerCard();
	playerCard();
}

var playerCard = function(){
	var thisCard = playerDeck.pop();
	pHand.push(thisCard);
	
	var color = thisCard[2];
	var suit = thisCard[1];
	var dValue = thisCard[0];
	
	if(dValue === 11){
		dValue = 'J';
	}
	if(dValue === 12){
		dValue = 'Q';
	}
	if(dValue === 13){
		dValue = 'K';
	}
	if(dValue === 1){
		dValue = 'A';
	}
	
	var displayText = dValue + suit;
	var playerCardHolder = $('.player_hand');
	var displayCard = $('<div>').velocity("fadeIn", { duration: 1500 })
								.text(displayText).css({"height": "70",
								"color": color, 
								"width": "70",
								"position":"relative",
								"background-color": "white",
								"border-radius": ".3em",
								"float":"left",
								"top":"-70px"
								}).appendTo(playerCardHolder);
	pScore = scoreEval(thisCard);
	var displayScore = $('.p_pl').text(pScore);
	fScore = pScore;
	if(fScore > 21){
		var hit = $('.buttonL').hide();
		var stay = $('.buttonR').hide();
		computerMove();
	}

	return thisCard;
}

var computerCard = function(){
	var thisCard = computerDeck.pop();
	cHand.push(thisCard);
	
	//console.log(thisCard);

	var color = thisCard[2];
	var suit = thisCard[1];
	var dValue = thisCard[0];

	if(dValue === 11){
		dValue = 'J';
	}
	if(dValue === 12){
		dValue = 'Q';
	}
	if(dValue === 13){
		dValue = 'K';
	}
	if(dValue === 1){
		dValue = 'A';
	}

	var displayText = dValue + suit;
	var computerCardHolder = $('.computer_hand');
	var displayCard = $('<div>').velocity("fadeIn", { duration: 1500 })
								.text(displayText).css({"height": "70",
								"color": color, 
								"width": "70",
								"position":"relative",
								"background-color": "white",
								"border-radius": ".3em", 
								"float":"left",
								"top":"-70px"
								}).appendTo(computerCardHolder);
	cScore = scoreEval(thisCard);
	cScores = cScore;
	var displayScore = $('.p_co').text(cScore);
	return thisCard
}
var computerMove = function(){
//console.log('cScore' +cScore);
var display = $('.score');
var displayText;
	var stay = $('.buttonR').hide();
	while((cScores <=17)&&(fScore <= 21)) {
		computerCard();
	}
	if ((cScores < fScore)&&(fScore>21)){
			displayText = 'Computer Wins!';
			display.text(displayText);
	}
	if(cScores > 17){
		console.log('fScore: '+ fScore + " cScore: "+ cScores)
		if((fScore > cScores)&&(fScore<=21)){
			displayText = 'Player Wins!';
			display.text(displayText);
		}else if((fScore < cScores)&&(cScores>21)){
			displayText = 'Player Wins!';
			display.text(displayText);
		}else if((cScores > fScore)&&(cScore <= 21)) {
			displayText = 'Computer Wins!';
			display.text(displayText);
		}else if(cScores === fScore){
			displayText = 'Tie. Computer Wins!';
			display.text(displayText);
		}
	}
}	
var scoreEval = function(card){
	var thisCard = card;
	var pCard;
	var cCard;
	var hand;
	var hand2;
	var rValue = thisCard[0];
	var player;

	if(rValue === 11){
		rValue = 10;
	}
	if(rValue === 12){
		rValue = 10;
	}
	if(rValue === 13){
		rValue = 10;
	}
	if(rValue === 1){
		rValue = 11;
	}

	if(!(pHand.indexOf(thisCard) === -1)){
		pCard = parseInt(rValue);
		player = pScore;
		pHand2.push(rValue);
		hand = pHand;
		hand2 = pHand2;
		
	}
	else if(!(cHand.indexOf(thisCard) === -1)){
		cCard = parseInt(rValue);
		player = cScore;
		cHand2.push(rValue);
		hand = cHand;
		hand2 = cHand2;
		
	}
	
	return bust(player, rValue, hand, hand2);
	
	function bust(player, thisCardValue, hand, hand2){
		var initialScore = parseInt(player);
		var thisScore = parseInt(thisCardValue);
		var bustScore = thisScore + initialScore;
		var hand = hand;
		var hand2 = hand2;
		var sum = 0;
		

		//console.log('Bust Score b4: '+bustScore);
		
		if(bustScore > 21){
			//var test = hand.indexOf(1)
			//console.log('test: ' +test)
			//console.log('hand2: '+hand2)	
			var eleven = hand2.indexOf(11);
			//console.log('indexEle: '+eleven)
				if (eleven >= 0){
						hand2[eleven] = 1;
					//	console.log('hand2Sub: '+hand2)
					}
	//	}
	
			hand2.forEach(function(y){
				sum = sum + parseInt(y);
			//	console.log('sumV: '+sum)
				//console.log(typeof(y))
			}) 
			//console.log('sum: '+sum)
			if(sum > 21){
				bustScore = sum;

				return bustScore;
			}
			if(sum <= 21){
				bustScore = sum;
				return bustScore;
			}
			

		}
		else {
		//	console.log('bustScore: '+bustScore);
			return bustScore};
	}
	
}



var addEventListeners = function(){
	//add the click events on the attack and heal buttons. 
		
		var clickHit = $('.buttonL');
		$(clickHit).on('click', function(){
       		playerCard();
       		
 	 		});
		
		var clickStay = $('.buttonR');
		$(clickStay).on('click', function() {
    		$(clickHit).hide();
    		console.log('PLAYER STAYS!')
    		computerMove();
    		});

    	var clickDeal = $('.buttonD');
    	$(clickDeal).on('click', function(){
    		initialDeal();
    		$(this).hide()
    		});

    	var clickReload = $('.buttonRe');
    	$(clickReload).on('click', function(){
    		location.reload(true);
    		});
	}

	$(document).ready(function(){
		addEventListeners();
	})
});
/*
 <script>
  $(function() {
    setInterval(function() {
      var shiftX = 600;
      var shiftY = 300;
      
      var shiftZ = -500;
      $('.circle')
        .velocity({translateX: shiftX, translateY: shiftY, translateZ: shiftZ}, 3000)
    })
  })
</script> 

<svg class="circle">
					<circle class="circle" cx="40" cy="40" r="30" fill="orange" z-element="100"stroke="black" stroke-width="5"></circle>
				</svg>	*/