jQuery(document).ready(function( $ ) {

    /* --- General --- */
    // Set Active tab based on URL
	var url = window.location.href;
	var urlQueryParams = url.substr(url.lastIndexOf('/') + 1);
    
    /* Hide Tabs */
    $(".tab").addClass('hidden');
    // Hide Nav Items
    $("nav button").removeClass('active');
	
    if (url === "https://members.employerengagement.ca/dashboard/")  {
	   	/* Set active tab & nav item */
		$("#dashboard").removeClass('hidden');
        $("nav button.dashboard").addClass('active');
	};
    if (urlQueryParams === "#dashboard")  {
	   	/* Set active tab & nav item */
		$("#dashboard").removeClass('hidden');
        $("nav button.dashboard").addClass('active');
	};
    if (urlQueryParams === "#network")  {
	   	/* Set active tab & nav item */
		$("#network").removeClass('hidden');
        $("nav button.network").addClass('active');
	};
    if (urlQueryParams === "#events")  {
	   	/* Set active tab & nav item */
		$("#events").removeClass('hidden');
        $("nav button.events").addClass('active');
	};
    if (urlQueryParams === "#resources")  {
	   	/* Set active tab & nav item */
		$("#resources").removeClass('hidden');
        $("nav button.resources").addClass('active');
	};
    if (urlQueryParams === "#discussion")  {
	   	/* Set active tab & nav item */
		$("#discussion").removeClass('hidden');
        $("nav button.discussion").addClass('active');
	};
    if (urlQueryParams === "#scorecard")  {
	   	/* Set active tab & nav item */
		$("#scorecard").removeClass('hidden');
        $("nav button.scorecard").addClass('active');
	};
    if (urlQueryParams === "#settings")  {
	   	/* Set active tab & nav item */
		$("#settings").removeClass('hidden');
        $("nav button.settings").addClass('active');
	};
	if (urlQueryParams === "?updated=success")  {
		/* Set active tab & nav item */
		$("#settings").removeClass('hidden');
        $("nav button.settings").addClass('active');
        /* Notification */
		$("#settings .notification.success").addClass('active');
        /* Set correct URL */
        window.history.pushState(null, null, '#settings');
        
        //Settings Success Notification
        $(".notification.success").removeClass('hidden');
        setTimeout(function() {
            $(".notification.success").animate({opacity: 0}, 600);
        }, 5000);
        setTimeout(function() {
            $(".notification.success").addClass('hidden');
        }, 6000);
	};
	if (urlQueryParams === "?updated=false")  {
		/* Set active tab & nav item */
		$("#settings").removeClass('hidden');
        $("nav button.settings").addClass('active');
        /* Notification */
		$("#settings .notification.error").addClass('active');
        /* Set correct URL */
        window.history.pushState(null, null, '#settings');
        
        //Settings Error Notification
        $(".notification.error").removeClass('hidden');
        setTimeout(function() {
            $(".notification.error").animate({opacity: 0}, 600);
        }, 5000);
        setTimeout(function() {
            $(".notification.error").addClass('hidden');
        }, 6000);
	};
    

    /* --- Navigation --- */

    //Dashboard tab click function
    $('nav button').on('click', function (e) {
        //Close quiz results if open
        $(".qsm_results button.button").trigger("click");
        //Remove Active class from all buttons
        $("nav button").removeClass('active');
        //Add active style to current button
        $(this).addClass('active');
        //Remove Account update message
        $(".profile-update-success").removeClass('active');
        $(".profile-update-error").removeClass('active');
        //Add active class to associated data tab and remove from others
        $('.tab').addClass('hidden')
        $('.tab[data-content=' + $(this).data('tab') + ']').removeClass('hidden');
        let tabNumber = $(this).data('tab');
        console.log(tabNumber);
        /* Scroll to tob of page */
        $('#dashboard-content').scrollTop(0);
        
        //Pass href to end of URL
        let tabURL = $(this).attr('href');
        // Create a new entry in the browser's history, without reloading
        window.history.pushState(null, null, tabURL);
    });
    
    //Expand Navigation Menu
    // Filter function
    $('nav img').on('click', function () {
        $('nav').toggleClass('expand');
        $('main').toggleClass('expand');
    });

    /* --- Network --- */

    // Sort Network by first Name
	$('#sortby-firstname').on('click', function () {
        $(this).siblings('.sorting-option').removeClass('sortactive');
        $(this).addClass('sortactive');
        var alphabeticallyOrderedDivs = $('#network .network__profile').sort(function(a, b) {
            return String.prototype.localeCompare.call($(a).data('firstname').toLowerCase(), $(b).data('firstname').toLowerCase());
        });
        var container = $("#network .network__container");
        container.empty().append(alphabeticallyOrderedDivs);
        $('#network .network__container').append(container);
    });
    // Sort Network by Last Name
    $('#sortby-lastname').on('click', function () {
        $(this).siblings('.sorting-option').removeClass('sortactive');
        $(this).addClass('sortactive');
        var alphabeticallyOrderedDivs = $('#network .network__profile').sort(function(a, b) {
            return String.prototype.localeCompare.call($(a).data('lastname').toLowerCase(), $(b).data('lastname').toLowerCase());
        });
        var container = $("#network .network__container");
        container.empty().append(alphabeticallyOrderedDivs);
    $('#network network__container').append(container);
    });
    // Sort Network by Organization
    $('#sortby-organization').on('click', function () {
        $(this).siblings('.sorting-option').removeClass('sortactive');
        $(this).addClass('sortactive');
        var alphabeticallyOrderedDivs = $('#network .network__profile').sort(function(a, b) {
            return String.prototype.localeCompare.call($(a).data('organization').toLowerCase(), $(b).data('organization').toLowerCase());
        });
        var container = $("#network .network__container");
        container.empty().append(alphabeticallyOrderedDivs);
        $('#network network__container').append(container);
    });




    // Filter function
    $('.filter').on('click', function () {
        //Get Filter Value
        let filter = $(this).attr('id');
        //If is already clicked
        if ($(this).hasClass('sortactive')) {
            // Remove active class from current button
            $(this).removeClass('sortactive');
            // If other filters are selected just remove this one
            if ($(this).siblings().hasClass('sortactive')){
                //Show profiles that match filter
                $( "#network .network__profile .interest" ).each(function() {
                    //Get interest from button text
                    let interest = $(this).data('cat');
                    //Remove filter classes
                    $('#network .network__profile').removeClass(filter);
                });
            } 
            //If no filters are selected remove all
            else {
                //Unhide all profiles
                $('#network .network__profile').removeClass('filter-hide');
                //Remove filter classes
                $('#network .network__profile').removeClass(filter);
            }
        }
        //Filter Click Trigger
        else {
            // Add active class to current button
            $(this).addClass('sortactive');
            // Show profiles that match filter
            $( "#network .network__profile .interest" ).each(function() {
                //Hide all profiles
                $(this).parent().parent().addClass('filter-hide');
                //Get interest from button text
                let interest = $(this).data('cat');
                // Show profiles that match term
                if (interest == filter) {
                    $(this).parent().parent().addClass(filter);
                    $(this).parent().parent().removeClass('filter-hide');
                }
            });
        }  
    });
    
    //Resources Watch Recording
	$('.video .resource-cover').on('click', function (e) {
		//Add active class to parent of selected video
		$(this).parent().addClass('active');
		//Pause All Videos
		$('.video video').trigger('pause');
		//Play Selected Video
		$(this).find('video').trigger('play');
	});
    
    //Resources Watch Recording
	$('.document .resource-cover').on('click', function (e) {
		//Add active class to parent of selected video
		let downloadUrl = $(this).attr('href');
        window.open(downloadUrl);
	});


    //New Topic Button
    $('#discussion .create-new-topic').on('click', function (e) {
        //Show form
        $('#new-topic').removeClass('hidden');
    });

    //Close new topic modal window
    $('.overlay').on('click', function (e) {
        $(this).parent().addClass('hidden');
    });

    //Upload Resource Button
    $('#resources .upload-resource').on('click', function (e) {
        //Show form
        $('#new-resource').removeClass('hidden');
    });






    //Redirection after creating new topic or reply

    //Get ID of topic that user just created
    var topicQueryID = url.substr(url.lastIndexOf('#') + 1); 
    //Remove from URL
    
    //Create array of all topic IDs
    var topicIDArray = [];
    //Add all topics to array
    $('#discussion .bbp-reply-header').each(function () {
        topicIDArray.push($(this).attr("id"));
    });

    //Check if topic ID is in array of Discussion topics or replies
    if(jQuery.inArray(topicQueryID, topicIDArray) !== -1) {
        /* Set active tab & nav item */
		$("#discussion").removeClass('hidden');
        $("nav button.discussion").addClass('active');
        window.history.pushState(null, null, '#discussion');

        //Check if item is a topic or reply

        //If Topic
        if ($('.topic[data-id=' + topicQueryID + ']').hasClass('topic')) {

            //Show notification "Your topic has been created."
            $('#discussion .notification.success').removeClass('hidden');
            $('#discussion .notification.success').removeClass('hidden');
             //Hide notification after X seconds
             setTimeout(function() {
                 $(".notification.success").animate({opacity: 0}, 600);
             }, 5000);
             setTimeout(function() {
                 $(".notification.success").addClass('hidden');
             }, 6000);

        }
    }
    else {
    }


});