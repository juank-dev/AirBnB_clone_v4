$(document).ready(function() {
    $("input[type=checkbox]").click(function() {
	let my_list_name =[];
	let my_id = [];
	$('input[type=checkbox]:checked').each(function() {
            my_list_name.push($(this).attr('data-name'));
	    my_id.push($(this).attr('data-id'));
	});
	if (my_list_name.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
          $('.amenities h4').text(my_list_name.join(', '));
      }
	console.log(my_id);
    });
});


$.ajax({
    url : 'http://0.0.0.0:5001/api/v1/status/',
    type : 'GET',
    dataType : 'json',
    success : function(json) {
        $('#api_status').addClass('available');
    },

    error : function(xhr, status) {
        console.log('error '+ status);
    },

   
});
