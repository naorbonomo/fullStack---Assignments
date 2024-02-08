function dd(x){
    return document.getElementById(x);
}
let itemNumber = 0

function addProduct(){
    let name = dd("name").value 
    let price = dd("price").value
    let category = dd("category").value
    let imageURL = dd("imageURL").value

    if(name === "" || price === "" || category === "" || imageURL === "" ){
        alert('please fill complete form')
    }else{
        let output = `<tr id="${itemNumber}">
                        <td>${name}</td>
                        <td>${price}</td>
                        <td>${category}</td>
                        <td><img src="${imageURL}" alt=""></td>
                        <td><input type="button"  id="remove" value="Remove" onclick="removeItem(${itemNumber})" ></input></td>
                    </tr>`
        dd(`tBody`).innerHTML += output
        clearForm()
        itemNumber++
    }
}

function removeItem(n){
    let clearTable = ``
    dd(n).innerHTML = clearTable
}

function clearForm(){
    let clear = ""
    dd("name").value = clear
    dd("price").value = clear
    dd("category").value = clear
    dd("imageURL").value = clear
}
    

    