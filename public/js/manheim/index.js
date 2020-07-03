var defaultSaleDateText = '';
	var defaultKeywordSearchText = '';
	var allLabel = 'Ð’ÑÐµ';
	var ManheimDir = '/';

    // set language for popup calendar
    var languageCode = 'ru';

    // calendar config
    var pathToImages = ManheimDir + 'images/calendar/';



	function vehicleTypeChanged( elementValue, toggleAdvanced ) {
        reloadMakes(elementValue, null);

        if ( $('makeList') != null ) {
            reloadAllModels(getAllSelections('makeList'), null, '');

            if ( $('modelList') != null ) {
                reloadAllTrims(getAllSelections('makeList'), getAllSelections('modelList'), null, '');
            }
        }
    }

    function reloadMakes( vehicleTypes, defaults ) {

            var ajaxUrlParams = 'mode=makes&type=' + vehicleTypes;
            var preSelectedMakes = concatArrays( defaults, getAllSelections('makeList') );
            new Ajax.Request('/en/manheim/makes_models',
            {
                method: 'get',
                evalJSON: true,
                parameters: ajaxUrlParams,
                onSuccess: function(transport) {

                    updateMakeList( transport.responseJSON.makes, preSelectedMakes );
                },
                onFailure: function(){
                    console.log('fail load makes')
                },
                onException: function(request, ex){

                }
            });
    }

    function concatArrays( array1, array2 ) {
        if ( array1 != null ){
            if (array2 != null){
                for ( var i = 0; i < array2.length; i++ ) {
                    array1[array1.length] = array2[i];
                }
            }
            return array1;
        } else if ( array2 != null ) {
            return array2;
        }

         return new Array();
    }

    var executeModelAjax = true;
    function reloadAllModels( makes, defaults, inventory ) {
        if ( executeModelAjax ) {
            if ( makes.length == 0 || makes[0] == 'ALL' ) {
                createModelElement(clearedModelList(), allLabel, 'ALL', true);
                reloadAllTrims( makes, {}, {}, inventory );
            } else {
                var ajaxUrlParams = 'mode=models&inventory=' + inventory;
                for (var i = 0; i < makes.length; i++) {
                    ajaxUrlParams += '&make=' + makes[i];
                }
                var preSelectedModels = concatArrays( defaults, getAllSelections('modelList') );
                new Ajax.Request('/en/manheim/makes_models',
                {
                    method: 'get',
                    evalJSON: true,
                    parameters: ajaxUrlParams,
                    onSuccess: function(transport) {
                    	showModels( transport.responseJSON.models, preSelectedModels );
                    },
                    onFailure: function(){},
                    onException: function(request, ex){}
                });
            }
        }
    }

    function showModels( models, preSelectedModels ) {
    	if (getAllSelections('makeList').length > 0) {
	    	var modelList = clearedModelList()
            jQuery('#modelList').empty();
             console.log('111')
            _.each(models,function(model){
                var option=document.createElement('option');
                option.value=model.value;
                option.text=model.label;
                jQuery('#modelList').append(option);
                //console.log(option);
            });
            jQuery('#modelList').trigger('refresh');
	        //setAllChecked('modelList', true, preSelectedModels, false);
	        var trimDefaults = null;
	        reloadAllTrims(getAllSelections('makeList'), getAllSelections('modelList'), trimDefaults, '');
    	}
    }

    function clearedModelList(){
    	var modelList = $('modelList');
        modelList.update('');
        return modelList;
    }

    function createModelElement(modelList, label, value, selected){
      	  modelElement = createModelCheck(label, value, selected);
          modelList.appendChild(modelElement);
    }

    function createModelCheck( label, value, disabled ) {
        var itemElement = document.createElement('li');
        var labelElement = document.createElement('label');
        var checkbox = document.createElement('option');
        checkbox.id = value;

        checkbox.name = 'model';
        checkbox.className = 'checkbox';
        checkbox.value = value;
        checkbox.disabled = disabled;

        checkbox.onclick = function() {
            if ( this.value == 'ALL' ) {
                executeTrimAjax=false;
            }
            toggleAllCheckbox(this, 'modelList');
            if ( this.value == 'ALL' ) {
                executeTrimAjax=true;
            }
            reloadAllTrims(getAllSelections('makeList'), getAllSelections('modelList'), null, '');
            //toggleModels(this);
        };



        return checkbox;
    }

    var executeTrimAjax = true;
    function reloadAllTrims( makes, models, defaults, inventory ) {
        if ( executeTrimAjax ) {
            if ( makes.length == 0 || makes[0] == 'ALL' || models.length == 0 || models[0] == 'ALL' ) {
                var trimList = $('trimList');
                //trimList.update('');
                //trimList.appendChild(createTrimCheck(allLabel, 'ALL', true));
            } else {
                var ajaxUrlParams = 'mode=trims&inventory=' + inventory;
                for (var i = 0; i < makes.length; i++) {
                    ajaxUrlParams += '&make=' + makes[i];
                }
                for (var i = 0; i < models.length; i++) {
                    ajaxUrlParams += '&model=' + models[i];
                }
                var preSelectedTrims = concatArrays( defaults, getAllSelections('trimList') );
                new Ajax.Request('/en/manheim/makes_models',
                {
                    method: 'get',
                    evalJSON: true,
                    parameters: ajaxUrlParams,
                    onSuccess: function(transport) {
                        showTrims( transport.responseJSON.trims, preSelectedTrims );
                    },
                    onFailure: function(){},
                    onException: function(request, ex){}
                });
            }
        }
    }

    function showTrims( trims, preSelectedTrims ) {

        jQuery('#trimList').empty();
        var option=document.createElement('option');
        option.value="ALL";
        option.text="ALL";
        jQuery('#trimList').append(option);
        _.each(trims,function(model){
            var option=document.createElement('option');
            option.value=model.value;
            option.text=model.label;
            jQuery('#trimList').append(option);

        });
        jQuery('#trimList').trigger('refresh');

        //setAllChecked('trimList', true, preSelectedTrims);
    }

    function createTrimCheck( label, value, disabled ) {
        var itemElement = document.createElement('li');
        var labelElement = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.id = value;
        checkbox.type = 'checkbox';
        checkbox.name = 'series';
        checkbox.className = 'checkbox';
        checkbox.value = value;
        checkbox.disabled = disabled;

        checkbox.onclick = function() {
            toggleAllCheckbox(this, 'trimList');
        };

        labelElement.appendChild(checkbox);
        labelElement.appendChild(document.createTextNode(unescape(label)));
        itemElement.appendChild(labelElement);

        return itemElement;
    }

	function advancedSearch() {
	    if ($('advanced')) {
	    	if ($('advanced').style.display == 'none') {
	    		$('advanced').style.display =  '';
	    	} else {
	    		$('advanced').style.display =  'none';
	    	}
	    }
	    return false;
	}

    function resetSearchForm( refreshAll ) {
    	$('searchResult').reset();

		// reset keyword search to default value
		var keywordTextElement = $('keywordTextSearch');
		if (keywordTextElement != null) {
			keywordTextElement.value = defaultKeywordSearchText;
        }

        if ( refreshAll ) {
            setOptions('vehicleType', 0);
            clearCheckedList( 'vehicleTypeList' );
            var allVehiclesType = $('vtA');
            if (allVehiclesType != null) {
                allVehiclesType.checked = true;
            }

            setOptions('year_begin', 0);
            setOptions('year_end', 0);

            reloadToYears($('year_end'));

            clearCheckedList( 'makeList' )
            clearCheckedList( 'modelList' );
            clearCheckedList( 'trimList' );

            // Location section
            clearCheckedList( 'regionList' );
            clearCheckedList( 'stateList' );
            clearCheckedList( 'locationList' );

            clearCheckedList( 'inventoryList' );
            clearCheckedList( 'saleTypeCheck' );
            clearCheckedList( 'salvageCheck' );

            setValue('saleDate', '');

            // clear advanced search options
            clearAdvancedOptions();
        }

        reloadMakes(getAllSelections('vehicleType'), null);
        reloadAllModels([], null, '');
        reloadAllTrims([], [], null, '');

        var saleDateElement = $('saleDate');
        if ( saleDateElement != null && saleDateElement.value == '' ) {
        	saleDateElement.value = defaultSaleDateText;
        }
        return false;
    }

    function clearAdvancedOptions() {
		clearCheckedList( 'onlyWithPhoto' );
		clearCheckedList( 'onlyWithECR' );
		clearCheckedList( 'sellerTypeList' );
		clearCheckedList( 'sellerList' );

    	clearUncommonOptions();
    }

    function clearUncommonOptions() {
    	clearCheckedList( 'conditionInfoList' );
		clearCheckedList( 'fromOdometer' );
		clearCheckedList( 'toOdometer' );
		clearCheckedList( 'conditionList' );
        clearCheckedList( 'mmrList' );
        clearCheckedList( 'driveTrainList' );
        clearCheckedList( 'transList' );
        clearCheckedList( 'engineList' );
        clearCheckedList( 'fuelTypeList' );
        clearCheckedList( 'extColorList' );
        clearCheckedList( 'intColorList' );
        clearCheckedList( 'topList' );
        clearCheckedList( 'intTypeList' );
        clearCheckedList( 'doorsList' );
        refreshToOdometerValues();
    }

    function refreshToOdometerValues() {
    	if ($('fromOdometer') != undefined) {
			$('fromOdometer').onchange();
		}
    }

    function clearCheckedList( elementId ) {
    	var isChecked = false;
    	var itemValue = null;
    	var executeClick = false;

    	return setChecks(elementId, isChecked, itemValue, executeClick)
    }

    function setValue(elementId, newValue) {
    	var element = $(elementId);
    	if ( element != null ) {
    		element.value = newValue;
    	}
    }

    function setOptions(elementId, optionIndex) {
        var container = $(elementId);
        if ( container != null && optionIndex >= 0 ) {
            if ( container.nodeName.toUpperCase() == 'SELECT' && container.options.length > optionIndex ) {
                container.options[optionIndex].selected = true;
            }

            var elements = container.getElementsByTagName('select');
            for (var i = 0; i < elements.length; i++) {
                if ( elements[i].options.length > optionIndex ) {
                    elements[i].options[optionIndex].selected = true;
                }
            }
        }
    }

    function reloadToYears( toYearElement ) {
        var fromYearElement = $('year_begin');
        var fromYear = fromYearElement.value;
        var floorYear = 1950;
        var allDesignator = fromYearElement.options[0].text;

        if ( fromYear == allDesignator ) {
            fromYear = floorYear;
        }
        var toYear = new Date().getFullYear() + 1;

        var options = new Array();

        if (fromYear > toYear) {
            options[options.length] = {'option' : fromYear, 'value' : fromYear};
        }
        if (fromYear < 1950) {
            floorYear = fromYear;
            fromYear = 1950;
        }

        // add ALL option back to toYear list so that it can be default selected
        // when form is reset for keyword search on basic search page
        options[options.length] = {'option' : allDesignator, 'value' : allDesignator};

        for ( var i = toYear; i >= fromYear; i-- ) {
            options[options.length] = {'option' : i, 'value' : i};
        }

        if (floorYear != 1950) {
            options[options.length] = {'option' : floorYear, 'value' : floorYear};
        }

        updateFormOptions('year_end', options);
    }

    function reloadToOdometerValues(noMaxLabel) {
        var fromOdometer = parseInt($('fromOdometer').value);
        var options = new Array();
        var fromOptions = $('fromOdometer').options;

        options[options.length] = {'option' : noMaxLabel, 'value' : 'ALL'};

        for (var i = 1; i < fromOptions.length; i++) {
        	if (parseInt(fromOptions[i].value) > fromOdometer) {
        	 options[options.length] = {'option' : fromOptions[i].text, 'value' : fromOptions[i].value};
            }
        }
        updateFormOptions('toOdometer', options);
    }

    function updateFormOptions( elementId, options ) {
        var optionElement = $(elementId);
        if ( optionElement != null ) {
            var preSelected = optionElement.options[optionElement.selectedIndex].value;
            optionElement.options.length = 0;
            for ( var i = 0; i < options.length; i++ ) {
                optionElement.options.add(new Element('option', { 'value' : options[i].value }));
                optionElement.options[i].update(options[i].option);
                if ( preSelected != null && preSelected == options[i].value ) {
                    optionElement.options[i].selected = true;
                }
            }
        }
    }

	// Finds all SELECT or INPUT tags within the specified element
    // and returns the values of all that are currently selected
    function getAllSelections(elementId) {
        var selectedValues = new Array();
        var container = $(elementId);
        
        if ( container != null ) {
            if ( container.nodeName.toUpperCase() == 'SELECT' ) {
                for (var i = 0; i < container.options.length; i++) {
                    if ( container.options[i].selected ) {
                        selectedValues[selectedValues.length] = container.options[i].value;
                    }
                }
            }

            if ( container.nodeName.toUpperCase() == 'INPUT' ) {
                if ( container.checked ) {
                    selectedValues[selectedValues.length] = container.value;
                }
            	    /*
            	    if ( container.length > 0 ) {
            	       for (var i = 0; i < container.length; i++) {
            	    	   	  if (container[i].checked) {
            	    	   		  selectedValues[selectedValues.length] = container[i].value;
            	    	   	  }
            	       }
            	    }
            	    */
            }

            var elements = container.getElementsByTagName('input');
            for (var i = 0; i < elements.length; i++) {
                if ( elements[i].checked ) {
                    selectedValues[selectedValues.length] = elements[i].value;
                }
            }
        }
        return selectedValues;
    }

    function updateMakeList( makes, preSelectedMakes ) {
        var makeListElement = $('makeList');
        console.log(makeListElement);
        if ( makeListElement != null ) {

            makeListElement.update('');
            var checkbox = new Element('option', {  'value' : ""});
            checkbox.innerHTML='ALL';
            makeListElement.appendChild(checkbox);
            for ( var i = 0; i < makes.length; i++ ) {

                makeListElement.appendChild(createMakeCheck(makes[i].label, makes[i].value));
            }


            jQuery('#makeList').trigger('refresh');


            //setAllChecked('makeList', true, preSelectedMakes, false);

            reloadAllModels(getAllSelections('makeList'), '', '')
        }
    }

    function createMakeCheck( label, value ) {



        var checkbox = new Element('option', {  'value' : value});
        checkbox.innerHTML=label;
        checkbox.onclick = function() {
            toggleAllCheckbox(this, 'makeList');
            reloadAllModels(getAllSelections('makeList'), null, '');
        };
        return checkbox;
    }

    function toggleAllCheckbox( checkbox, containerId ) {
        if ( checkbox.value == 'ALL' ) {
            // check or uncheck all checkboxes
            resetCheckedList(containerId, checkbox.checked )
        } else if ( !checkbox.checked ) {
            // uncheck 'ALL' option if checked
            clearCheckedItem(containerId, 'ALL');
        }

        return false;
    }

    function setAllChecked(elementId, isChecked, itemValues, executeClick) {
        if ( itemValues != null ) {
            for (var i = 0; i < itemValues.length; i++) {
                setChecks(elementId, isChecked, itemValues[i], executeClick)
            }
        }
    }

    function resetCheckedList( elementId, isChecked ) {
    	var itemValue = null;
    	var executeClick = true;

    	return setChecks(elementId, isChecked, itemValue, executeClick)
    }

    function clearCheckedItem( elementId, itemValue ) {
    	var isChecked = false;
    	var executeClick = false;

    	return setChecks(elementId, isChecked, itemValue, executeClick)
    }

    // Finds a SELECT or INPUT tag with the specified value
    // and makes sure it is selected or unselected depending
    // on the isChecked parameter
    function setChecks(elementId, isChecked, itemValue, executeClick) {
        var container = $(elementId);
        if ( container != null ) {
            if ( container.nodeName.toUpperCase() == 'SELECT' ) {
                if ( isChecked && itemValue != null ) {
                    for (var i = 0; i < container.options.length; i++) {
                        if ( container.options[i].value == itemValue ) {
                            container.options[i].selected = isChecked;
                        }
                    }
                } else {
                    container.options[0].selected = true;
                }
            }

            if ( container.nodeName.toUpperCase() == 'INPUT' ) {
                if ( (container.checked != isChecked && container.value == itemValue) ||
                     (container.checked != isChecked && itemValue == null) ) {
                    if ( executeClick == true ) {
                        container.click();
                    } else {
                        container.checked = isChecked;
                    }
                }
            }

            var elements = container.getElementsByTagName('input');
            for (var i = 0; i < elements.length; i++) {
                if ( (elements[i].checked != isChecked && elements[i].value == itemValue) ||
                     (elements[i].checked != isChecked && itemValue == null) ) {
                    if ( executeClick == true ) {
                        elements[i].click();
                    } else {
                        elements[i].checked = isChecked;
                    }
                }
            }
        }
    }

    // ##################################################
    // Begin BY LOCATION functions
    // ##################################################
    function getParentLocation( childCheckbox ) {
    	var parentId;
    	if (childCheckbox != null) {
        	var classes = childCheckbox.className.split(' ');
        	for (var i = 0; i < classes.length; i++) {
        		if (/^child-of-/.test(classes[i])) {
        			parentId = classes[i].substring('child-of-'.length, classes[i].length);
        			break;
        		}
        	}
    	}
    	return parentId == null ? null : document.getElementById(parentId);
    }

    function getChildLocations( parentCheckbox ) {
    	if (parentCheckbox == null) {
    		return [];
    	} else {
    		var childClass = 'child-of-' + parentCheckbox.id;
        	return jQuery('.' + childClass).get();
    	}
    }

    function toggleChildLocations( parentCheckbox ) {
        var children = getChildLocations( parentCheckbox );

        if ( children != null ) {
            for (var i = 0; i < children.length; i++) {
                if (  parentCheckbox.checked != children[i].checked ) {
                    children[i].click();
                }
            }
        }

        return false;
    }

    function toggleParentLocation( childCheckbox ) {
        var parentCheckbox = getParentLocation(childCheckbox);

        if ( !childCheckbox.checked ) {
            while ( parentCheckbox != null ) {
                parentCheckbox.checked = false;
                parentCheckbox = getParentLocation( parentCheckbox );
            }
         } else {
            // if all parent's children are checked, check parent
            var children = getChildLocations(parentCheckbox);
            if ( children != null ) {
                var allChildrenChecked = true;
                for (var i = 0; i < children.length; i++) {
                    if ( children[i] != null && !children[i].checked ) {
                        allChildrenChecked = false;
                        break;
                    }
                }

                if ( allChildrenChecked ) {
                    if ( parentCheckbox != null && !parentCheckbox.checked ) {
                        parentCheckbox.click();
                    }
                }
            }
        }
    }

    function toggleLocations( checkbox ) {
        toggleChildLocations(checkbox);
        toggleParentLocation(checkbox);
    }
    function keywordPressed(event) {
        event = !event ? window.event : event;
        var code = event.keyCode ? event.keyCode : (event.which ? event.which : 0);
        return (code == 13) ? submitKeywordSearch(true, '(wtSearchType,)(wtRefLinkPrefix,ps_srchfm_)(wtSavedSearchRefLink,)(wtSavedSearchTypeLink,)') : true;
    }  
   /* $('keywordTextSearchDetail').removeClassName('on');
    $('searchForm').searchTerms[1].value = defaultKeywordSearchText;*/


    (function($){
        $('#makeList').on('change',function(){
            console.log(this.value);
            reloadAllModels([this.value],null,'');
        });
        $('#modelList').on('change',function(){
            console.log($('#makeList').val());
            reloadAllTrims([$('#makeList').val()],[this.value],null,'');
        });


        $('#topList').find('label').each(function(index,model){
            var option=document.createElement('option');
            option.value=$(model).find('input').val();
            option.text=$(model).text();
            jQuery('#topList2').append(option);
        });
        jQuery('#topList2').trigger('refresh');

        $('input[name="saleDate"]').datepicker({
            dateFormat:'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        });

        $('#resetSearch').on('click',function(e){
            e.preventDefault();
            $('select').each(function(index,item){
                $(item).prop('selectedIndex',0);
                $(item).trigger('refresh');
            });
            $('input[type="text"]').each(function(index,item){
                $(item).val('');
                $(item).trigger('refresh');
            })
            $('input[type="checkbox"]').each(function(index,item){
                $(item).prop('checked',false);
                $(item).trigger('refresh');
            })
        });

    })(jQuery);