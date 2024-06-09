import app from "./index.js"
import { connectToDb } from "./config/mongooseConfig.js"

import { getHabbitByIdRepo } from "./features/habbit/habbit.repository.js";
import { generateNDays } from "./features/habbit/habbit.controller.js";


app.listen(process.env.PORT},async ()=>{
    await connectToDb();
    console.log("Server is running at port 3000");
    // const date = new Date();
    
    // const id = "6664e9a6cb83cf06b996b255"
    // const habbit = await getHabbitByIdRepo(id);
    // const arr = generateNDays(date,6,habbit.msg);
    // console.log(arr)

})