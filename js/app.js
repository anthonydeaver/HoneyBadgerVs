                alert('Here');
                    var attributes = {
                        strength => 7,
                        dexterity => 9,
                        intutition => 8,
                        constitution => 7,
                        wisdom => 9,
                        charisma => 5,
                        
                        //
                        ability => 10
                    };
                    
                    
                    //roll for inititive
                    p1 = Math.floor(Math.random()*21);
                    alert(p1);
                    p2 = Math.floor(Math.random()*21);
                    alert(p2);
                    
                    if(p1 > p2) {
                        // p1 goes first, choose an attack
                    } else {
                        // p2 goes first, choose an attack
                    }
                }

