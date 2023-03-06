const { fakeAPIModel } = require('../model/fakeDataGenModel');
const { fetchFakeAPI } = require('../service/service');


//user Api's
async function getCityWise(req,res) {
   const { } = req.query;
   let temp = []
   await (await fakeAPIModel.find({},{name:1,email:1,dob:1,"location.city":1}).skip(0).limit(5)).map(function(doc) {
    var fullName = doc.name.title + " " + doc.name.first + " " + doc.name.last;
    temp.push({
        name:fullName,
        email:doc.email,
        dob:doc.dob,
        city: doc["location.city"]
    })
   // fakePIModel.save(doc);
  })

   res.status(200).send({count:temp.length,temp}) 
}

//SEED API'S
async function  getUserData(req,res){

    const ax = await fetchFakeAPI() //call 3 apis
    // console.log(ax.data.results[0]);
    const  savefkdata = await fakeAPIModel(ax.data.results[0]).save();  //save own db
    res.status(200).send({data:savefkdata})
} 

async function fakeDataSeed(req,res) {
    const { rid } = req.query;
    const recordArr =[]
    if(!rid) return res.status(400).send({msg:"record rid should be present"})

    for (let i = 0; i < rid; i++) {

        const element = await fetchFakeAPI();
        const savefkdata = await fakeAPIModel(element.data.results[0]).save();
        recordArr.push(savefkdata)
    }

    res.status(200).send({msg:`${recordArr.length} records save successfully`,recordArr})


}


//Clean and Delete API's

const cleanData = async (req,res)=>{
    const deleteAllRecords = await fakeAPIModel.deleteMany({})
    res.status(200).send({msg:"Records Deleted Successfully", deleteAllRecords})
}




module.exports = { getUserData, fakeDataSeed, cleanData,getCityWise }
