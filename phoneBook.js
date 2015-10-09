'use strict';

var phoneBook; // Здесь вы храните записи как хотите
var phoneBook = [];

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/

function checkNomber(nomber) {
    var nomderNotSpaseMassiv = nomber.split(' ');
    var numberNotSpace = '';
    for (i = 0; i < nomderNotSpaseMassiv.length; i++) {
        numberNotSpace += nomderNotSpaseMassiv[i];
    }
    var regexpNomber = /^[+]?[0-9](?:(?:[(]{1}[0-9]+[)]{1})|(?:[0-9]))[0-9-]*/i;
    var numberNomer = regexpNomber.exec(numberNotSpace);
    if (numberNomer == null) {
        numberNomer = '';
    } else {
        numberNomer = numberNomer[0];
    }
    if (numberNomer === numberNotSpace) {
        var flagPlus = 0;
        if (numberNomer[0] == '+') {
            flagPlus = 1;
        }
        if (flagPlus == 1) {
            numberNomer = numberNomer.slice(1);
        }
        var nomderNotBktMassiv = numberNomer.split('(');
        numberNomer = '';
        for (i = 0; i < nomderNotBktMassiv.length; i++) {
            numberNomer += nomderNotBktMassiv[i];
        }
        nomderNotBktMassiv = [];
        nomderNotBktMassiv = numberNomer.split(')');
        numberNomer = '';
        for (i = 0; i < nomderNotBktMassiv.length; i++) {
            numberNomer += nomderNotBktMassiv[i];
        }
        nomderNotBktMassiv = [];
        nomderNotBktMassiv = numberNomer.split('-');
        numberNomer = '';
        for (i = 0; i < nomderNotBktMassiv.length; i++) {
            numberNomer += nomderNotBktMassiv[i];
        }
        if (numberNomer.length == 10 || numberNomer.length == 11 || numberNomer.length == 12) {
            if (flagPlus == 1) {
                numberNomer = '+' + numberNomer;
            }
            return numberNomer;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function checkEmail(email) {
    var emailNotSpaseMassiv = email.split(' ');
    var emailNotSpace = '';
    for (i = 0; i < emailNotSpaseMassiv.length; i++) {
        emailNotSpace += emailNotSpaseMassiv[i];
    }
    var regexpEmail = /^[-_A-zА-я0-9]+@{1}[-_A-zА-я0-9]+(?:[.]{1}[-_A-zА-я0-9]+)+/i;
    var emailPost = regexpEmail.exec(emailNotSpace);
    if (emailPost == null) {
        emailPost = '';
    } else {
        emailPost = emailPost[0];
    }
    if (emailPost != '') {
        return emailPost;
    } else {
        return false;
    }
}

function checkName(name) {
    var nameName = name.trim();
    return nameName;
}

function contact(nameContact, numberContact, emailContact) {
    this.nameContact = nameContact;
    this.numberContact = numberContact;
    this.emailContact = emailContact;
    this.printNumber = function printNumber() {
        var telefon = '+';
        var simpleNomer = '';
        if (this.numberContact[0] != '+') {
            simpleNomer = this.numberContact;
        } else {
            simpleNomer = this.numberContact.slice(1);
        }
        telefon += simpleNomer.slice(0, 1) + ' (' + simpleNomer.slice(1, 4) + ') ' +
            simpleNomer.slice(4, 7) + '-' + simpleNomer.slice(7, 9) + '-' +
            simpleNomer.slice(9);
        return telefon;
    };
    this.printContact = function printContact() {
        var infoContact = [];
        infoContact.push(this.nameContact);
        infoContact.push(this.printNumber());
        infoContact.push(this.emailContact);
        return infoContact;
    };
    this.infoContact = function infoContact() {
        var infoContact = [];
        infoContact.push(this.nameContact);
        infoContact.push(this.numberContact);
        infoContact.push(this.emailContact);
        return infoContact;
    };
}


module.exports.add = function add(name, phone, email) {
    var nameFinish = checkName(name);
    var numberFinish = checkNomber(phone);
    var emailFinish = checkEmail(email);
    if (numberFinish != false && emailFinish != false) {
        var contactNew = new contact(nameFinish, numberFinish, emailFinish);
        phoneBook.push(contactNew);
    } else {
        return false;
    }
}; // Ваша невероятная магия здесь


/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    if (query === undefined) {
        query = '';
    }
    var baseAnswer = [];
    for (i = 0; i < phoneBook.length; i++) {
        var contact = phoneBook[i];
        var contactPrint = contact.printContact();
        contact = contact.infoContact();
        for (j = 0; j < contact.length; j++) {
            var parametr = contact[j];
            if (parametr.indexOf(query) != -1) {
                baseAnswer.push(contactPrint);
                break;
            }
        }
    }
    for (i = 0; i < baseAnswer.length; i++) {
        var info = '';
        var infoContact = baseAnswer[i];
        for (j = 0; j < infoContact.length; j++) {
            if (j == infoContact.length - 1) {
                info += String(infoContact[j]);
            } else {
                info += String(infoContact[j]) + ', ';
            }
        }
        console.log(info);
    }
    // Ваша удивительная магия здесь
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var baseAnswer = [];
    for (i = 0; i < phoneBook.length; i++) {
        var contact = phoneBook[i];
        contact = contact.infoContact();
        var index = i;
        for (j = 0; j < contact.length; j++) {
            var parametr = contact[j];
            if (parametr.indexOf(query) != -1) {
                baseAnswer.push(index);
                break;
            }
        }
    }
    var kolDelete = 0;
    for (i = 0; i < baseAnswer.length; i++) {
        phoneBook.splice(baseAnswer[i] - kolDelete, 1);
        kolDelete ++;
    }
    // Ваша необьяснимая магия здесь
};

function makeSpase(number, text) {
    var textNull = '';
    for (var p = 0; p < number; p++) {
        textNull += text;
    }
    return textNull;
}
/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    //var fs = require('fs');
    //var text = fs.readFileSync(filename, 'utf8');
    //var textLine = text.split("\n");
    var textLine = data.split('\n');
    for (var ii = 0; ii < textLine.length; ii++) {
        var textInfoContact = textLine[ii].split(';');
        var name = textInfoContact[0];
        var tel = textInfoContact[1];
        var email = textInfoContact[2];
        add(name, tel, email);
    }
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var maxLengthName = 0;
    var maxLengthNumber = 0;
    var maxLengtheMail = 0;
    var query = '';
    var baseAnswer = [];
    for (i = 0; i < phoneBook.length; i++) {
        var contact = phoneBook[i];
        var contactPrint = contact.printContact();
        baseAnswer.push(contactPrint);
        var parametrName = contactPrint[0];
        var parametrNumber = contactPrint[1];
        var parametrEmail = contactPrint[2];
        if (parametrName.length > maxLengthName) {
            maxLengthName = parametrName.length;
        }
        if (parametrNumber.length > maxLengthNumber) {
            maxLengthNumber = parametrNumber.length;
        }
        if (parametrEmail.length > maxLengtheMail) {
            maxLengtheMail = parametrEmail.length;
        }
    }
    var maxSize = [maxLengthName, maxLengthNumber, maxLengtheMail];
    var info = '';
    var infoHeaderOne = '|' + makeSpase(maxLengthName, '_') + '|' +
        makeSpase(maxLengthNumber, '_') + '|' + makeSpase(maxLengtheMail, '_') + '|';
    console.log(infoHeaderOne);
    var infoHeader = '|Name' + makeSpase(maxLengthName - 4, ' ') + '|telefon' +
        makeSpase(maxLengthNumber - 7, ' ') + '|email' + makeSpase(maxLengtheMail - 5, ' ') + '|';
    console.log(infoHeader);
    info = '|' + makeSpase(maxLengthName, '_') + '|' + makeSpase(maxLengthNumber, '_') + '|' +
        makeSpase(maxLengtheMail, '_') + '|';
    console.log(info);
    for (i = 0; i < baseAnswer.length; i++) {
        info = '|';
        var infoContact = baseAnswer[i];
        for (j = 0; j < infoContact.length; j++) {
            var textSpase = makeSpase(maxSize[j] - infoContact[j].length, ' ');
            info += infoContact[j] + textSpase + '|';
        }
        console.log(info);
    }
    info = '|' + makeSpase(maxLengthName, '_') + '|' + makeSpase(maxLengthNumber, '_') + '|' +
        makeSpase(maxLengtheMail, '_') + '|';
    console.log(info);
    // Ваша чёрная магия здесь
};
