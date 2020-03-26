$(document).ready(function () {
var words = [
    {number:1,direction:'down',row:1,column:2,clue:'The war fought between the northern states and the southern states.',answer:'civilwar',hint:'http://www.angelo.edu/asu_facts/history.php'},
    {number:2,direction:'down',row:1,column:6,clue:'The group of people who were taken to America and sold as slaves.',answer:'africans',hint:'http://www.angelo.edu/services/ticket_office/softball.php'},
    {number:3,direction:'across',row:1,column:10,clue:'The first ten amendments to the Constitution.',answer:'billofrights',hint:'http://www.angelo.edu/services/specialevents/hhuc.php'},
    {number:4,direction:'down',row:1,column:13,clue:'The territory which the United States bought from France in 1803.',answer:'louisianaterritory',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:5,direction:'across',row:3,column:18,clue:'The month in which presidential elections take place.',answer:'november',hint:'http://myfuture.angelo.edu/content/news/13280-rams-ultimate-frisbee'},
    {number:6,direction:'down',row:3,column:25,clue:'The political party of the current president.',answer:'republican',hint:'http://www.angelosports.com/news/2017/5/20/no-1-rambelles-clinch-trip-to-college-softball-world-series-with-6-2-win-over-texas-woman-s.aspx'},
    {number:7,direction:'across',row:4,column:5,clue:'The office which takes over as President if the President can no longer serve.',answer:'vicepresident',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:8,direction:'across',row:6,column:12,clue:'The movement to end racial discrimination.',answer:'civilrights',hint:'https://youtu.be/VGF4ibgcHQE?t=6s'},
    {number:9,direction:'across',row:7,column:2,clue:'The ocean of the east coast of the United States.',answer:'atlantic',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:10,direction:'across',row:8,column:11,clue:'The supreme law of the United States.',answer:'constitution',hint:'http://www.angelo.edu/content/profiles/6250-blue-and-gold'},
    {number:11,direction:'down',row:10,column:2,clue:'The name of the city where the Statue of liberty is located.',answer:'newyork',hint:'http://www.angelo.edu/content/news/15372-10000-strong'},
    {number:12,direction:'across',row:10,column:7,clue:'The factor that determines the number of representatives a state has.',answer:'population',hint:'http://www.angelo.edu/content/news/13930-asu-goes-clubbing/'},
    {number:12,direction:'down',row:10,column:7,clue:'The head of the Executive Branch.',answer:'president',hint:'http://www.angelo.edu/content/news/13930-asu-goes-clubbing/'},
    {number:13,direction:'across',row:10,column:19,clue:'The ocean on the west coast of the United States.',answer:'pacific',hint:'http://www.angelo.edu/content/news/15450-ram-rugby-football-club'},
    {number:14,direction:'across',row:12,column:10,clue:'The first President of the United States.',answer:'georgewashington',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:15,direction:'across',row:14,column:1,clue:'The primary concern of the United States during the Cold War.',answer:'communism',hint:'https://www.angelo.edu/asu_facts/traditions.php'},
    {number:16,direction:'across',row:15,column:11,clue:'The group of people who lived in America before European settlers arrived.',answer:'nativeamericans',hint:'http://www.angelosports.com/news/2017/5/27/fischer-wins-javelin-national-title-rams-place-10th-and-rambelles-tie-for-13th-at-ncaa-division-ii-track-field-championships.aspx'},
    {number:17,direction:'across',row:17,column:10,clue:'The highest court in the United States.',answer:'supremecourt',hint:'http://www.angelo.edu/content/news/15478-athletics-takes-some-big-wins'},
];



// Set global variables
var gridSize = [25,18];     // number of squares wide, number of squares tall
var direction = 'across';   // set initial direction to 'across'
var markCorrect = true;     // indicates ability for answers to be marked correct. will be set to false if "show answers" is clicked
var successShown = false;   // indicates whether the success modal has been shown
var $clueTooltip = $('<div class="clue-tooltip invisible"><div class="clue-tooltip-arrow"></div><div class="clue-tooltip-text"></div></div>').appendTo('.crossword');

// set up the base grid
var $crosswordPuzzle = $('<div class="crossword-puzzle col-md-8 col-lg-9"></div>');
var $table = $('<table class="crossword-grid"></table>');
for ( i=0; i<gridSize[1]; i++) {
    var $row = $('<tr class="grid-row"></tr>');
    for (j=0;j<gridSize[0];j++) {
        $square = $('<td class="grid-square"></td>');
        $square.appendTo($row);
    }
    $row.appendTo($table);
    $table.appendTo($crosswordPuzzle);
    $crosswordPuzzle.appendTo('.crossword');
}

// Add the fields to the grid
for (i=0;i<words.length;i++) {
    var row = words[i].row;
    var column = words[i].column;
    for (j=0;j<words[i].answer.length;j++) {
        var $square = $('.grid-row').eq(row-1).find('.grid-square').eq(column-1);
        var title = words[i].clue+', letter '+(j+1)+' of '+words[i].answer.length;
        var id = (words[i].direction == 'across' ? 'a' : 'd') + '-' + words[i].number + '-' + (j+1);
        if (j==0 && $square.find('.word-label').length == 0) {
            $('<span class="word-label">'+words[i].number+'</span>').appendTo($square);
        }
        if ($square.find('input').length == 0) {
            var $input = $('<input type="text" class="letter" title="'+title+'" id="'+id+'" maxlength="1" />');
                if (words[i].direction == 'across') {
                    $input.attr('data-across',words[i].number);
                    $input.attr('data-across-clue',words[i].clue);
                } else {
                    $input.attr('data-down',words[i].number);
                    $input.attr('data-down-clue',words[i].clue);
                }
                $input.data('letter',words[i].answer[j]);
                $input.appendTo($square);
            $square.addClass('active');
        } else {
            var $input = $square.find('input');
                $input.attr('title',$input.attr('title')+'; '+title);
                $input.attr('id',$input.attr('id')+'+'+id);
                if (words[i].direction == 'across') {
                    $input.attr('data-across',words[i].number);
                    $input.attr('data-across-clue',words[i].clue);
                } else {
                    $input.attr('data-down',words[i].number);
                    $input.attr('data-down-clue',words[i].clue);
                }
        }
        if (words[i].direction == 'down') {
            row++;
        } else {
            column++;
        }
    }
}

// Add the clues to the page
var $crosswordClues = $('<div class="crossword-clues col-md-4 col-lg-3"><div class="row" id="josey"></div></div>');
var $acrossClues = $('<div class="col"><div class="across-clues col-sm-6 col-md-12"><p><strong>Across</strong></p><ol></ol></div></div>');
var $downClues = $('<div class="col"><div class="down-clues col-sm-6 col-md-12"><p><strong>Down</strong></p><ol></ol></div></div>');
for (i=0;i<words.length;i++) {
    var $clue = $('<li value="'+words[i].number+'" data-direction="'+words[i].direction+'" data-clue="'+words[i].number+'"><label>'+words[i].clue+' </label></li>');
        $clue.find('label').attr('for',$('[data-'+words[i].direction+'='+words[i].number+']').eq(0).attr('id'));
        $clue.on('click',function(){
            direction = $(this).data('direction');
        })
    if ( words[i].hint.length > 0 && words[i].hint != '' ) {
        $('<a class="hint" href="'+words[i].hint+'" target="_blank" title="Hint for '+words[i].number+' '+words[i].direction+'">(Hint)</a>').appendTo($clue.find('label'));
    }
    if (words[i].direction == 'across') {
        $clue.appendTo($acrossClues.find('ol'));
    } else {
        $clue.appendTo($downClues.find('ol'));
    }
}
$acrossClues.appendTo($crosswordClues.find('.row'));
$downClues.appendTo($crosswordClues.find('.row'));
$crosswordClues.appendTo('.crossword');

// Add the hints, reset, and show answers buttons
var $puzzleButtons = $('<div class="crossword-buttons"></div>');
var $hintsButton = $('<button class="btn btn-default">Show Hints</button>');
    $hintsButton.on('click',function(e){
        e.preventDefault();
        $('.crossword-clues').toggleClass('show-hints');
        $(this).text( $(this).text() == 'Show Hints' ? 'Hide Hints' : 'Show Hints' );
    });
    $hintsButton.appendTo($puzzleButtons);
var $resetButton = $('<button class="btn btn-default">Clear Puzzle</button>');
    $resetButton.on('click',function(e){
        e.preventDefault();
        $('input.letter').val('').parent('.grid-square').removeClass('correct-down correct-across');
        $('.crossword-clues li').removeClass('correct');
        markCorrect = true;
    });
    $resetButton.appendTo($puzzleButtons);
var $solveButton = $('<button class="show-answers btn btn-default">Show Answers</button>');
    $solveButton.on('click',function(e){
        e.preventDefault();
        $('input.letter').each(function(){
            $(this).val($(this).data('letter'));
        });
        markCorrect = false;
    });
    $solveButton.appendTo($puzzleButtons);
$puzzleButtons.appendTo('.crossword');

// Add the success modal
var $modal = $('<div class="modal fade" id="success-modal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Congratulations!</h4></div><div class="modal-body"><p>You have finished the puzzle.</p></div></div></div></div>');
$modal.appendTo('body');

// When a square is focused, highlight the other squares in that word and the clue, and show the tooltip
$('input.letter').on('focus',function(){
    var $current = $(this);
    $current.select();
    $current[0].setSelectionRange(0, 10);
    getDirection($current);
    $('[data-'+direction+'='+$current.data(direction)+']').parent('.grid-square').addClass('current-word');
    $('.crossword-clues li').removeClass('active');
    $('.crossword-clues li[data-direction='+direction+'][data-clue='+$(this).data(direction)+']').addClass('active');
    $clueTooltip.css({'left':tooltipPosition($current).left+'px','top':tooltipPosition($current).top-10+'px'}).removeClass('invisible').find('.clue-tooltip-arrow').css('left',tooltipPosition($current).offset+'px');
})

// When a square is blurred, remove highlight from squares and clue
$('input.letter').on('blur',function(){
    $('.grid-square').removeClass('current-word');
    $('.crossword-clues li').removeClass('active');
    $clueTooltip.addClass('invisible');
})

// handle directional and letter keys in letter inputs
$('input.letter').on('keyup',function(e){
    var $current = $(this);
    if (e.which == 38) {      // up arrow moves to square above if it exists
        direction = 'down';
        if (getPrevLetter($current)) {
            getPrevLetter($current).focus();
        }
    } else if (e.which == 40) {      // down arrow moves to square below if it exists
        direction = 'down';
        if (getNextLetter($current)) {
            getNextLetter($current).focus();
        }
    } else if (e.which == 37) {      // left arrow moves to square to the left if it exists
        direction = 'across';
        if (getPrevLetter($current)) {
            getPrevLetter($current).focus();
        }
    } else if (e.which == 39) {      // right arrow moves to square to the right if it exists
        direction = 'across';
        if (getNextLetter($current)) {
            getNextLetter($current).focus();
        }
    } else {
        e.preventDefault();
    }
    if (markCorrect) {
        checkWord($current);
    };
})

// Tab and Shift/Tab move to next and previous words
$('input.letter').on('keydown',function(e){
    var $current = $(this);
    if (e.which == 9) {       // tab
        e.preventDefault();
        if (e.shiftKey) {       // shift/tab
            getPrevWord($current).focus();
        } else {
            getNextWord($current).focus();
        }
    } else if (e.which == 8) {        // backspace
        e.preventDefault();
        if ($(this).val().length > 0) {
            $(this).val('');
        } else {
            if (getPrevLetter($current)) {
                getPrevLetter($current).focus().val('');
            }
        }
    } else if ((e.which>=48 && e.which<=90) || (e.which>=96 && e.which<=111) || (e.which>=186 && e.which<=192) || (e.which>=219 && e.which<=222)) {    // typeable characters move to the next square in the word if it exists
        e.preventDefault();
        $current.val(String.fromCharCode(e.which));
        if (getNextLetter($current)) {
            getNextLetter($current).focus();
        }
    }
    if (markCorrect) {
        checkWord($current);
    };
})

// Check if all letters in selected word are correct
function checkWord($current) {
    var correct;
    var currentWord;
    if ( $current.is('[data-across]') ) {
        correct = 0;
        currentWord = $current.data('across');
        $('[data-across='+currentWord+']').each(function(){
            if ($(this).val().toLowerCase() == $(this).data('letter').toLowerCase()) {
                correct += 1;
            }
        })
        if (correct == $('[data-across='+currentWord+']').length ) {
            $('[data-across='+currentWord+']').parent('.grid-square').addClass('correct-across');
            $('.crossword-clues li[data-direction=across][data-clue='+currentWord+']').addClass('correct');
        } else {
            $('[data-across='+currentWord+']').parent('.grid-square').removeClass('correct-across');
            $('.crossword-clues li[data-direction=across][data-clue='+currentWord+']').removeClass('correct');
        }
    }
    if ( $current.is('[data-down]') ) {
        correct = 0;
        currentWord = $current.data('down');
        $('[data-down='+currentWord+']').each(function(){
            if ($(this).val().toLowerCase() == $(this).data('letter').toLowerCase()) {
                correct += 1;
            }
        })
        if (correct == $('[data-down='+currentWord+']').length ) {
            $('[data-down='+currentWord+']').parent('.grid-square').addClass('correct-down');
            $('.crossword-clues li[data-direction=down][data-clue='+currentWord+']').addClass('correct');
        } else {
            $('[data-down='+currentWord+']').parent('.grid-square').removeClass('correct-down');
            $('.crossword-clues li[data-direction=down][data-clue='+currentWord+']').removeClass('correct');
        }
    }
    if ($('.grid-square.active:not([class*=correct])').length == 0 && !successShown) {
        $(function () {
            $("input.letter").attr("disabled", true);
        });
        bluesClues();
        successShown = true;
    }
}

// Return the input of the first letter of the next word in the clues list
function getNextWord($current) {
    var length = $('.crossword-clues li').length;
    var index = $('.crossword-clues li').index($('.crossword-clues li.active'));
    var nextWord;
    if (index < length-1) {
        $nextWord = $('.crossword-clues li').eq(index+1);
    } else {
        $nextWord = $('.crossword-clues li').eq(0);
    }
    direction = $nextWord.data('direction');
    return $('[data-'+$nextWord.data('direction')+'='+$nextWord.data('clue')+']').eq(0);
}

// Return the input of the first letter of the previous word in the clues list
function getPrevWord($current) {
    var length = $('.crossword-clues li').length;
    var index = $('.crossword-clues li').index($('.crossword-clues li.active'));
    var prevWord;
    if (index > 0) {
        $prevWord = $('.crossword-clues li').eq(index-1);
    } else {
        $prevWord = $('.crossword-clues li').eq(length-1);
    }
    direction = $prevWord.data('direction');
    return $('[data-'+$prevWord.data('direction')+'='+$prevWord.data('clue')+']').eq(0);
}

// If there is a letter square before or after the current letter in the current direction, keep global direction the same, otherwise switch global direction
function getDirection($current) {
    if (getPrevLetter($current) || getNextLetter($current)) {
        direction = direction;
    } else {
        direction = (direction == 'across') ? 'down' : 'across';
    }
}

// Return the input of the previous letter in the current word if it exists, otherwise return false
function getPrevLetter($current) {
    var index = $('[data-'+direction+'='+$current.data(direction)+']').index($current);
    if (index > 0) {
       return $('[data-'+direction+'='+$current.data(direction)+']').eq(index-1);
    } else {
       return false;
    }
}

// Return the input of the next letter in the current word if it exists, otherwise return false
function getNextLetter($current) {
    var length = $('[data-'+direction+'='+$current.data(direction)+']').length;
    var index = $('[data-'+direction+'='+$current.data(direction)+']').index($current);
    if (index < length-1) {
       return $('[data-'+direction+'='+$current.data(direction)+']').eq(index+1);
    } else {
       return false;
    }
}

// Return the top, left, and offset positions for tooltip placement
function tooltipPosition($current) {
    var left = $('[data-'+direction+'='+$current.data(direction)+']').eq(0).offset().left - $('.crossword').offset().left;
    var top = $('[data-'+direction+'='+$current.data(direction)+']').eq(0).offset().top - $('.crossword').offset().top;
    $clueTooltip.find('.clue-tooltip-text').text($current.data(direction+'-clue'));
    var right = left + $clueTooltip.outerWidth();
    var offset = right - $('.crossword-puzzle').outerWidth();
        offset = offset > 0 ? offset : 0;
    left = left - offset;
    return {'left':left,'top':top,'offset':offset};
}

function bluesClues(){
    document.getElementById("a-3-10").parentElement.style.backgroundColor = "blue";
    document.getElementById("a-7-6").parentElement.style.backgroundColor = "blue";
    document.getElementById("d-2-6").parentElement.style.backgroundColor = "blue";
    document.getElementById("d-6-5").parentElement.style.backgroundColor = "blue";
    document.getElementById("a-10-8").parentElement.style.backgroundColor = "blue";
    document.getElementById("d-4-11").parentElement.style.backgroundColor = "blue";
    document.getElementById("a-14-13").parentElement.style.backgroundColor = "blue";
    document.getElementById("d-11-6").parentElement.style.backgroundColor = "blue";
    document.getElementById("a-16-8").parentElement.style.backgroundColor = "blue";
}

});