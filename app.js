// модуль для структуры данных
var budgetController = (function() {})();

// модуль UI
var UIController = (function() {})();

// модуль контроллера приложения
var controller = (function(budgetCtrl, UICtrl) {
  // добавление нового элемента
  var ctrlAddItem = function() {};
  // обработчик нажатия на кнопку
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  // обработчик нажатия на Enter
  document.addEventListener("keypress", function(event) {
    //   which для старых браузеров
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
