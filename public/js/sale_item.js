let basket = [];

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
    const result = await response.json()
    let total_price = 0;

    if (!result.productsInfo) return;

    cartViewModal_Table_Tbody.innerHTML = '';

    for (let i = 0; i < result.productsInfo.length; i++) {
        const getQuantityValue = basket.find(index => {
            return (index._id === result.productsInfo[i]._id);
        }).quantity;

        // total price of one product with quantity. {Quantity * Product price}
        const totalOneProductPrice = result.productsInfo[i].price * getQuantityValue
        total_price += totalOneProductPrice;

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

    const cartModal = new bootstrap.Offcanvas(document.getElementById('product-cart'));
    cartModal.show();
}