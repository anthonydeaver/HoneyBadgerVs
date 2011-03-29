var gameVars = {};
gameVars.descriptor;
gameVars.badger;
gameVars.challenger;
gameVars.characters;
gameVars.play = true;
gameVars.myInterval = 0;

gameVars.playerSheets = [
	'honey_badger', 
    'spiderman',
    'norris',
    'bruce_lee',
];
        


//Load player scripts.
require({baseUrl: "js/players"});
require(gameVars.playerSheets, init);
        
function init() {
    $('#load').bind('click', prepBout);
    $('#stop').bind('click', stopFight);
    $('#rematch').bind('click', rematch);
    $('#rematch').hide();
    $('#opponents').change(setChallenger);
    setupGame();
}                   

function stopFight() {
    clearInterval ( gameVars.myInterval );
    gameVars.play = false;
}
   
function setupGame() {

	gameVars.badger = new HoneyBadger();
	$( "#playerTemplate" ).template( "badgerTemplate" );
	$.tmpl( "badgerTemplate", gameVars.badger ).appendTo( "#fightCard" );

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
            gameVars.challenger = chuckNorris();
            break;
        case 'spiderman':
            gameVars.challenger = spiderman();
            break;
        case 'bruceLee':
            gameVars.challenger = bruceLee();
            break;
    }       
    
    $('#challenger_image').attr('src', 'images/' + gameVars.challenger.image); 
    $('#challenger_name').html(gameVars.challenger.name); 
}

function prepBout() { 
	$( "#playerTemplate" ).template( "challengerTemplate" );
	$.tmpl( "challengerTemplate", gameVars.challenger ).insertAfter( "#badger" );
	$('<div class="clear" />').appendTo('#fightCard');
    $('#monitor').html('');
	$.colorbox({inline: true, href:'#lightbox',onClosed:clearFightCard});
    gameVars.play = true;
    fight();
}         

function rematch() {
    resetBout();
    fight();
}     

function clearFightCard() {
    $('#fightCard #player').remove();
    resetBout();
}

function resetBout() {
    gameVars.badger.reset();
    gameVars.challenger.reset();
    $("#badger li.hitpoints").removeClass("warn alert");
    $("#player li.hitpoints").removeClass("warn alert");
    $("#badger li.hitpoints").html("Hit Points: " + gameVars.badger.hitPoints);
    $("#player li.hitpoints").html("Hit Points: " + gameVars.challenger.hitPoints);
    $('#rematch').hide();
    $('#monitor').html('');
    gameVars.play = true; 
}
function fight(){
    // Housekeeping
    clearInterval ( gameVars.myInterval );

    //roll for inititive
    var p1 = (Math.floor(Math.random()*21) * gameVars.badger.initiative);  // Badger!
    var p2 = (Math.floor(Math.random()*21) * gameVars.challenger.initiative);  // Challenger!
        
    if(p1 > p2) {
        // p1 goes first, choose an attack
        startAttack(gameVars.badger,gameVars.challenger,p1);
    } else {
        // p2 goes first, choose an attack
        startAttack(gameVars.challenger,gameVars.badger,p2);
    }
    if (gameVars.play) gameVars.myInterval = setTimeout ( fight, 500 );
}
          
function startAttack(p1,p2,inititiveRoll) {
	$('#monitor').append('<hr />');
    var atkVal = Math.floor(Math.random() * (p1.attacks.length - 1));
    //console.log("Attack: " + atkVal);
    showAction({'player' : p1, "attack" : " attacks with " + p1.attacks[atkVal].name});

	// Player without initiave gets a chance to block/dodge
    var miss = (Math.floor(Math.random()*21) * (p2.dexterity + p2.intutition));
    if(miss > inititiveRoll) { 
		// 50/50 change of block vs dodge
		var dodge = (Math.floor(Math.random()*101));
		//console.log("dodge: " + dodge);
		if(dodge > 50 ) {
			// DODGE!
	        showAction({'player' : p2, "attack" : ' dodges!'});
		} else {
			// BLOCK!
			var blockVal = Math.floor(Math.random() * (p1.blocks.length - 1));
        	showAction({'player' : p2, "attack" : " blocks with " + p2.blocks[blockVal].name});
		}
    } else {
        dmg = (Math.floor(Math.random()*7) * p1.attacks[atkVal].damage);
        p2.hitPoints -= dmg;
        if(p2.hitPoints < 0 ) { p2.hitPoints = 0; }
        showDamage({'player' : p2, "damage" : dmg});
        $("#" + p2.type + " li.hitpoints").html("Hit Points: " + p2.hitPoints);
        //alert(p2.hitPoints + " :: " + (p2.getBaseHP() * .10));
        if (p2.hitPoints < (p2.getBaseHP() * .25)) {$("#" + p2.type + " li.hitpoints").removeClass("warn alert").addClass("warn");}
        if (p2.hitPoints < (p2.getBaseHP() * .10)) {$("#" + p2.type + " li.hitpoints").removeClass("warn alert").addClass("alert");}
        if(p2.hitPoints <= 0) { endGame(p2.name); }
    }
}         
function showAction(attacker) {
    var msg = '<span style="color: ' + attacker.player.color + '">' + attacker.player.name + attacker.attack + '</span><br/>';
    $('#monitor').append(msg);
	resetScroll();
}
function showDamage(attackee) {
    var msg = '<span>' + attackee.player.name + " had taken " + attackee.damage + ' points of damage!</span><br/>';
    $('#monitor').append(msg);
	resetScroll();
}

function endGame(player) {
    var msg = '<span style="color: red;">' + player + ' has lost!</span><br/>';
    $('#monitor').append(msg);
	resetScroll();
	$('#rematch').show();
	clearInterval ( gameVars.myInterval );
	gameVars.play = false; 
}

function resetScroll() {
	$("#monitor").each( function() {
	   // certain browsers have a bug such that scrollHeight is too small
	   // when content does not fill the client area of the element
	   var scrollHeight = Math.max(this.scrollHeight, this.clientHeight);
	   this.scrollTop = scrollHeight - this.clientHeight;
	});

}
