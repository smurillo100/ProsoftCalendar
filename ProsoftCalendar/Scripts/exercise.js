$(function () {
    // Initializing the form
    $("#txtStartDate").datepicker();
    $("#txtStartDate").datepicker('setDate', new Date());
    $(".submitButton")
      .button()
      .click(function (event) {
          event.preventDefault();
          $('.calendarsSection').html('');
          var startDate = new Date($("#txtStartDate").val());
          var numberDays = parseInt($("#txtNumberDays").val());
          renderCalendars(startDate, numberDays);
      });
    $("#txtNumberDays").val(1);
    $("#txtNumberDays").spinner({ min: 1 });

    // Methods that generate the calendars
    var monthCalendarTemplate = Handlebars.compile(calendarTemplates.monthCalendar);
    var datesRowTemplate = Handlebars.compile(calendarTemplates.datesRow);
    var dateCellTemplate = Handlebars.compile(calendarTemplates.dateCell);

    var getMonthLabel = function(startDate) {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[startDate.getMonth()] + ' ' + startDate.getFullYear();
    };

    var getDatesRows = function (startDate, endDate) {
        var lastDate = new Date(endDate);
        lastDate.setDate(lastDate.getDate() + 1);
        if (endDate.getFullYear() > startDate.getFullYear() || endDate.getMonth() > startDate.getMonth())
        {
            lastDate = new Date(startDate);
            lastDate.setMonth(lastDate.getMonth() + 1);
            lastDate.setDate(1);
        }
        if (lastDate.getDay() > 0) {
            lastDate.setDate(lastDate.getDate() + 7 - lastDate.getDay());
        }
        var iterationDate = new Date(startDate);
        iterationDate.setDate(iterationDate.getDate() - iterationDate.getDay());
        var rows = '';
        var cells = '';
        while (iterationDate.getTime() < lastDate.getTime()) {
            var validityClass = 'inactive';
            var dateNumber = '&nbsp;';
            if (iterationDate.getTime() >= startDate.getTime() && iterationDate.getTime() <= endDate.getTime() &&
                iterationDate.getFullYear() == startDate.getFullYear() && iterationDate.getMonth() == startDate.getMonth()) {
                validityClass = 'active';
                dateNumber = iterationDate.getDate().toString();
            }
            cells += dateCellTemplate({ cellClass: validityClass, dateNumber: dateNumber });
            if (iterationDate.getDay() == 6) {
                rows += datesRowTemplate({ columns: cells });
                cells = '';
            }
            iterationDate.setDate(iterationDate.getDate() + 1);
        }
        return rows;
    };

    var renderCalendars = function (startDate, numberDays) {
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + numberDays - 1);
        var rowsRender = getDatesRows(startDate, endDate);
        var monthCalendar = monthCalendarTemplate({ monthLabel: getMonthLabel(startDate), rows: rowsRender });
        $('.calendarsSection').append(monthCalendar);

        if (endDate.getFullYear() > startDate.getFullYear() || endDate.getMonth() > startDate.getMonth()) {
            var nextMonth = new Date(startDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(1);
            var lastDayMonth = new Date(nextMonth);
            lastDayMonth.setDate(0);
            var remainingDays = numberDays - (lastDayMonth.getDate() - startDate.getDate() + 1);
            renderCalendars(nextMonth, remainingDays);
        }
    };
});