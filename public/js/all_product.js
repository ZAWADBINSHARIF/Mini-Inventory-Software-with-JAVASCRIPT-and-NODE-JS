const addProductForm = document.getElementById('add-product-form');

function toaster(message, fontColor = 'white') {
    const toastBox = document.querySelector('.toast-box');
    const toastMsg = document.querySelector('.toast-txt-msg');
    toastBox.style.opacity = "1";
    toastMsg.style.color = fontColor;
    toastMsg.textContent = message;

    setTimeout(() => {
        toastBox.style.opacity = "0";
    }, 2000);
}

// add product submit botton function
async function addProductSubmitBtn() {

    const add_product_modal = bootstrap.Modal.getInstance(document.getElementById('add-product-modal'));

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
        add_product_modal.hide();
        toaster('Product is added successfully !')
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

}

// Remove product function
async function removeProduct(product_id) {

    const response = await fetch(`all-product/${product_id}`, {
        method: 'DELETE'
    });

    const result = response.json();

    if (result.errors) {
        toaster('Error send form server!!', 'red');
    } else {
        toaster('Product is removed successfully!', 'yellow');
        document.getElementById(`#${product_id}`).remove();
    }
}
