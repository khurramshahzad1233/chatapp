import {configureStore} from "@reduxjs/toolkit"
import {groupchatcreatereducer, mychatlistreducer, removeuserfromgroupreducer, singlechatreducer, updategroupnamereducer, updategroupreducer } from "./components/reducer/chatreducer.js";
import { allmessagereducer, newmessagereducer } from "./components/reducer/messagereducer.js";
import { searchuserreducer, userreducer } from "./components/reducer/userreducer.js";
const store=configureStore({
    reducer:{

        userred:userreducer,
        searchuserred:searchuserreducer,
        singlechatred:singlechatreducer,
        mychatlistred:mychatlistreducer,
        groupchatcreatered:groupchatcreatereducer,
        updategroupnamered:updategroupnamereducer,
        updategroupred:updategroupreducer,
        removeuserfromgroup:removeuserfromgroupreducer,
        newmessagered:newmessagereducer,
        allmessagered:allmessagereducer,
    }
});
export default store;