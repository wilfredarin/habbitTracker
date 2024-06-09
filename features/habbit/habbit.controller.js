import { addHabbitRepo, getAllHabbitRepo,getHabbitByIdRepo,updateHabbitRepo,
    deleteHabbitRepo
 } from "./habbit.repository.js"

export const getAllHabbit = async(req,res)=>{
    const resp = await getAllHabbitRepo();
    if(resp.success){
        const habbits = resp.msg;
        const todayDate = Date.now();
        res.render("index",{habbits,todayDate});
    }
    else{
        res.send(resp.msg)
    }
}

export const getHabbitDetailById = async(req,res)=>{
    const _id= req.params.id;
    const date = new Date(parseInt(req.params.date));
    const resp = await getHabbitByIdRepo(_id);
    if(resp.success){
        const habbit = resp.msg;
        const count = 6;
        const statusArr = generateNDays(date,count,habbit);
        res.render("habbit-detail",{habbit,statusArr});
    }else{
        // console.log(resp.msg);
        res.send(resp.msg)
    }
   
}
export const addHabbit = async(req,res)=>{
    const name = req.body.name;
    // console.log(req.body);
    const resp = await addHabbitRepo({name});
    // console.log(resp)
    if(resp.success){
        res.redirect("/")
    }else{
        res.send(resp.msg);
    }
    
}
export function generateNDays(startDate,count,habbit){
    let statusArr = [];
   
    for (let i=0;i<count;i++){
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate()-i);
        const day = habbit.status.find(d=>d.date.toDateString()===newDate.toDateString())||{date:newDate,state:"None"};
        statusArr.push(day);
        // console.log(day,i)
    }
    return statusArr;
}

export const updateHabbit = async (req,res)=>{
    let {id,date} = req.params;
    date = new Date(date);
    const resp = await updateHabbitRepo(id,date);
    // console.log(resp)
    if(resp.success){
        const state = resp.msg;
        res.json(state);
    }else{
        res.send(resp.msg)
    }
}

export const getPrevHabbitDetail = async(req,res)=>{
    let {id,date}= req.params;
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate()-1);
    newdate = newdate.getTime();

    res.redirect(`/habbits/${id}/${newdate}`);
}

export const getNextHabbitDetail = async(req,res)=>{
    let {id,date}= req.params;
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate()+6);
    newdate = newdate.getTime();
    res.redirect(`/habbits/${id}/${newdate}`);
}

export const deleteHabbit = async(req,res)=>{
    const {id} = req.params;
    const resp =await deleteHabbitRepo(id);
    console.log(resp);
    return res.json({msg:"deleted"})
}