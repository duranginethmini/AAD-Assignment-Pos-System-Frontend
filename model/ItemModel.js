// import { Items } from '../db/DB.js';
//
// export function saveItem(item) {
//     Items.push(item);
//     console.log(Items);
// }
//
// export function getAllItems() {
//     return Items;
// }
//
// export function deleteItem(index){
//     Items.splice(index, 1);
// }
//
// export function updateItem(index, item){
//     Items[index] = item;
// }
export function saveItem(item, callback) {
    const itemJSON = JSON.stringify(item);
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200 || http.status === 201) {
                console.log(JSON.stringify(http.responseText));
                if (callback) callback();
            } else {
                console.error("Item Save Unsuccessful");
                console.error("Status", http.status);
                console.error("Ready State", http.readyState);
            }
        } else {
            console.error("Ready State", http.readyState);
        }
    };
    http.open("POST", "http://localhost:8080/PosBackend/item", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(itemJSON);
}

export function getAllItems() {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200) {
                    const items = JSON.parse(http.responseText);
                    resolve(items);
                } else {
                    reject("Failed to retrieve items");
                }
            }
        };
        http.open("GET", "http://localhost:8080/PosBackend/item", true);
        http.send();
    });
}

export function updateItem(item) {
    const itemJSON = JSON.stringify(item);
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 204) {
                console.log("Item updated successfully");
            } else {
                console.error("Item Update Unsuccessful");
                console.error("Status", http.status);
                console.error("Ready State", http.readyState);
            }
        } else {
            console.error("Ready State", http.readyState);
        }
    };
    http.open("PUT", "http://localhost:8080/PosBackEnd/item", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(itemJSON);
}

export function deleteItem(itemId) {

    console.log("itemId ", itemId);
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 204) {
                console.log("Item deleted successfully");
            } else {
                console.error("Item Delete Unsuccessful");
                console.error("Status", http.status);
                console.error("Ready State", http.readyState);
            }
        } else {
            console.error("Ready State", http.readyState);
        }
    };
    http.open("DELETE","http://localhost:8080/PosBackend/item?itemId=${itemId},true"
);
    http.send();
}