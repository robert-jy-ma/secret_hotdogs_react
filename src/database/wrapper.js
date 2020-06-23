// wrapper for database access and error catching
// similar functionality as server/routes.js
import { users, hotdogs } from './database';

// ========================================= USERS ===========================================
const login = async (email, password) => {
    try {
        let userId = await users.login(email, password);
        return userId;
    } catch(e) {
        console.log("database: " + e);
        return false;
    }
}

const register = async (name, email, password) => {
    try {
        let userId = await users.register(name.trim(), email.trim(), password);
        console.log("database: User with id " + userId + " successfully created");
        return true;
    } catch(e) {
        console.log("database: " + e);
        return false;
    }
}

const getUser = async (id) => {
    try {
        let user = await users.get(id);
        return user;
    } catch(e) {
        console.log("database: " + e);
        return false;
    }
}

// ========================================= HOTDOGS =========================================
const getAllHotdogs = async () => {
    try {
        let res = await hotdogs.all();
        return res;
    } catch(e) {
        console.log("database: " + e);
        return [];
    }
}

const getHotdogsCreatedBy = async (id) => {
    try {
        let res = await hotdogs.getCreatedBy(id);
        return res;
    } catch(e) {
        console.log("database: " + e);
        return [];
    }
}

const getHotdogsCreatedByQuery = async (id) => {
    let query = await hotdogs.getCreatedByQuery(id);
    return query;
}

const addHotdog = async (hotdog) => {
    try {
        let hotdogId = await hotdogs.add(hotdog);
        console.log("database: Hotdog with id " + hotdogId + " successfully created");
        return true;
    } catch(e) {
        console.log("database: " + e);
        return false;
    }
}

export {
    login,
    register,
    getUser,
    getAllHotdogs,
    getHotdogsCreatedBy,
    getHotdogsCreatedByQuery,
    addHotdog,
}