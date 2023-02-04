let basket = []; // store seleted id of products and quantities
let basketOfProductCart = []; // store id of product cart and quantities for comfire to sale and get invoice.

function productQuantityInputChange(product_id, quantity) {

    if (quantity > 0) {
        const hasProduct = basket.find(index => {
            return product_id === index._id
        })
        if (hasProduct) {
            hasProduct.quantity = quantity;
        } else {
            basket.push({ _id: product_id, quantity });
        }
    } else if (quantity < 0) {
        const errorProductId = document.getElementById(product_id)
        const errorPlaceholder = errorProductId.getElementsByClassName('error_product_quantity');
        errorPlaceholder[0].style.display = 'block'
    } else {
        const errorProductId = document.getElementById(product_id)
        const errorPlaceholder = errorProductId.getElementsByClassName('error_product_quantity');

        errorPlaceholder[0].style.display = 'none';

        basket = basket.filter(index => {
            return index._id != product_id;
        });
    }
}

async function showSeletedProductsCart() {
    if (basket.length === 0) return;
    const cartViewModal_Table_Tbody = document
        .querySelector('.cart-view')
        .querySelector('table')
        .querySelector('tbody');
    const response = await fetch('saleItem/getProducts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(basket)
        }
    );
    const result = await response.json();
    let total_price = 0;
    basketOfProductCart = []

    if (!result.productsInfo) return;

    cartViewModal_Table_Tbody.innerHTML = '';

    for (let i = 0; i < result.productsInfo.length; i++) {

        // Store product quantity to getQuantityValue which are responsed by server.
        const getQuantityValue = basket.find(index => {
            return (index._id === result.productsInfo[i]._id);
        }).quantity;

        // total price of one product with quantity. {Quantity * Product price}
        const totalOneProductPrice = result.productsInfo[i].price * getQuantityValue
        total_price += totalOneProductPrice;
        basketOfProductCart.push({ _id: result.productsInfo[i]._id, quantity: getQuantityValue });

        const tableData = `
            <tr>
                <td>${result.productsInfo[i].productName}</td>
                <td class="text-center">${getQuantityValue}</td>
                <td>${result.productsInfo[i].price}Tk</td>
                <td>${totalOneProductPrice}Tk</td>
            </tr>
        `
        // add seleted products add to cart in table as a table row
        cartViewModal_Table_Tbody.innerHTML += tableData;
    }

    // add total price table row
    cartViewModal_Table_Tbody.innerHTML += `
            <tr>
                <td colspan="3">💰</td>
                <td>${total_price}Tk</td>
            </tr>
    `
    console.log(basketOfProductCart)
    const cartModal = new bootstrap.Offcanvas(document.getElementById('product-cart'));
    cartModal.show();
}

async function sendCustomerInfo() {
    const customerForm = document.getElementById('customer_form')

    const formData = new FormData(customerForm);

    const response = await fetch('invoice/createInvoice', {
        method: "POST",
        body: formData
    })

    // const responseResult = await response.json();

    // if (responseResult.errors) {
    //     Object.keys(responseResult.errors).forEach(fieldName => {
    //         const errorPlaceHolder = document.querySelector(`.${fieldName}_error`);
    //         errorPlaceHolder.textContent = responseResult.errors[fieldName].msg;
    //         errorPlaceHolder.style.display = 'block';
    //         customerForm[fieldName].classList.add('error');
    //     })
    // }

}

async function download_invoice() {
    await sendCustomerInfo();
}