 var minPage = 1;
 var maxPage = 5;
 
 function paginator(config, reload) {
 
     if(reload){
         minPage = 1;
         maxPage = 5;
     }
 
     // throw errors if insufficient parameters were given
     if (typeof config != "object")
         throw "Paginator was expecting a config object!";
     if (typeof config.get_rows != "function" && !(config.table instanceof Element))
         throw "Paginator was expecting a table or get_row function!";
 
     // get/set if things are disabled
     if (typeof config.disable == "undefined") {
         config.disable = false;
     }
 
     // get/make an element for storing the page numbers in
     var box;
     if (!(config.box instanceof Element)) {
         config.box = document.createElement("div");
     }
     box = config.box;
 
     // get/make function for getting table's rows
     if (typeof config.get_rows != "function") {
         config.get_rows = function () {
             var table = config.table
             var tbody = table.getElementsByTagName("tbody")[0]||table;
 
             // get all the possible rows for paging
             // exclude any rows that are just headers or empty
             children = tbody.children;
             var trs = [];
             for (var i=0;i<children.length;i++) {
                 if (children[i].nodeType = "tr") {
                     if (children[i].getElementsByTagName("td").length > 0) {
                         trs.push(children[i]);
                     }
                 }
             }
 
             return trs;
         }
     }
     var get_rows = config.get_rows;
     var trs = get_rows();
 
     // get/set rows per page
     if (typeof config.rows_per_page == "undefined") {
         var selects = box.getElementsByTagName("select");
         if (typeof selects != "undefined" && (selects.length > 0 && typeof selects[0].selectedIndex != "undefined")) {
             config.rows_per_page = selects[0].options[selects[0].selectedIndex].value;
         } else {
             config.rows_per_page = 30;
         }
     }
     var rows_per_page = config.rows_per_page;
 
     // get/set current page
     if (typeof config.page == "undefined") {
         config.page = 1;
     }
     var page = config.page;
 
     // get page count
     var pages = (rows_per_page > 0)? Math.ceil(trs.length / rows_per_page):1;
 
     // check that page and page count are sensible values
     if (pages < 1) {
         pages = 1;
     }
     if (page > pages) {
         page = pages;
     }
     if (page < 1) {
         page = 1;
     }
     config.page = page;
 
     // hide rows not on current page and show the rows that are
     for (var i=0;i<trs.length;i++) {
         if (typeof trs[i]["data-display"] == "undefined") {
             trs[i]["data-display"] = trs[i].style.display||"";
         }
         if (rows_per_page > 0) {
             if (i < page*rows_per_page && i >= (page-1)*rows_per_page) {
                 trs[i].style.display = trs[i]["data-display"];
             } else {
                 // Only hide if pagination is not disabled
                 if (!config.disable) {
                     trs[i].style.display = "none";
                 } else {
                     trs[i].style.display = trs[i]["data-display"];
                 }
             }
         } else {
             trs[i].style.display = trs[i]["data-display"];
         }
     }
 
     // page button maker functions
     config.active_class = config.active_class||"active";
     if (typeof config.box_mode != "function" && config.box_mode != "list" && config.box_mode != "buttons") {
         config.box_mode = "button";
     }
     if (typeof config.box_mode == "function") {
         config.box_mode(config);
     } else {
         var make_button;
         if (config.box_mode == "list") {
             make_button = function (symbol, index, config, disabled, active) {
                 var li = document.createElement("li");
                 var a  = document.createElement("a");
                 a.href = "#";
                 a.innerHTML = symbol;
                 a.addEventListener("click", function (event) {
                     event.preventDefault();
                     this.parentNode.click();
                     return false;
                 }, false);
                 li.appendChild(a);
 
                 var classes = [];
                 if (disabled) {
                     classes.push("disabled");
                 }
                 if (active) {
                     classes.push(config.active_class);
                 }
                 li.className = classes.join(" ");
                 li.addEventListener("click", function () {
                     if (this.className.split(" ").indexOf("disabled") == -1) {
                         config.page = index;
                         paginator(config, false);
                     }
                 }, false);
                 return li;
             }
         } else {
             make_button = function (symbol, index, config, disabled, active) {
                 var button = document.createElement("button");
                 button.innerHTML = symbol;
                 button.addEventListener("click", function (event) {
                     event.preventDefault();
                     if (this.disabled != true) {
                         config.page = index;
                         paginator(config, false);
                     }
                     return false;
                 }, false);
                 if (disabled) {
                     button.disabled = true;
                 }
                 if (active) {
                     button.className = config.active_class;
                 }
                 return button;
             }
         }
 
         // make page button collection
         var page_box = document.createElement(config.box_mode == "list"?"ul":"div");
         if (config.box_mode == "list") {
             page_box.className = "pagination";
         }
 
         var left = make_button("&laquo;", (page>1?page-1:1), config, (page == 1), false);
         page_box.appendChild(left);
 
         if(config.page > maxPage){
             maxPage++;
             minPage = maxPage-4;
         }
 
         if(config.page < minPage){
             minPage--;
             maxPage = minPage + 4;
         }
 
         if(pages < 5){
             maxPage = pages;
         }
 
         for (var i=minPage;i<=maxPage;i++) {
             var li = make_button(i, i, config, false, (page == i));
             page_box.appendChild(li);
         }
 
         var right = make_button("&raquo;", (pages>page?page+1:page), config, (page == pages), false);
         page_box.appendChild(right);
         if (box.childNodes.length) {
             while (box.childNodes.length > 1) {
                 box.removeChild(box.childNodes[0]);
             }
             box.replaceChild(page_box, box.childNodes[0]);
         } else {
             box.appendChild(page_box);
         }
     }
 
     // status message
     var stat = document.createElement("span");
     stat.innerHTML = "<br /><br /><strong>Página:</strong> " + page + "/" + pages
         + " | <strong>Registros:</strong> " + (((page-1)*rows_per_page)+1)
         + " a " + (trs.length<page*rows_per_page||rows_per_page==0?trs.length:page*rows_per_page)
         + " | <strong>Total:</strong> " + trs.length;
     box.appendChild(stat);
 
     // hide pagination if disabled
     if (config.disable) {
         if (typeof box["data-display"] == "undefined") {
             box["data-display"] = box.style.display||"";
         }
         box.style.display = "none";
     } else {
         if (box.style.display == "none") {
             box.style.display = box["data-display"]||"";
         }
     }
 
     // run tail function
     if (typeof config.tail_call == "function") {
         config.tail_call(config);
     }
 
     return box;
 }