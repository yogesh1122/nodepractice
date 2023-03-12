const { fakeAPIModel } = require('../model/fakeDataGenModel');
const UserModel = require('../model/userModel');
const { fetchFakeAPI, getRandomNumber,userCreateObj } = require('../service/service');


//user Api's
async function getCityWise(req,res) {
 try {
       const { } = req.query;
   let temp = []
   await (await fakeAPIModel.find({},{name:1,email:1,dob:1,"location.city":1}).skip(0).limit(5)).map(function(doc) {
    var fullName = doc.name.title + " " + doc.name.first + " " + doc.name.last;
    temp.push({
        name:fullName,
        email:doc.email,
        dob:doc.dob,
        city: doc.location.city
    })
   // fakePIModel.save(doc);
  })

   res.status(200).send({count:temp.length,temp}) 
 } catch (error) {
    
 }
}

async function updateMany(req,res) {
    // const sal = await getRandomNumber(25000,500000);
    try {        
    
        const saveSal = await fakeAPIModel.find({}).then(users => {
          const salaries = Array.from({ length: users.length }, () => Math.floor(Math.random() * 100000));
            const updates = users.map((user, index) => ({
              updateOne: {
                filter: { _id: user._id },
                update: { $set: { salary: salaries[index] } }
              }
            }));
            return fakeAPIModel.bulkWrite(updates);
          })
        res.status(200).send({Msg:'all record updated',saveSal:saveSal.matchedCount})
    
    } catch (error) {
    res.status(500).send({msg:'Internal server error',error})
    }
}
//SEED API'S
async function  getUserData(req,res){
    try {
        
        const ax = await fetchFakeAPI() //call 3 apis
        // console.log(ax.data.results[0]);
        const  savefkdata = await fakeAPIModel(ax.data.results[0]).save();  //save own db
        res.status(200).send({data:savefkdata})

    } catch (error) {
    res.status(500).send({msg:'Internal server error',error})
        
    }
} 

async function fakeDataSeed(req,res) {
  try {
    const { rid } = req.query;
    const recordArr =[]
    if(!rid) return res.status(400).send({msg:"record rid should be present"})

    for (let i = 0; i < rid; i++) {

        const element = await fetchFakeAPI();
        const savefkdata = await fakeAPIModel(element.data.results[0]).save();
        recordArr.push(savefkdata)
    }

    res.status(200).send({msg:`${recordArr.length} records save successfully`,recordArr})
 
   } catch (error) {
    res.status(500).send({msg:'Internal server error',error})
   }

}

async function saveUser(req,res) {
  let arr = []
  const { num } = req.query
  if(!num) return res.status(400).send({msg:"query parameter required"})
  
   for (let i = 0; i < num; i++) {
    const resultObj = await  userCreateObj();
    //console.log(resultObj);
      let results = await UserModel(resultObj).save()
      arr.push(results)    
    }
   res.status(200).send({msg:`${arr.length} records save successfully`,arr})
}

//Clean and Delete API's

const cleanData = async (req,res)=>{
    const deleteAllRecords = await UserModel.deleteMany({})
    res.status(200).send({msg:"Records Deleted Successfully", deleteAllRecords})
}


module.exports = { getUserData, fakeDataSeed, cleanData,getCityWise,updateMany,saveUser }
