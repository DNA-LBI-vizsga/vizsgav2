import { StorageConn } from "../../models/StorageConnModel.js";

async function storeItem(itemId, storagePlaceId) {
    
    const items = {
        itemId: itemId,
        storagePlaceId: storagePlaceId
    }
    

    try{
        const storage = await StorageConn.create(items);
        return  { message: "Item stored successfully" };
    }
    catch(err){
        throw new Error("Failed to store item" + err);
    }
}

async function deleteStoredItem(itemId) {
    
    try{
        await StorageConn.destroy({where: {itemId: itemId}}); 
        return  { message: "Item deleted successfully" };
    }
    catch(err){
        throw new Error("Failed to delete item" + err);
    }
}

export {
    storeItem,
    deleteStoredItem
};