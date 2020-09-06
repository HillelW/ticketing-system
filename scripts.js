    /**
     * loads initial data into the html table 
     */
    function populateTable() {
        let initialData = {
          'SYS-0030': { 'priority': 'Low', 'message': '2 Days Overdue' },
          'ASYS-0032': { 'priority': 'High', 'message': '8 Days Overdue' },
          'ZSYS-1022': { 'priority': 'Neutral', 'message': '0 Days Overdue' },
        };
  
        let tbody = document.getElementById('tbody');
        tbodyHtml = ``;
  
        for (let ticket in initialData) {
          tbodyHtml += `
                        <tr class="item">
                          <td>
                            ${ticket}
                          </td>
                          <td class="table-success">
                            <span class="font-weight-bold priority">${initialData[ticket]['priority']}</span>
                            <br>
                            <span class="message">${initialData[ticket]['message']}</span>
                          </td>
                        </tr>
                        `
        }
  
        tbody.innerHTML = tbodyHtml;
  
        tds = document.getElementsByClassName('priority');
        colorRows(tds);
        sort('ticket')
        sort('ticket')
      }
  
      /**
       * helper funciton for above populateTable() function.
       * given a list of tds, colors the parent of each td an 
       * appropriate color
       */
      function colorRows(tds) {
        for (let td of tds) {
          if (td.innerHTML === 'Low') {
            td.parentElement.className += ' ' + 'low';
          }
          else if (td.innerHTML === 'High') {
            td.parentElement.className += ' ' + 'high';
  
          }
          else if (td.innerHTML === 'Neutral') {
            td.parentElement.className += ' ' + 'neutral';
          }
        }
      }
  
      populateTable()
  
      /**
       * event handler to load additional data into the html table on button click
       */
      function loadMore() {
        // if data has already been loaded once, then display an error message
        const table_length = document.getElementById("table").rows.length;
  
        if (table_length > 6) {
          document.getElementById('error').innerHTML = 'There Is No More Data To Display!'
          return
        }
  
        let subsequent_data = {
          'SYS-1234': { 'priority': 'Low', 'message': '2 Days Overdue' },
          'SYS-2030': { 'priority': 'Low', 'message': '4 Days Overdue' },
          'SYS-8900': { 'priority': 'High', 'message': '10 Days Overdue' },
        };
  
        let tbody = document.getElementById('tbody');
        additional_html = ''
        for (let ticket in subsequent_data) {
          additional_html += `
                        <tr class="item">
                          <td>
                            ${ticket}
                          </td>
                          <td class="table-success">
                            <span class="font-weight-bold priority">${subsequent_data[ticket]['priority']}</span>
                            <br>
                            <span class="message">${subsequent_data[ticket]['message']}</span>
                          </td>
                        </tr>
                        `
        };
  
        tbody.innerHTML += additional_html;
  
        tds = document.getElementsByClassName('priority');
        colorRows(tds);
  
        // check which column has the current symbol and sort on that column
        const selected = getSelected()
        if (selected === 'ticket') {
          sort('ticket')
          sort('ticket')
        }
        else {
          // modfiy priority column dependind upon whether
          // it is currently sorted in ascending or descending order
          if (document.getElementById('priority').innerHTML.includes('^')) {
            sort('priority')
          }
          else {
            sort('priority')
            sort('priority')
          }
        }
      }
  
      /**
       * adapted from https://www.w3schools.com/lib/w3.js
       * to sort by ticket number or priority
       */
      function sortHTML(id, sel, sortvalue, column) {
        const priorityOrder = ['low', 'neutral', 'high']
        let a, b, i, ii, y, bytt, v1, v2, cc, j;
        a = getElements(id);
        for (i = 0; i < a.length; i++) {
          for (j = 0; j < 2; j++) {
            cc = 0;
            y = 1;
            while (y == 1) {
              y = 0;
              b = a[i].querySelectorAll(sel);
              for (ii = 0; ii < (b.length - 1); ii++) {
                bytt = 0;
  
                if (sortvalue) {
                  v1 = column === 'priority' ? b[ii].querySelector(sortvalue).innerText : b[ii].querySelector(sortvalue).innerText.split('-')[1].trim();
                  v2 = column === 'priority' ? b[ii + 1].querySelector(sortvalue).innerText : b[ii + 1].querySelector(sortvalue).innerText.split('-')[1].trim();
                }
  
                else {
                  v1 = 'priority' ? b[ii].innerText : b[ii].innerText.split('-')[1].trim();
                  v2 = 'priority' ? b[ii + 1].innerText : b[ii + 1].innerText.split('-')[1].trim();
                }
  
                v1 = column === 'priority' ? v1.toLowerCase().split("\n")[0] : v1.toLowerCase();
                v2 = column === 'priority' ? v2.toLowerCase().split("\n")[0] : v2.toLowerCase();
  
                if (column === 'priority' && ((j == 0 && (priorityOrder.indexOf(v1) > priorityOrder.indexOf(v2))) || (j == 1 && (priorityOrder.indexOf(v1) < priorityOrder.indexOf(v2))))) {
                  bytt = 1;
                  break;
                }
  
                else if (column != 'priority' && ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2)))) {
                  bytt = 1;
                  break;
                }
              }
  
              if (bytt == 1) {
                b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
                y = 1;
                cc++;
              }
            }
            if (cc > 0) { break; }
          }
        }
      }
  
      /**
       * see https://www.w3schools.com/lib/w3.js
       */
      function getElements(id) {
        if (typeof id == "object") {
          return [id];
        } else {
          return document.querySelectorAll(id);
        }
      }
  
      /**
       * given a table column, 
       * sorts the table rows by that column
       */
      function sort(column) {
        if (column === 'ticket') {
          // remove mode indication from other column
          document.getElementById('priority').innerHTML = 'Priority';
  
          const mode = document.getElementById('ticket').innerHTML.slice(-1);
          document.getElementById('ticket').innerHTML = mode === '^' ? 'Ticket Number v' : 'Ticket Number ^';
          sortHTML('#table', '.item', 'td:nth-child(1)', 'ticket');
        }
        else if (column === 'priority') {
          // remove mode indication from other column
          document.getElementById('ticket').innerHTML = 'Ticket Number';
  
          const mode = document.getElementById('priority').innerHTML.slice(-1);
          document.getElementById('priority').innerHTML = mode === '^' ? 'Priority v' : 'Priority ^';
          sortHTML('#table', '.item', 'td:nth-child(2)', 'priority');
        }
      }
  
      /**
      * if the table is currently sorted 
      * on the ticket number column, returns 'ticket'. 
      * Otherwise, returns 'priority'
      */
      function getSelected() {
        const ticket = document.getElementById('ticket').innerHTML;
        if (ticket.includes('^') || ticket.includes('v')) {
          return 'ticket';
        }
        else {
          return 'priority';
        }
      }