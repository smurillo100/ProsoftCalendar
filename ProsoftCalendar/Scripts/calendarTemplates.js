var calendarTemplates = {
    monthCalendar: '<div class="monthCalendar">' +
                '<table>' +
                    '<tr class="dayLabelRow">' +
                        '<td>S</td>' +
                        '<td>M</td>' +
                        '<td>T</td>' +
                        '<td>W</td>' +
                        '<td>T</td>' +
                        '<td>F</td>' +
                        '<td>S</td>' +
                    '</tr>' +
                    '<tr class="monthLabelRow">' +
                        '<td colspan="7">{{monthLabel}}</td>' +
                    '</tr>' +
                    '{{{rows}}}' +
                '</table>' +
            '</div>',
    datesRow: '<tr class="datesRow">{{{columns}}}</tr>',
    dateCell: '<td class="{{cellClass}}">{{{dateNumber}}}</td>'
};