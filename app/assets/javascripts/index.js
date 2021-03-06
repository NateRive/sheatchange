$(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    var count = $("[name=number]").val();
    var html = `<p class="waited-person">${count}</p>`
    $(".waited-info").append(html);
    if ($(".waited-person")) {
      if ($(".waited-person:first").text() == 1) {
        //待ちの先頭が１人だった場合の処理
        if ($(".empty").length == 1) {
          //空いている席が１つの場合の処理
        $(".empty").children().text(10);
        var tmp2 = $(".empty").children();
        $(".empty").addClass("filled").removeClass("empty");
        $(".waited-person:first").remove();
        var id = setInterval(function() {
          restAmount = $(tmp2).text();
          $(tmp2).text(restAmount - 1)
          if (restAmount == 1) {
            clearInterval(id);
            $(tmp2).parent().addClass("empty").removeClass("filled");
          }
        }, 1000);
      } else if ($(".empty").length > 1) {
        //空いている席が２つ以上の場合の処理
        var restTimes = []

        $(".empty").each(function(index, element) {
          var ifPrev = $(element).parent().prev();
          var ifNext = $(element).parent().next();
          if (ifPrev.length == 1 && ifNext.length == 1) {
            var prevNumber = $(ifPrev).find(".row__part__box--amount").text();
            var nextNumber = $(ifNext).find(".row__part__box--amount").text();
            var tableId = $(element).parent().data("id");
            restTimes.push({ restTime: [ Number(prevNumber), Number(nextNumber) ].sort(function(a,b) {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            }), emptySeat: Number(tableId) });
          } else if (ifPrev.length == 1 || $(ifNext).length == 1) {
            if (ifPrev.length == 1) {
              var prevNumber = $(ifPrev).find(".row__part__box--amount").text();
              var tableId = $(element).parent().data("id");
              restTimes.push({ restTime: [ Number(prevNumber), 10 ], emptySeat: Number(tableId) });
            } else if (ifNext.length == 1) {
              var nextNumber = $(ifNext).find(".row__part__box--amount").text();
              var tableId = $(element).parent().data("id");
              restTimes.push({ restTime: [ Number(nextNumber), 10 ], emptySeat: Number(tableId) });
            }
          }
          });
          var max = restTimes[0].emptySeat;
          var toCompared = restTimes[0].restTime
          for (var i = 0; i < restTimes.length - 1; i++) {
            function whichIsBig(a,b) {
              if (a[0] < b[0]) {
                return true;
              } else if (a[0] > b[0]) {
                return false;
                //１つ目の引数の配列の最小値が２つ目の引数の最小値よりも小さければ、座る席の候補を後者に譲る
              } else if (a[0] == b[0]) {
                if (a[1] < b[1]) {
                  return true;
                } else if (a[1] >= b[1]) {
                  return false;
                }//最小値で決着がつかなければ、最大値を比べ、大きい方を隣席としてもつ席を、座る候補とする。
              }
            }
            if (whichIsBig(toCompared, restTimes[i+1].restTime)) {
              max = restTimes[i+1].emptySeat;
              toCompared = restTimes[i+1].restTime
              //Trueが返り値ならば、座る席の候補を変え、その席を新たな比較基準とする。
            }
          }
          var answer = $(`[data-id=${max}]`).find(".row__part__box");
          $(answer).addClass("filled").removeClass("empty");
          $(".waited-person:first").remove();
          $(answer).children().text(10);
          var id = setInterval(function() {
            var tmp = $(answer).children().text();
            $(answer).children().text(tmp - 1);
            if (tmp == 1) {
              clearInterval(id);
              $(answer).addClass("empty").removeClass("filled");
            }
          }, 1000);
        // 空席の両隣の頃時間を全て計算し、一番長い席を隣にもつ空席に一人を通す
      }
      }
    }
  });
});
