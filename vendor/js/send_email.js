function sendMail(contactForm, event) { // as 'this' on the form tag
    event.preventDefault();
    emailjs.send("service_esx4qk2", "template_lz29zt7", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_idea": contactForm.idea.value
    }).then(
        function (response) {
            console.log('Success', response);
        }, function (error) {
            console.log('Failed', error);
        }
    );
    return false;
};