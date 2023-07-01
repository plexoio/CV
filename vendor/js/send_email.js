function sendMail(contactForm, event) { // as 'this' on the form tag
    event.preventDefault();
    emailjs.send("service_esx4qk2", "template_lz29zt7", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_idea": contactForm.idea.value
    }).then(
        function (response) {
            console.log('Success', response);
            $('#email_sent').html(`<div class="col alert alert-primary text-center" role="alert">
            Email sent successfully! I'll get back to you shortly!
          </div>`);
          $('.center-form').addClass('d-none');
        }, function (error) {
            console.log('Failed', error);
        }
    );
    return false;
};