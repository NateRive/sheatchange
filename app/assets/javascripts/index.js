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
        }, 3000);
      } else if ($(".empty").length > 1) {
        //空いている席が２つ以上の場合の処理
        var restTimes = []
        console.log($(".empty"));

        $(".empty").each(function(index, element) {
          if ($(element).parent().prev().length == 1) {
            var prevNumber = $(element).parent().prev().find(".row__part__box--amount").text();
            var tableId = $(element).parent().prev().data("id");
            restTimes.push({ restTime: Number(prevNumber), emptySeat: Number(tableId) + 1 });
          }
          if ($(element).parent().next().length == 1) {
            var nextNumber = $(element).parent().next().find(".row__part__box--amount").text();
            var tableId = $(element).parent().next().data("id");
            restTimes.push({ restTime: Number(nextNumber), emptySeat: Number(tableId) - 1 });
          }
          });
          console.log(restTimes);
          var max = restTimes[0].emptySeat;
          for (var i = 0; i < restTimes.length - 1; i++) {
            if (restTimes[i].restTime < restTimes[i+1].restTime) {
              max = restTimes[i+1].emptySeat;
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
