var images = ['title_1.png', 'title_2.png', 'title_3.png', 'title_4.png', 'title_5.png', 'title_6.png', 'title_7.png', 'title_8.png', 'title_9.png', 'title_10.png'];
var amountTiles = 20;
var tilesInRow = 5;
var tiles = [];
var collectedTiles = [];
var take =true;
var pairs = 0;
var btnStart = $('.startGame');
var board = $('.board');

$(document).ready(function() {
     btnStart.on('click', function(){
         startGame();    
     })
  });

function startGame(){
    
    //tablica z indexami obrazków - dublowanie obrazków
    for (var i=0; i<amountTiles; i++) {
        tiles.push(Math.floor(i/2));
        // tiles=[0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5... ]
        // 20 elementów od 0 do 19 
    }

    //mieszanie obrazków
    for ( i=amountTiles-1; i>0; i--) {
        var swap = Math.floor(Math.random()*i);
        var tmp = tiles[i];
        tiles[i] = tiles[swap];
        tiles[swap] = tmp;  
    }
    
    //tworzenie obrazków 
    for(i = 0; i<amountTiles; i++){
        var tile = $('<div class="tile"></div>');
        board.append(tile);
        tile.data("cardType", tiles[i]);
        tile.data('index', i);
        tile.css({ 
            left: 5+(tile.width()+5)*(i%tilesInRow)
        });
        tile.css({
            top : 5+(tile.height()+5)*(Math.floor(i/tilesInRow))
        });
        
        tile.on('click', function(){
            clickTiles($(this));
        });
        }
    }

    function clickTiles(elem){
        if(take){
             // jeżeli jeszcze nie pobraliśmy 1 elementu
            // lub jeżeli index tego elementu nie istnieje w pobranych...
            if( !collectedTiles[0] || (collectedTiles[0].data('index') != elem.data('index')) ) {
                take==false;
                collectedTiles.push(elem);
                elem.css({'background-image':'url(img/' + images[elem.data('cardType')] + ')'});
            }
            
            //jeżeli dlugość tablicy elementów pobranych jest równa 2 
            if(collectedTiles.length == 2 ) {
                take==false;
                if(collectedTiles[0].data('cardType')==collectedTiles[1].data('cardType') ){
                    setTimeout(function(){
                        deleteTiles() 
                    },300);
                } else {
                    setTimeout(function(){
                        resetTiles() 
                    },300);
                }
            }
        }
    }
    
    function deleteTiles(){
        collectedTiles[0].fadeOut(function(){
            $(this).remove();
        })
        collectedTiles[1].fadeOut(function(){
            $(this).remove();
        })
        
        pairs++;
        
        if(pairs == 10){
            alert("Game is over!")
        }
        
        take==true;
        collectedTiles = [];
    }
    
    function resetTiles(){
        collectedTiles[0].css({'background-image':'url(title.png)' });
        collectedTiles[1].css({'background-image':'url(title.png)'});
        take==true;
        collectedTiles = [];
    }










