$(document).ready(function() {
    let my_amenities = [];
    let my_states = []
    let my_cities = []

    $(".amenities .popover input[type=checkbox]").click(function() {
	let my_list_name = [];
	my_amenities = []
	
	$('.amenities .popover  input[type=checkbox]:checked').each(function() {
	    my_list_name.unshift($(this).attr('data-name'));
	    my_amenities.unshift($(this).attr('data-id'));
	});
	if (my_list_name.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
          $('.amenities h4').text(my_list_name.join(', '));
      }
	console.log(my_amenities);
    });

      $(".locations .popover h2 input[type=checkbox]").click(function() {
        let my_list_name = [];
        my_states = []

        $('.locations .popover h2 input[type=checkbox]:checked').each(function() {
            my_list_name.unshift($(this).attr('data-name'));
            my_states.unshift($(this).attr('data-id'));
        });
        if (my_list_name.length === 0) {
        $('.locations h6.myStates').html('&nbsp;');
      } else {
          $('.locations h6.myStates').text(my_list_name.join(', '));
      }
        console.log(my_states);
    });

       $(".locations .popover ul ul input[type=checkbox]").click(function() {
        let my_list_name = [];
        my_cities = []

	   $('.locations .popover ul ul input[type=checkbox]:checked').each(function() {
            my_list_name.unshift($(this).attr('data-name'));
            my_cities.unshift($(this).attr('data-id'));
        });
        if (my_list_name.length === 0) {
        $('.locations h6.myCities').html('&nbsp;');
      } else {
          $('.locations h6.myCities').text(my_list_name.join(', '));
      }
        console.log(my_cities);
    });





    $('.filters button').click(function(event) {
	event.preventDefault();
	
	$('.places').text('');
	
	let obj = {}
	obj.amenities = my_amenities;
	obj.states = my_states;
	obj.cities = my_cities;

	list_places(JSON.stringify(obj));
    });
   



    $.ajax({
	url : 'http://0.0.0.0:5001/api/v1/status/',
	type : 'GET',
	dataType : 'json',
	success : function(json) {
            $('#api_status').addClass('available');
	},
	
	error : function(xhr, status) {
            console.log('error '+ xhr);
	},   
    });

    list_places();
    
    
});


function list_places(consulta='{}'){
    console.log(consulta);
    $.ajax({
	type:"POST",
	url:"http://0.0.0.0:5001/api/v1/places_search",
	dataType: 'json',
	data: consulta,
	contentType: "application/json; charset=utf-8",
	success:function(places){
	    console.log(places);
	    for(let i = 0; i < places.length; i++) {
		$('.places').append(`
				    <article>
				    <div class="title_box">
				    
				    <h2> ${places[i].name}</h2>
				    
				    <div class="price_by_night"> ${places[i].price_by_night} </div>
				    
				    </div>
				    
				    <div class="information">
				    
				    <div class="max_guest">${ places[i].max_guest}  
				    ${ places[i].max_guest > 1 ?'Guests':'Guest' } </div>
				    
				    
				    <div class="number_rooms">${places[i].number_rooms}
				    ${ places[i].number_rooms > 1 ?'Bedrooms':'Bedroom' }  </div>
				    
				    <div class="number_bathrooms">${ places[i].number_bathrooms }
				    ${ places[i].number_bathrooms > 1 ?'Bathrooms':'Bathroom' }  </div>
				    
				    </div>
				    <div class="user"> 
				    </div>
				    
				    <div class="description">
				    ${places[i].description}
				    </div>
				    
				    </article>
				    `);
	    }
	},    
	error : function(xhr, status) {
	    console.log('error '+ status);
	}    
    });
};
