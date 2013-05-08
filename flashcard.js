/* Angular Flash Cards */
'use strict';
angular.module('flashcard', []);

angular.module('flashcard').directive('flashcards', function() {
  return {
    template: '<h3 class="flashcard-icon">click</h3>' +
              '<div class="cards-hide">' +
              '<div class="card"><span class="card-button">X</span><p class="card-content"></p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '<div class="card"><span class="card-button">X</span><p class="card-content"></p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '<div class="card"><span class="card-button">X</span><p class="card-content"></p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '</div>',

    link: function(scope, element, attrs) {
      // Flash Card Icon Element
      var icon = angular.element(element.children()[0]),

          flashcards = angular.element(element.children()[1]),
          cards = [],
          currentCard,
          nextCard,
          previousCard,
          tempCard, 

          data = { 'title': 'testcards',
                   'cards': [
                     {'content': 'Here is some flash card content',
                      'answer': 'This card has an answer'
                     },
                     {'content': 'Again more flash card content',
                      'answer': 'With an answer too'
                     },
                     {'content': 'This card has no answer'
                     },
                     {'content': 'More content',
                      'answer': 'Another answer'
                     },
                     {'content': 'The last one',
                      'answer': 'With an answer too'
                     }
                   ]
                 },

          numberOfCards = data.cards.length,

          // flashcard showing state
          showing = false,
          answer = false;

      for(var i = 0; i < 3; i++) {
        cards[i] = angular.element(flashcards.children()[i]);
        cards[i]['closebtn'] = angular.element(cards[i].children()[0]);        
        cards[i]['content'] = angular.element(cards[i].children()[1]);
        cards[i]['nextbtn'] = angular.element(cards[i].children()[2]);
        cards[i]['answerbtn'] = angular.element(cards[i].children()[3]);
        cards[i].closebtn.bind('click', toggle_cards);
        cards[i].nextbtn.bind('click', next_question);
        cards[i].answerbtn.bind('click', toggle_answer);
      }

      nextCard = cards[0];
      currentCard = cards[1];
      previousCard = cards[2];

      nextCard.addClass("card-next");
      previousCard.addClass("card-previous");
      previousCard.addClass("card-hide");

      nextCard.content.text(data.cards[1].content);
      currentCard.content.text(data.cards[0].content);
      previousCard.content.text(data.cards[numberOfCards - 1].content);

      icon.bind('click', toggle_cards);

      // Toggle the flashcards visibility
      function toggle_cards() {
        showing = !showing;
        flashcards.removeClass(showing ? 'cards-show' : 'cards-hide');
        flashcards.addClass(showing ? 'cards-hide' : 'cards-show');
      };
 
      // Toggle between questions and answers
      function toggle_answer() {
        answer = !answer;
        //content2.text(answer ? data.cards[0].content : data.cards[0].answer);
       // answerbtn2.text(answer ? 'answer' : 'question');
      };

      // Move to the next question
      function next_question() {
        currentCard.addClass("card-previous");
        nextCard.removeClass("card-next");
        previousCard.addClass("card-next");
        previousCard.removeClass("card-previous");

        // After transition is complete, swap cards & make visible
        setTimeout(function() {
          tempCard = nextCard;
          nextCard = previousCard;
          previousCard = currentCard;
          currentCard = tempCard;
          nextCard.removeClass("card-hide");
          previousCard.addClass("card-hide");
        }, 1000);
      }

      // initialize
      toggle_answer();
      toggle_cards();
    }
  }
});

