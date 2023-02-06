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
        basketOfProductCart.push({
            description: result.productsInfo[i].productName,
            quantity: getQuantityValue,
            price: result.productsInfo[i].price,
            "tax-rate": 0
        });

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
    const customerForm = document.getElementById('customer_form');
    const formData = {
        'customer_name': customerForm['customer_name'].value,
        'customer_address': customerForm['customer_address'].value,
        'customer_number': customerForm['customer_number'].value,
        'sale_products': basketOfProductCart
    }

    const response = await fetch('invoice/createInvoice', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const responseResult = await response.json();

    removeErrors();

    if (responseResult.errors) {
        Object.keys(responseResult.errors).forEach(fieldName => {
            const errorPlaceHolder = document.querySelector(`.${fieldName}_error`);
            errorPlaceHolder.textContent = responseResult.errors[fieldName].msg;
            errorPlaceHolder.style.display = 'block';
            customerForm[fieldName].classList.add('error');
        })
    }

    if (responseResult.result && responseResult.result?.fileCreated) {
        const download = await fetch(`/invoice/download/${responseResult.result.filename}`,
            {
                method: 'GET'
            });

        const blob = await download.blob(); // blob is recevied any kind of file
        console.log(blob)
        const link = document.createElement('a'); // create an anchore tag
        link.href = URL.createObjectURL(blob); // href added in anchore tag which was created
        link.download = `${responseResult.result.filename}.pdf`; // this download attribue works set a name of downloaded file
        document.body.appendChild(link); // create a append child in body
        link.click();
        document.body.removeChild(link);
    }

}

function removeErrors() {
    const errorPlaceHolders = document.querySelectorAll('p.error');
    for (let i = 0; i < errorPlaceHolders.length; i++) {
        errorPlaceHolders[i].style.display = 'none'
    }

    const errorInputClass = document.querySelectorAll('input.error');
    for (let i = 0; i < errorInputClass.length; i++) {
        errorInputClass[i].classList.remove('error');
    }
}

async function download_invoice() {
    await sendCustomerInfo();
}