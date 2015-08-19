'use strict';
var picNum = 10;
var textNum = 4;
Parse.initialize("LD5YXs0MuB68HbSzl6QW0RMXKfHlYRNgGx1zi7y8", "lJrNywD6Nwg385fbD2iZXYMu28qMneb75UkYVVJB");
//Parse.initialize('QjdehMNJpHm3oPhLP5sB4W6RFU4nsWnXJGXaw5nO', 't733V304NxKk6xmdZKXLopqNOc2NKVnLLLWQioEj');
var iObject = Parse.Object.extend('j');
var IObject = new iObject();

for (var i = 1; i <= picNum; i++) {
  IObject.set('f' + ('0' + i).slice(-2), false);
}
IObject.save({
  picNum: picNum,
  textNum:textNum
});


function sendImageToParse(num, imgBase64) {
  var parseFile = new Parse.File('p' + num + '.jpg', {
    base64: imgBase64
  }); //Parse 部分
  IObject.set('pic' + num, parseFile);
  IObject.set('f' + num, true);
  IObject.save({
    title: 'maker',


  }, {
    success: function(object) {
      // alert("save image success");
    },
    error: function(object, error) {
      alert("上傳失敗");
      // The save failed.
      // error is a Parse.Error with an error code and message.
    }
  }).then(function(object) {});
}



function Send() {
  document.getElementById('uploading').style.display = 'inline';
  var query = new Parse.Query(iObject);
  // console.log(query);
  query.get(IObject.id, {
    success: function(object) {

     
      var flag = true;
      for (var i = 10; i > 0; i--) {
        flag = flag && object.get('f' + ('0' + i).slice(-2));

      }
      if (flag) {
        var t1 = document.getElementById('text01').value;
        var t2 = document.getElementById('text02').value;
        var t3 = document.getElementById('text03').value;
        var t4 = document.getElementById('text04').value;
        IObject.save({
          text01: t1,
          text02: t2,
          text03: t3,
          text04: t4
        }).then(function(object) {
          document.getElementById('uploading').style.display = 'none';
          alert("上傳完成");
          window.location = 'm-set.html?id=' + object.id;
        });
      } else {
        document.getElementById('uploading').style.display = 'none';
        alert("圖片尚未全部更換");
      }
    },
    error: function(object, error) {
      //
    }
  });
}
