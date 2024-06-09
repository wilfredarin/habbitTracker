import { habbitSchema } from "./habbit.schema.js";
import mongoose from "mongoose";
const Habbit = mongoose.model("Habbit",habbitSchema);

export const addHabbitRepo = async (data)=>{
    try{
        const newHabbit = new Habbit(data);
        await newHabbit.save();
        return {success:true,msg:newHabbit}
    }catch(err){
        return {success:false,msg:err}
    }
}

export const getHabbitByIdRepo = async (_id)=>{
    try{
        // console.log({_id})
        const habbit = await Habbit.findOne({_id});
        if(habbit){
            return {success:true,msg:habbit}
        }
        return {success:false,msg:"Habbit with given ID not found!"}
    }catch(err){
        return {success:false,msg:err}
    }
}

export const getAllHabbitRepo = async()=>{
    try{
        const habbit = await Habbit.find();
        return {success:true,msg:habbit}
    }catch(err){
        return {success:false,msg:err}
    }
}

export const updateHabbitRepo = async (_id,date)=>{
    let state;
    try{
        const habbit = await Habbit.findOne({_id});
        if(!habbit){
            return {success:false,msg:"Habbit not found!"}
        }
        let dayState = habbit.status.find(item=>item.date.toDateString()===date.toDateString());
        if(!dayState){
            dayState = {date,state:"Done"}
            habbit.status.push(dayState);
        }else{
            switch(dayState.state){
                case "None":
                    state="Done"
                    break;
                case "Done":
                    state="Not Done"
                    break;
                default:
                    state="None"

            }
            dayState.state= state;
        }
        
        await habbit.save()
        let {curStreak,maxStreak}= checkStreak(habbit.status);
       
        habbit.streak = curStreak;
        habbit.maxStreak=maxStreak;
        await habbit.save()
        return {success:true,msg:dayState.state}
    }catch(err){
        console.log(err)
        return{sucess:false,msg:err}
    }   
}

function checkStreak(statusArr){
    if(statusArr.length===0){
        return {curStreak:0,maxStreak:0}
    }
    const sortedStatusArr = statusArr.sort((a,b)=>a.date-b.date);
    // console.log(sortedStatusArr)
    let curStreak=0;
    let maxStreak=0;
    let prevDate=null;

    sortedStatusArr.forEach(s=>{
        
        let currentDate = new Date(s.date);
       
        if(prevDate){
            const diffDays = (currentDate-prevDate)/(1000*60*60*24);
            if(diffDays>1){
                // console.log(diffDays,curStreak,currentDate);
                curStreak=0
            }
        }
        if(s.state==="Done"){
            curStreak++;
            maxStreak = Math.max(maxStreak,curStreak);
        }else{
           
            curStreak=0;
        }
        prevDate= currentDate;
        // console.log(currentDate,s.state,"sss",curStreak)
    });
    // console.log("sss",curStreak,maxStreak)
    return {curStreak,maxStreak}
}

export const deleteHabbitRepo =async(_id)=>{
    const resp = await Habbit.findByIdAndDelete({_id});
    return{resp}
}