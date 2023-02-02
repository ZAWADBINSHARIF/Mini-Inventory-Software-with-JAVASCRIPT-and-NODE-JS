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

async function sendSeletedProductsToCart() {
    if (basket.length === 0) return;
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

    console.log(result.productsInfo);

    const cartModal = new bootstrap.Offcanvas(document.getElementById('product-cart'));
    cartModal.show();
}