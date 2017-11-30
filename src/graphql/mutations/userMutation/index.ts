import addUser from "./add";
import auth from "./authentication";
import removeUser from "./remove";
import updateUser from "./update";

export default {
    addUser,
    removeUser,
    updateUser,
    login: auth.login,
    logout: auth.logout   
};