console.log( 'js sourced' );
// array for students
var students=[];
var currentStudent = 0;
// json url
var jsonURL = 'http://devjana.net/pi/pi_students.json';

$( document ).ready( function(){
  // JQ?
  console.log( 'doc ready' );
  // ajax call to get info from JSON
  $.ajax({
    url: jsonURL,
    dataType: 'JSON',
    success: function( data ){
      console.log( 'in ajax success:', data );
      // extracting students array from returned data
      // and assigning it to our global students array
      students = data.students;
      // update display
      displayStudent();
      // display buttons
      displayButtons();
    }
  }); // end ajax


  $( '#outputDiv').on( 'click', function(){
    console.log( 'in outputDiv click' );
    nextStudent();
  });

  $( '#prevButton').on( 'click', function(){
    console.log( 'in prevButton click' );
    prevStudent();
  });

  $( '#nextButton').on( 'click', function(){
    console.log( 'in nextButton click' );
    nextStudent();
  });

  $( 'body' ).on( 'click', '.studentButton', function(){
    // get data-id of clicked button
    console.log( 'in body studentButton click', $( this ).attr( 'data-id' ) );
    // update currentStudent
    currentStudent = $( this ).attr( 'data-id' );
    // update display
    displayStudent();
  });
}); // end doc ready

var displayButtons = function(){
  console.log( 'in displayButtons' );
  // loop through students array
  // append a button to buttonDiv
  var buttonDivText = '';
  for (var i = 0; i < students.length; i++) {
    // set class to "studentButton" for body click
    // set data-id to "i", student index
    buttonDivText += '<button class="studentButton" data-id=' + i +'>' + students[i].first_name + '</button>';
  }
  $( '#buttonDiv' ).html( buttonDivText );
} // end displayButtons

var displayStudent = function(){
  console.log( 'in displayStudent', currentStudent );
  // assemble output text
  // show all students
  var outputText ='';
  // current student info
  if( students[ currentStudent ].first_name=='Cody' && students[ currentStudent ].last_name=='Ogden'){
    outputText += '<p>' + students[ currentStudent ].first_name + ' ' + students[ currentStudent ].last_name + ': Liz Lemon is his spirit animal</p>';
  }
  else{
    // not Cody so use what is in the JSON
    outputText += '<p>' + students[ currentStudent ].first_name + ' ' + students[ currentStudent ].last_name + ': ' + students[ currentStudent ].info + '</p>';
  }
  // counter
  // adjust for off by one
  var adjustedIndex = Number( currentStudent ) + 1;
  outputText += '<p>' + adjustedIndex + '/' + students.length + '</p>';
  $( '#outputDiv').fadeOut( 'slow', function(){
    // stuff that happens after fade outputDiv
    console.log( 'fade out should be done now' );
    // update HTML
    $( '#outputDiv').html( outputText ).fadeIn();
  });
} // end displayStudent

var prevStudent = function(){
  console.log( 'in prevStudent');
  // decrement currentStudent
  currentStudent--;
  // wrap if at 0th
  if( currentStudent < 0 ){
    // adjust for 'off by one'
    currentStudent = students.length - 1;
  }
  // update display
  displayStudent();
} // end prevStudent

var nextStudent = function(){
  console.log( 'in nextStudent');
  // increment currentStudent
  currentStudent++;
  // wrap to first if at end
  if( currentStudent >= students.length ){
    currentStudent=0;
  }
  // update display
  displayStudent();
} // end nextStudent
