const { fakeAPIModel } = require('../model/fakeDataGenModel');
const { fetchFakeAPI } = require('../service/service');



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

const cleanData = async (req,res)=>{
    const deleteAllRecords = await fakeAPIModel.deleteMany({})
    res.status(200).send({msg:"Records Deleted Successfully", deleteAllRecords})
}




module.exports = { getUserData, fakeDataSeed, cleanData }
