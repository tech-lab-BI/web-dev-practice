let bagItems;
onLoad();

function onLoad(){
    let str = localStorage.getItem('bagItem');
    bagItems = (str===null)?[]:JSON.parse(str);
    displayItems();
    displayBag();
}
function addToBag(id){
    bagItems.push(id);
    localStorage.setItem('bagItem', JSON.stringify(bagItems));
    displayBag();
}
function displayItems(){
    let itemDetails = document.querySelector('.item-container');
    let innerHtml = '';
    items.forEach(item => {
        innerHtml += `
            <div class="item">
                <img class="item-image" src="${item.image}" alt="item image">
                <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
                <div class="company-name">${item.company}</div>
                <div class="product-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">Rs. ${item.current_price}</span>
                    <span class="orginal-price">Rs. ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>
        `;
    });
    itemDetails.innerHTML = innerHtml;
}
function displayBag(){
    let b = document.querySelector('.bag-Count');
    let count = bagItems.length;
    if(count===0){
       b.style.visibility = 'hidden';
    }else{
        b.style.visibility = 'visible';
        b.innerHTML = `${count}`;
    }
}
// localStorage.clear();
// onLoad();