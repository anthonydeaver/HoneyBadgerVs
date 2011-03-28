var descriptor;
var badger;
var challenger;
var characters;
var play = true;
var myInterval = 0;

var playerSheets = [
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

/*var characters = {
    'norris' : chuckNorris,
    'bruce_lee' : bruceLee,
    };*/

    descriptor = ' performs a ';

    badger = {
        'name' : 'Honey Badger',
        'strength' : 7,
        'dexterity' : 9,
        'intutition' : 8,
        'constitution' : 7,
        'wisdom' : 9,
        'charisma' : 5,
        
        //
        'initiative' : 6,
        'ability' : 10,
        'hitPoints' : 65,
        'color' : 'blue',
        
        //
        'attacks' : [
            {'name' : 'front strike', 'damage' : 5},
            {'name' : 'rear strike', 'damage'  : 7},
        ]
    };

    //var challenger = ;
}        
  
function setChallenger() {
    var func = $("select#opponents option:selected").attr('func');
    //alert(func);
    switch(func) {
        case 'chuckNorris':
            challenger = loadChuck();
            break;
        case 'spiderman':
            challenger = loadSpider();
            break;
        case 'bruceLee':
            challenger = loadBruce();
            break;
    }            
    $('#monitor').html('');
    fight();
}         
     
function fight(){
$('#monitor').html('');
    play = true;
    clearInterval ( myInterval );
    //roll for inititive
    p1 = (Math.floor(Math.random()*21) * badger.initiative);
    p2 = (Math.floor(Math.random()*21) * badger.initiative);
        
    if(p1 > p2) {
        // p1 goes first, choose an attack
        atkVal = Math.floor(Math.random() * badger.attacks.length);
        showAttack({'player' : badger, "attack" : descriptor + badger.attacks[atkVal].name});
        dodge = (Math.floor(Math.random()*21) * challenger.dexterity);
        if(dodge > p1) { 
            showAttack({'player' : challenger, "attack" : ' dodges!'});
        } else {
            dmg = (Math.floor(Math.random()*7) * badger.attacks[atkVal].damage);
            challenger.hitPoints -= dmg;
            showDamage({'player' : challenger, "damage" : dmg});
            if(challenger.hitPoints <= 0) { play = false; endGame(challenger.name);  }
        }
    } else {
        // p2 goes first, choose an attack
        atkVal = Math.floor(Math.random() * challenger.attacks.length);
        showAttack({'player' : challenger, "attack" : descriptor + challenger.attacks[atkVal].name});
        dodge = (Math.floor(Math.random()*21) * badger.dexterity);
        if(dodge > p1) { 
            showAttack({'player' : badger, "attack" : ' dodges!'});
        } else {
            dmg = (Math.floor(Math.random()*7) * challenger.attacks[atkVal].damage);
            badger.hitPoints -= dmg;
            showDamage({'player' : badger, "damage" : dmg});
            if(badger.hitPoints <= 0) { play = false; endGame(badger.name); }
        }
    }
    if (play) myInterval = setTimeout ( fight, 1000 );
}
                   
function showAttack(attacker) {
    var msg = '<span style="color: ' + attacker.player.color + '">' + attacker.player.name + attacker.attack + '</span><br/>';
    $('#monitor').append(msg);
}

function showDamage(attackee) {
    var msg = '<span>' + attackee.player.name + " had taken " + attackee.damage + ' points of damage! (' + attackee.player.hitPoints + ')</span><br/>';
    $('#monitor').append(msg);
}

function endGame(player) {
    var msg = '<span style="color: red;">' + player + ' has lost!</span><br/>';
    $('#monitor').append(msg);
}

