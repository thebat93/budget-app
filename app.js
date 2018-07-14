// модуль для структуры данных
var budgetController = (function() {
  
  // конструктор для расходов
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // конструктор для доходов
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // структура данных
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  // Budget Controller API
  return {
    // добавление элемента
    addItem: function(type, desc, val) {
      var newItem, ID;

      // создание нового ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // создание элемента в зависимости от типа
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      // добавляем в структуру данных
      data.allItems[type].push(newItem);
      return newItem;
    }
  };
})();

// модуль UI
var UIController = (function() {

  // селекторы
  var DOMStrings = {
    inputType: ".add__type",
    inputDecription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  // UI Controller API
  return {
    // получение значений
    getInput: function() {
      return {
      // тип: доход/расход
      type: document.querySelector(DOMStrings.inputType).value, // 'inc' / 'exp'

      // описание
      description: document.querySelector(DOMStrings.inputDecription).value,

      // сумма
      value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    // добавление дохода / расхода
    addListItem: function(obj, type) {
      var html, newHtml, element;

      // шаблоны html-кода
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;

        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer;

        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace('%id%', obj.id)
        .replace('%description%', obj.description)
        .replace('%value%', obj.value);

      // добавляем html в div после контента и перед закрывающим тегом
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    // очищение полей ввода
    clearFields: function() {
      var fields, fieldsArr;
      
      // выбор по нескольким селекторам
      fields = document.querySelectorAll(DOMStrings.inputDecription + ', ' + DOMStrings.inputValue);
      
      // првращаем List в Array
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, i, array) {
        current.value = "";
      });

      // фокус на первом инпуте
      fieldsArr[0].focus();
    },

    // получение селекторов
    getDOMStrings: function() {
        return DOMStrings;
    }
  };
})();

// модуль контроллера приложения
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    // обработчик нажатия на кнопку
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    // обработчик нажатия на Enter
    document.addEventListener("keypress", function(event) {
      // which для старых браузеров
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  
  // обновление бюджета
  var updateBudget = function() {

  };

  // добавление нового элемента
  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  
      UIController.addListItem(newItem, input.type);
  
      UIController.clearFields();
    
      updateBudget();
    }
  };

  // Controller API
  return {
    // функция инициализации
    init: function() {
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();