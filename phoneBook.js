'use strict';

var phoneBook;
var phoneBook = [];

function deleteChar(text, charDelete) {
    var simpleTextMassiv = [];
    var simpleTextMassiv = text.split(charDelete);
    var textDeleteChar = '';
    for (var i = 0; i < simpleTextMassiv.length; i++) {
        textDeleteChar += simpleTextMassiv[i];
    }
    return textDeleteChar;
}

function correctionNumber(number) {
    number = number || '';
    var numberNotSpaseMassiv = number.split(' ');
    var numberNotSpace = '';
    for (var i = 0; i < numberNotSpaseMassiv.length; i++) {
        numberNotSpace += numberNotSpaseMassiv[i];
    }
    var regexpNumber = /^[+]?[0-9](?:(?:[(]{1}[0-9]+[)]{1})|(?:[0-9]))[0-9-]*/i;
    var numberNumber = regexpNumber.exec(numberNotSpace);
    if (numberNumber == null) {
        return false;
    } else {
        numberNumber = numberNumber[0];
    }
    if (numberNumber === numberNotSpace) {
        var flagPlus = 0;
        if (numberNumber[0] == '+') {
            flagPlus = 1;
        }
        if (flagPlus == 1) {
            numberNumber = numberNumber.slice(1);
        }
        numberNumber = deleteChar(numberNumber, ')');
        numberNumber = deleteChar(numberNumber, '(');
        numberNumber = deleteChar(numberNumber, '-');
        if (numberNumber.length == 10 || numberNumber.length == 11 || numberNumber.length == 12) {
            if (flagPlus == 1) {
                numberNumber = '+' + numberNumber;
            }
            return numberNumber;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function correctionEmail(email) {
    email = email || '';
    var emailNotSpaseMassiv = email.split(' ');
    var emailNotSpace = '';
    for (var i = 0; i < emailNotSpaseMassiv.length; i++) {
        emailNotSpace += emailNotSpaseMassiv[i];
    }
    var regexpEmail = /^[-_A-zА-я0-9]+@{1}[-_A-zА-я0-9]+(?:[.]{1}[-_A-zА-я0-9]+)+/i;
    var emailPost = regexpEmail.exec(emailNotSpace);
    if (emailPost == null) {
        return false;
    } else {
        return emailPost[0];
    }
}

function printNumber(number) {
    var phone = '+';
    var simpleNumber = '';
    if (number[0] != '+') {
        simpleNumber = number;
    } else {
        simpleNumber = number.slice(1);
    }
    phone += simpleNumber.slice(0, 1) + ' (' + simpleNumber.slice(1, 4) + ') ' +
        simpleNumber.slice(4, 7) + '-' + simpleNumber.slice(7, 9) + '-' +
        simpleNumber.slice(9);
    return phone;
}

function Contact(nameContact, numberContact, emailContact) {
    this.nameContact = nameContact;
    this.numberContact = numberContact;
    this.emailContact = emailContact;
}

module.exports.add = function add(name, phone, email) {
    var nameFinish = name.trim();
    var numberFinish = correctionNumber(phone);
    var emailFinish = correctionEmail(email);
    if (numberFinish != false && emailFinish != false) {
        var contactNew = new Contact(nameFinish, numberFinish, emailFinish);
        phoneBook.push(contactNew);
    } else {
        return false;
    }
};

module.exports.find = function find(query) {
    if (query === undefined) {
        query = '';
    }
    var baseAnswer = [];
    for (var i = 0; i < phoneBook.length; i++) {
        var contactPrint = [phoneBook[i].nameContact,printNumber(phoneBook[i].numberContact),
            phoneBook[i].emailContact];
        var contact = [phoneBook[i].nameContact,phoneBook[i].numberContact,
            phoneBook[i].emailContact];
        for (var j = 0; j < contact.length; j++) {
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
};

module.exports.remove = function remove(query) {
    var baseAnswer = [];
    for (var i = 0; i < phoneBook.length; i++) {
        var contact = [phoneBook[i].nameContact,phoneBook[i].numberContact,
            phoneBook[i].emailContact];
        var index = i;
        for (var j = 0; j < contact.length; j++) {
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
};

function makeSpase(number, text) {
    var textNull = '';
    for (var p = 0; p < number; p++) {
        textNull += text;
    }
    return textNull;
}

module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var textLine = data.split('\n');
    for (var ii = 0; ii < textLine.length; ii++) {
        var textInfoContact = textLine[ii].split(';');
        var name = textInfoContact[0];
        var tel = textInfoContact[1];
        var email = textInfoContact[2];
        module.exports.add(name, tel, email);
    }
};

module.exports.showTable = function showTable() {
    var maxLengthName = 0;
    var maxLengthNumber = 0;
    var maxLengtheMail = 0;
    var query = '';
    var baseAnswer = [];
    for (var i = 0; i < phoneBook.length; i++) {
        var contactPrint = [phoneBook[i].nameContact,printNumber(phoneBook[i].numberContact),
            phoneBook[i].emailContact];
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
        for (var j = 0; j < infoContact.length; j++) {
            var textSpase = makeSpase(maxSize[j] - infoContact[j].length, ' ');
            info += infoContact[j] + textSpase + '|';
        }
        console.log(info);
    }
    info = '|' + makeSpase(maxLengthName, '_') + '|' + makeSpase(maxLengthNumber, '_') + '|' +
        makeSpase(maxLengtheMail, '_') + '|';
    console.log(info);
};
