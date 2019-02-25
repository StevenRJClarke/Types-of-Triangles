//Remove collapse
$('.collapse').off();

let newTriangleArray = [];

createTriangles();

// Generate random triangles
function createTriangles() {
  //Create triangle HTML (for acute, obtuse and reflex) and insert in angle holder
  let equilateralHTML = '<div class="draggable gradient-background"><div class="equilateral-triangle"><img ></div></div>';
  let isoscelesHTML = '<div class="draggable gradient-background"><div class="isosceles-triangle"><img ></div></div>';
  let scaleneHTML = '<div class="draggable gradient-background"><div class="scalene-triangle"><img ></div></div>';

  //Generate equilateral triangles
  for (i = 0; i < 2; i++) {
    $('.triangle-holder').append(equilateralHTML);
  }

  //Generate isosceles triangles
  for (i = 0; i < 2; i++) {
    $('.triangle-holder').append(isoscelesHTML);
  }

  //Generate scalene triangles
  for (i = 0; i < 2; i++) {
    $('.triangle-holder').append(scaleneHTML);
  }

  //Choose triangles at random from array.
  //Class as equilateral, isosceles or scalene

  let equilateralArray = ['equilateral_1.png', 'equilateral_2.png', 'equilateral_3.png', 'equilateral_4.png', 'equilateral_5.png'];
  let isoscelesArray = ['isosceles_1.png', 'isosceles_2.png', 'isosceles_3.png', 'isosceles_4.png', 'isosceles_5.png', 'isosceles_6.png', 'isosceles_7.png', 'isosceles_8.png', 'isosceles_9.png', 'isosceles_10.png', 'isosceles_11.png', 'isosceles_12.png', 'isosceles_13.png', 'isosceles_14.png', 'isosceles_15.png', 'isosceles_16.png', 'isosceles_17.png'];
  let scaleneArray = ['scalene_1.png', 'scalene_2.png', 'scalene_3.png', 'scalene_4.png', 'scalene_5.png', 'scalene_6.png', 'scalene_7.png', 'scalene_8.png', 'scalene_9.png', 'scalene_10.png'];

  let eqCopyArray = equilateralArray.slice();
  let isosCopyArray = isoscelesArray.slice();
  let scalCopyArray = scaleneArray.slice();

  $('.equilateral-triangle').each(function() {
    //Choose random element of array
    let index = Math.floor(Math.random() * eqCopyArray.length);

    let equilateralTriangle = eqCopyArray[index];

    //Remove chosen element of array
    eqCopyArray.splice(index, 1);

    //Add image to card
    $(this).children('img').attr('src', 'images/' + equilateralTriangle);
    $(this).parent('.draggable').addClass('equilateral');
  })

  $('.isosceles-triangle').each(function() {
    //Choose random element of array
    let index = Math.floor(Math.random() * isosCopyArray.length);

    let isoscelesTriangle = isosCopyArray[index];

    //Remove chosen element of array
    isosCopyArray.splice(index, 1);

    //Add image to card
    $(this).children('img').attr('src', 'images/' + isoscelesTriangle);
    $(this).parent('.draggable').addClass('isosceles');
  })

  $('.scalene-triangle').each(function() {
    //Choose random element of array
    let index = Math.floor(Math.random() * scalCopyArray.length);

    let scaleneTriangle = scalCopyArray[index];

    //Remove chosen element of array
    scalCopyArray.splice(index, 1);

    //Add image to card
    $(this).children('img').attr('src', 'images/' + scaleneTriangle);
    $(this).parent('.draggable').addClass('scalene');
  })

  //Shuffle triangles

  //Place each triangle in an array
  let triangleArray = $('.draggable');

  //Remove the triangles from the page
  triangleArray.each(function() {
    $(this).remove();
  })

  //Shuffle the triangles
  newTriangleArray = shuffle(triangleArray);

  //Place the shuffled triangles back onto the page
  newTriangleArray.each(function() {
    $('.triangle-holder').prepend($(this));
  })

  //Make triangles draggable

  let equilateral, isosceles, scalene;

  $('.draggable').draggable({
    containment: $('.widget-canvas'),
    cursor: 'pointer',
    cursorAt: {top: 50, left: 50},
    opacity: 0.5,
    revert: 'invalid',

    start: function() {
      click++;
      if (click == 1) {
        startTime();
      }
    },

    drag: function() {
      $('.droppable').addClass('highlight');
    },

    stop: function() {
      $('.droppable').removeClass('highlight');
    }
  });
}

//Pick triangles
function pickTriangle(array) {


  }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex); //Choose a random index from the card array (a number between 0 and 15)
    currentIndex -= 1; //Decrement the current index by 1 (from 16 to 15, from 15 to 14 etc...)
    temporaryValue = array[currentIndex]; //Store the currently indexed card
    array[currentIndex] = array[randomIndex]; //Replace the currently indexed card with the randomly chosen card...
    array[randomIndex] = temporaryValue; //...and replace the card that was randomly chosen with the currently index card... a swap!
  }

  return array;
}


// Create droppable areas
$('.droppable').droppable({
  tolerance: 'pointer'
})

//Droppable areas check whether correct type of triangle has been dropped or not
let correct = 0, incorrect = 0, heart = 5;

$('.equilateral-drop').droppable({
  drop: function(event, ui) {
    var dropped = ui.draggable;

    //Check whether an equilateral triangle has been dropped
    if (dropped.hasClass('equilateral')) {
      correctDrop(dropped);
    } else {
      wrongDrop(dropped);
    }
  }
})

$('.isosceles-drop').droppable({
  drop: function(event, ui) {
    var dropped = ui.draggable;

    //Check whether an isosceles triangle has been dropped
    if (dropped.hasClass('isosceles')) {
      correctDrop(dropped);
    } else {
      wrongDrop(dropped);
    }
  }
})

$('.scalene-drop').droppable({
  drop: function(event, ui) {
    var dropped = ui.draggable;

    //Check whether a scalene triangle has been dropped
    if (dropped.hasClass('scalene')) {
      correctDrop(dropped);
    } else {
      wrongDrop(dropped);
    }
  }
})

//Correct type of triangle dropped
function correctDrop(triangle) {
  //Add styling
  $(triangle).addClass('correct');

  //Add shake animation
  $(triangle).effect('shake', {direction: "up", times: 2, distance: 30});

  //Prevent correct triangle from being dragged again
  $(triangle).draggable('disable');

  //Triangle should not revert to original position
  $(triangle).draggable('option', 'revert', false);

  //Count number of correct answers
  correct++;

  //Check winning condition
  if (correct == 6) {
    win();
  }
}

//Wrong type of triangle dropped
function wrongDrop(triangle) {
  //Add styling
  $(triangle).addClass('wrong');

  //Add shake animation
  $(triangle).effect('shake', {times: 2, distance: 30});

  //Remove styling
  window.setTimeout(function() {
    $(triangle).removeClass('wrong');
  }, 500)

  //Count number of incorrect attempts
  incorrect++;

  // Remove heart after incorrect attempt
  if (incorrect == 1) {
    $('.hearts i:nth-of-type(5)').removeClass('fa-heart').addClass('fa-heart-o');
    heart--;
  } else if (incorrect == 2) {
    $('.hearts i:nth-of-type(4)').removeClass('fa-heart').addClass('fa-heart-o');
    heart--;
  } else if (incorrect == 3) {
    $('.hearts i:nth-of-type(3)').removeClass('fa-heart').addClass('fa-heart-o');
    heart--;
  } else if (incorrect == 4) {
    $('.hearts i:nth-of-type(2)').removeClass('fa-heart').addClass('fa-heart-o');
    heart--;
  } else if (incorrect == 5) {
    $('.hearts i:nth-of-type(1)').removeClass('fa-heart').addClass('fa-heart-o');
    heart--;
  }

  //Check losing condition
  if (heart == 0) {
    lose();
  }

  //Triangle should revert to original position
  $(triangle).draggable('option', 'revert', true);
}

//Start time on first click of a triangle

let click = 0, time = 0, intervalID;

function startTime() {
  intervalID = window.setInterval(function() {

    // Time increments by 1 each second
    time++;
    $('.time').text(" " + time);
  }, 1000);
}

let won = false; lost = false;
//Announce the game has been won
function win() {
  won = true;

  //Display time taken
  clearInterval(intervalID);
  $('.time-modal').text(time);

  //Display hearts
  for (let i = 0; i < heart; i++) {
    $('.hearts-modal').prepend('<i class="fa fa-heart" aria-hidden="true"></i>');
  };
  if (heart == 1) {
    $('.hearts-modal').append(' heart');
  } else {
    $('.hearts-modal').append(' hearts');
  }

  //Display win modal
  $('.win').css('display', 'flex');
}

//Announce the game has been lost
function lose() {
  lost = true;

  clearInterval(intervalID);

  $('.lose').css('display', 'flex');
}

//Restart game from modal or from restart icon
$('.modal-button').click(restartGame);
$('.fa-repeat').click(restartGame);

function restartGame() {
  if (!(won || lost)) {
    clearInterval(intervalID);
  }

  //Close modal
  $('.modal').css('display', 'none');

  //Reset model
  $('.time-modal').text('');
  $('.hearts-modal').text('');

  //Reset time
  time = 0;
  $('.time').text(" " + time);

  //Reset hearts
  heart = 5;
  $('.hearts').find('i').removeClass('fa-heart-o').addClass('fa-heart');

  //Reset clicks
  click = 0;

  //Reset correct answers
  correct = 0;

  //Reset incorrect answers
  incorrect = 0;

  //Reset won
  won = false;

  //Reset lost
  lost = false;

  //Remove current fractions
  newTriangleArray.remove();

  //Generate new fractions
  createTriangles();
}