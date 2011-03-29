var descriptor ;
var badger;
var challenger;
var characters;
var play = true;
var myInterval = 0;

var playerSheets = [
	'honey_badger', 
    'spiderman',
    'norris',
    'bruce_lee',
];
        


//Load player scripts.
require({baseUrl: "js/players"});
require(playerSheets, init);
        
function init() {
    $('#load').bind('click', setChallenger);
    $('#stop').bind('click', stopFight);
    setupGame();
}                   

function stopFight() {
    clearInterval ( myInterval );
    play = false;
}
   
function setupGame() {

	badger = new HoneyBadger();
	$( "#playerTemplate" ).template( "badgerTemplate" );
	$.tmpl( "badgerTemplate", badger ).appendTo( "#fightCard" );

/*var characters = {
    'norris' : chuckNorris,
    'bruce_lee' : bruceLee,
    };
*/

    //var challenger = ;
}        
  
function setChallenger() {
    var func = $("select#opponents option:selected").attr('func');
    //alert(func);
    switch(func) {
        case 'chuckNorris':
            challenger = chuckNorris();
            break;
        case 'spiderman':
            challenger = spiderman();
            break;
        case 'bruceLee':
            challenger = bruceLee();
            break;
    }            
	$( "#playerTemplate" ).template( "challengerTemplate" );
	$.tmpl( "challengerTemplate", challenger ).appendTo( "#fightCard" );
	$('<div/>',{class: "clear"}).appendTo('#fightCard');
    $('#monitor').html('');
	$.colorbox({inline: true, href:'#lightbox',onClosed:stopFight});
    play = true;
    fight();
}         
     
function fight(){
    clearInterval ( myInterval );

    //roll for inititive
    var p1 = (Math.floor(Math.random()*21) * badger.initiative);  // Badger!
    var p2 = (Math.floor(Math.random()*21) * badger.initiative);  // Challenger!
        
    if(p1 > p2) {
        // p1 goes first, choose an attack
        startAttack(badger,challenger,p1);
    } else {
        // p2 goes first, choose an attack
        startAttack(challenger,badger,p2);
    }
    if (play) myInterval = setTimeout ( fight, 1000 );
}
          
function startAttack(p1,p2,inititiveRoll) {
	$('#monitor').append('<hr />');
    var atkVal = Math.floor(Math.random() * p1.attacks.length);
    showAction({'player' : p1, "attack" : " attacks with " + p1.attacks[atkVal].name});

	// Player without initiave gets a chance to block/dodge
    var miss = (Math.floor(Math.random()*21) * p2.dexterity);
    if(miss > inititiveRoll) { 
		// 50/50 change of block vs dodge
		var dodge = (Math.floor(Math.random()*51));
		if(dodge > 50 ) {
			// DODGE!
	        showAction({'player' : p2, "attack" : ' dodges!'});
		} else {
			// BLOCK!
			var blockVal = Math.floor(Math.random() * p1.blocks.length);
        	showAction({'player' : p2, "attack" : " blocks with " + p1.blocks[blockVal].name});
		}
    } else {
        dmg = (Math.floor(Math.random()*7) * p1.attacks[atkVal].damage);
        p2.hitPoints -= dmg;
        showDamage({'player' : p2, "damage" : dmg});
        if(p2.hitPoints <= 0) { play = false; endGame(p2.name); }
    }
}         
function showAction(attacker) {
    var msg = '<span style="color: ' + attacker.player.color + '">' + attacker.player.name + attacker.attack + '</span><br/>';
    $('#monitor').append(msg);
	resetScroll();
}
function showDamage(attackee) {
    var msg = '<span>' + attackee.player.name + " had taken " + attackee.damage + ' points of damage! (' + attackee.player.hitPoints + ')</span><br/>';
    $('#monitor').append(msg);
	resetScroll();
}

function endGame(player) {
    var msg = '<span style="color: red;">' + player + ' has lost!</span><br/>';
    $('#monitor').append(msg);
	resetScroll();
}

function resetScroll() {
	$("#monitor").each( function() {
	   // certain browsers have a bug such that scrollHeight is too small
	   // when content does not fill the client area of the element
	   var scrollHeight = Math.max(this.scrollHeight, this.clientHeight);
	   this.scrollTop = scrollHeight - this.clientHeight;
	});

}
