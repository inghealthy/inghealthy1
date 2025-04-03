$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.container-post .category_item[category="all"]').addClass('ct_item-active');

	// FILTRANDO PRODUCTOS  ============================================

	$('.category_item').click(function(){
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.col-lg-4-23').css('transform', 'scale(0)');
		function hideProduct(){
			$('.col-lg-4-23').hide();
		} setTimeout(hideProduct,400);
		 
		// MOSTRANDO PRODUCTOS =========================
		
		function showProduct(){
			$('.col-lg-4-23[category="'+catProduct+'"]').show();
			$('.col-lg-4-23[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
			
		
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	$('.category_item[category="all"]').click(function(){
		function showAll(){
			$('.col-lg-4-23').show();
			$('.col-lg-4-23').css('transform', 'scale(1)');
		} setTimeout(showAll,400);
		
	});
});



