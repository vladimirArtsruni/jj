function sortByHeader(sortHeader, sortDirection, previousSortKeys) {
    //console.log(sortHeader, sortDirection, previousSortKeys);
    console.log('111222');

    if (sortHeader == '') {
        return false;
    }

    var formElement = $('searchForm');
    formElement.searchOperation.value = 'Sort';
    formElement.sortKeys.value = sortHeader;

    if (typeof sortDirection != 'undefined') {
        formElement.sortIndicator.value = sortDirection ? 'REVERSE' : 'FORWARD';
    } else {
        formElement.sortIndicator.value = 'FORWARD'; //default
    }

    if (previousSortKeys) {
        formElement.previousSortKeys.value = previousSortKeys;
    }

    formElement.newSort.value = true;

    addFormElement( formElement, 'searchResultsOffset', '0' );

    doSort(sortHeader);
}

function doSort(srpSortKeys) {
    var formElement = $('searchForm');

    addFormElement( formElement, 'srpSortKeys', srpSortKeys );

    formElement.target = ""; // reset to clear modal window target
    formElement.submit();
}
function addFormElement( formElement, name, value ) {
    if ( formElement != null && name != null && value != null ) {
        formElement.appendChild(new Element('input', { 'type': 'hidden', 'name': name, 'value' : value }));
    }
}

function doPage(offset) {
    var formElement = $('searchForm');

    addFormElement( formElement, 'searchResultsOffset', offset );

    formElement.target = ""; // reset to clear modal window target
    document.searchForm.submit();
}

function validateGoToPage(pageNumElementId, lastPage, perPage, currentPage, wtSvl) {
    var pageNum = parseInt($(pageNumElementId).value);
    if (isNaN(pageNum) || pageNum <= 0 || pageNum > lastPage) {
        $(pageNumElementId).value = currentPage;
        return false;
    }
    console.log(pageNum);
    goToPage(pageNum, lastPage, perPage, wtSvl);
}

function goToPage(pageNum, lastPage, perPage, wtSvl) {
    var offset = perPage * (pageNum - 1);
    var formElement = $('searchForm');
    formElement.searchOperation.value = 'Paging';
    formElement.recordOffset.value = offset;
    formElement.newSort.value = false;

    addFormElement( formElement, 'srpSortKeys', '' );
    addFormElement( formElement, 'wbSortKeys', '' );
    addFormElement( formElement, 'wbResultsPerPage', '25' );
    addFormElement( formElement, 'srpResultsPerPage', '25' );

    addFormElement(formElement, 'wtTracker', '(wtSearchType,PowerSearch Advanced)(wtRefLinkPrefix,ps_srchfm_)(wtSavedSearchRefLink,)(wtSavedSearchTypeLink,)');

    addFormElement( formElement, 'searchResultsOffset', offset );

    formElement.action = document.location.pathname+'?mode=sort';
    if ('basicSearchResults' == 'searchResults') {
        formElement.action = document.location.pathname+'?mode=sort';
    }
    //formElement.target = ""; // reset to clear modal window target
    //console.log(document.location.pathname);
    //console.log(document.location.search);
    $('searchForm').submit();
}

(function($){
    $(document).ready(function(){
        $('.span9-24').css({
            width:400
        });
        $('.span6-24').removeClass('mui-bdr-r-dotted');
        function submit(action, method, values) {
            console.log('here2')
            var form = $('<form/>', {
                action: action,
                method: method
            });
            $.each(values, function(name,value) {
                form.append($('<input/>', {
                    type: 'hidden',
                    name: name,
                    value: value
                }));
            });
            form.appendTo('body').submit();
        }
        $('.exPrice').on('click',function(e){
            e.preventDefault();
        })
    });
})(jQuery);
