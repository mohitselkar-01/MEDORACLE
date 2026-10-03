const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");


/* =========================
        ADD APPOINTMENT
========================= */

exports.addAppointment = async (req,res)=>{

try{

const {
patientName,
age,
gender,
phone,
appointmentDate,
appointmentTime,
disease,
notes
}=req.body;


const appointment = await Appointment.create({

patientName,
age,
gender,
phone,
appointmentDate,
appointmentTime,
disease,
notes,

status:"Pending",

doctorId:req.user.id

});


res.status(201).json({

success:true,

message:"Appointment Created Successfully",

appointment

});


}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

};




/* =========================
        GET APPOINTMENTS
========================= */

exports.getAppointments = async(req,res)=>{

try{


const appointments = await Appointment.findAll({

where:{
doctorId:req.user.id
},

order:[

["appointmentDate","ASC"],

["appointmentTime","ASC"]

]

});


res.status(200).json({

success:true,

appointments

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};





/* =========================
        SINGLE APPOINTMENT
========================= */

exports.getAppointment = async(req,res)=>{

try{


const appointment = await Appointment.findOne({

where:{

id:req.params.id,

doctorId:req.user.id

}

});


if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment Not Found"

});

}



res.json({

success:true,

appointment

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};







/* =========================
        UPDATE APPOINTMENT
========================= */


exports.updateAppointment = async(req,res)=>{

try{


const appointment = await Appointment.findOne({

where:{

id:req.params.id,

doctorId:req.user.id

}

});


if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment Not Found"

});

}


// only allowed fields

const {

appointmentDate,

appointmentTime,

disease,

notes

}=req.body;



await appointment.update({

appointmentDate,

appointmentTime,

disease,

notes

});



res.json({

success:true,

message:"Appointment Updated Successfully",

appointment

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};






/* =========================
        DELETE
========================= */


exports.deleteAppointment = async(req,res)=>{


try{


const appointment = await Appointment.findOne({

where:{

id:req.params.id,

doctorId:req.user.id

}

});


if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment Not Found"

});

}



await appointment.destroy();



res.json({

success:true,

message:"Appointment Deleted Successfully"

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};








/* =========================
        UPDATE STATUS
========================= */


exports.updateStatus = async(req,res)=>{


try{


const appointment = await Appointment.findOne({

where:{

id:req.params.id,

doctorId:req.user.id

}

});


if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment Not Found"

});

}



appointment.status=req.body.status;


await appointment.save();



res.json({

success:true,

message:"Status Updated",

appointment

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};








/* ===================================================
        APPROVE APPOINTMENT + CREATE PATIENT
=================================================== */


exports.approveAppointment = async(req,res)=>{


try{


const appointment = await Appointment.findOne({

where:{

id:req.params.id,

doctorId:req.user.id

}

});



if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment Not Found"

});

}




if(appointment.status==="Confirmed"){

return res.json({

success:true,

message:"Already Confirmed"

});

}





const patientExist = await Patient.findOne({

where:{

doctorId:req.user.id,

phone:appointment.phone

}

});




if(!patientExist){


await Patient.create({

patientName:appointment.patientName,

age:appointment.age,

gender:appointment.gender,

phone:appointment.phone,

disease:appointment.disease,

symptoms:appointment.notes,

bloodGroup:"",

address:"",

doctorId:req.user.id

});


}



appointment.status="Confirmed";


await appointment.save();




res.json({

success:true,

message:"Appointment Approved and Patient Added"

});


}

catch(error){

console.log(error);


res.status(500).json({

success:false,

message:error.message

});

}


};