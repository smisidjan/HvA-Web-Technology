function setAlert() {
    let age = document.forms["myForm"]["age"].value;
    let email = document.forms["myForm"]["email"].value;

    return (
        alert(`Je bent ingeschreven in de leeftijdscategorie ${age}. 
        Er is eem bevestigingsmail gestuurd naar ${email}`)
    )
}