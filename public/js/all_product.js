const addProductForm = document.getElementById('add-product-form');

async function addProductSubmitBtn() {

    const errorPlaceHolders = document.querySelectorAll('p.error');
    for (let i = 0; i < errorPlaceHolders.length; i++) {
        errorPlaceHolders[i].style.display = 'none'
    }

    const errorInputClass = document.querySelectorAll('input.error');
    for (let i = 0; i < errorInputClass.length; i++) {
        errorInputClass[i].classList.remove('error');
    }

    const formData = new FormData(addProductForm);

    const response = await fetch('/all-product', {
        method: "POST",
        body: formData
    });
    const responseResult = await response.json();

    if (responseResult.errors) {
        Object.keys(responseResult.errors).forEach(
            fieldName => {
                const errorPlaceHolder = document.querySelector(`.${fieldName}-error`);
                errorPlaceHolder.textContent = responseResult.errors[fieldName].msg;
                errorPlaceHolder.style.display = 'block';
                addProductForm[fieldName].classList.add('error');
            }
        )
    } else {
        const toastBox = document.querySelector('.toast-box');
        const toastMsg = document.querySelector('.toast-txt-msg');
        toastBox.style.opacity = "1";
        toastMsg.textContent = 'Product is added successfully !';
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

}