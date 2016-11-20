// newad.jade
// http://jqueryvalidation.org

$().ready(function() {
    $('#form-new-ad').validate({
        rules: {
            'form-ad-category': {
                required: true
            },

            'form-ad-subcategory': {
                required: true
            },

            'form-ad-title': {
                required: true,
                rangelength: [3, 70]
            },

            'form-ad-description': {
                required: true,
                minlength: 3
            },

            'form-ad-phone': {
                required: true,
                minlength: 5,
                digits: true
            },

            'form-ad-price': {
                minlength: 1,
                number: true
            }
        },

        messages: {
            'form-ad-category': "Alegeţi categoria în care va fi plasat anunţul",
            'form-ad-subcategory': "Alegeţi subcategoria în care va fi plasat anunţul",
            'form-ad-title': "Introduceţi un titlu nu mai mic de 3 şi nu mai mare de 70 de caractere",
            'form-ad-description': "Introduceţi mesajul anunţului",
            'form-ad-phone':  "Introduceţi un număr de telefon valid",
            'form-ad-price':  "Introduceţi un preţ valid"
        }
    });

    var validForm = $('#form-new-ad');
    validForm.validate();
});