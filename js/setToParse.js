'use strict';

function sendSet() {
  if ($('#TAppName').val() != '') {
    Parse.initialize("LD5YXs0MuB68HbSzl6QW0RMXKfHlYRNgGx1zi7y8", "lJrNywD6Nwg385fbD2iZXYMu28qMneb75UkYVVJB");
    //Parse.initialize("QjdehMNJpHm3oPhLP5sB4W6RFU4nsWnXJGXaw5nO", "t733V304NxKk6xmdZKXLopqNOc2NKVnLLLWQioEj");
    var objectId = getValue("id");
    var num = $('#CurrentId').val();
    var IObject = Parse.Object.extend("j");
    var query = new Parse.Query(IObject);
    query.equalTo("objectId", objectId);
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if ($('#Tbase64').val().length > 0) {
            var parseFile = new Parse.File('icon' + num + '.jpg', {
              base64: $('#Tbase64').val()
            });
            object.set('icon' + num, parseFile);
            object.set('f' + num, true);
          }

          object.save({
            title: $('#TAppName').val(),
            memo: $('#TAppMemo').val()

          }, {
            success: function(object) {
              alert("iApp儲存成功");
              window.location = 'index.html?id=' + objectId;
            },
            error: function(object, error) {
              alert("iApp儲存失敗");
              // The save failed.
              // error is a Parse.Error with an error code and message.
            }
          }).then(function(object) {});
        }
      },
      error: function(error) {
        alert('can\'t find');
      }
    });
  }else
  alert('請輸入名稱');
}

function getValue(varname) {
  var url = window.location.href;
  var qparts = url.split("?");
  if (qparts.length == 0) {
    return "";
  }
  var query = qparts[1];
  var vars = query.split("&");
  var value = "";
  for (var i = 0; i < vars.length; i++) {
    var parts = vars[i].split("=");
    if (parts[0] == varname) {
      value = parts[1];
      break;
    }
  }
  value = unescape(value);
  value.replace(/\+/g, " ");
  return value;
}
