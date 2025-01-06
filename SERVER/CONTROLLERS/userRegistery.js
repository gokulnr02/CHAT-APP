const { UserRegisterModel } = require('../MODEL/userRegisterModel');
const bcryptjs = require('bcryptjs');
const validators = require('validator');
const jwt = require('jsonwebtoken');
const { addedUsers } = require('../MODEL/addUser')
const mongoose = require('mongoose');
const {messages} = require('../MODEL/messages')

exports.userSave = async (request, response) => {
    try {
        const { username, email, password } = request.body
        const isUserExist = await UserRegisterModel.findOne({ email })
        if (isUserExist) return response.status(400).json({ "status": 400, "message": "User already exist create new record" });
        if (!validators.isEmail(email)) return response.status(400).json({ "status": 400, "message": "Invalid EmailId" });
        await UserRegisterModel.create({ username, email, password }).then((res) => {
            return response.status(200).json({ "status": 200, "message": "Saved Successfully", "data": res })
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}


exports.usersList = async (request, response) => {
    try {
        const primaryUser = request.params.id;

        const chatList = await addedUsers.find({}, { __v: 0, createdAt: 0, updatedAt: 0, _id: 0 });

        const allMembers = chatList
            .map((item) => item.members || [])
            .flat()
            .filter((id) => id !== primaryUser);

        console.log(allMembers,'allMembers')

        const uniqueIDs = [...new Set(allMembers), primaryUser];

        console.log([uniqueIDs.map(id => id)].flat(), 'uniqueIDs');


        const aggreGate = [];
        if (uniqueIDs.length > 0) {
            aggreGate.push({ $match: { _id: { $nin: uniqueIDs.map(id => new mongoose.Types.ObjectId(id)) } } })
        } else {
            aggreGate.push({ $match: { _id: { $ne: new mongoose.Types.ObjectId(primaryUser) } } })
        }

        aggreGate.push({
            $addFields: { fav: "$username", reciverId: "$_id" },
        },
            {
                $project: { username: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 },
            },)
        const allUsers = await UserRegisterModel.aggregate(aggreGate);

        if (allUsers.length > 0) {
            return response.status(200).json({ status: 200, message: "Success", data: allUsers });
        } else {
            return response.status(200).json({ status: 200, message: "No Records", data: [] });
        }
    } catch (err) {
        return response.status(400).json({ status: 400, message: err.message });
    }
};





exports.userDetails = async (request, response) => {
    try {
        const primaryUser = request.params.id
        await UserRegisterModel.find({ _id: primaryUser }).then((res) => {
            if (res.length > 0) {
                return response.status(200).json({ "status": 200, "message": "Success", "data": res })
            } else {
                return response.status(200).json({ "status": 200, "message": "No Records", "data": res })
            }
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
}
}

exports.login = async (request, response) => {
    try {
        const data = request.body
        const { username, password } = data
        await UserRegisterModel.findOne({username}).then((res) => {
            if (res === null) return response.status(400).json({ "status": 400, "message": "Invalid User details" })
            if (password === res.password) {
                const options = {
                    expiresIn: '1h',
                };
                const token = jwt.sign(data, process.env.JWT_SECRET_KEY, options);
                return response.status(200).json({ "status": 200, "message": "Login Successfully", "data": { res, token } })
            } else {
                return response.status(400).json({ "status": 400, "message": "Invalid User details" })
            }
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}


exports.Adduser = async (request, response) => {
    try {
        const  list  = request.body;
        console.log(list,'list')
        let result;
       await list.map(async (x) => {
            const { primaryUser, selectdUser } = x
        
            const ifExisiting = await addedUsers.findOne({
                members: { $all: [primaryUser, selectdUser] }
            })
            if (!ifExisiting) {
                result = await addedUsers.create({ members: [primaryUser, selectdUser] })
                .then(res=>{
                    return response.status(200).json({ "status": 200, "message": "Saved Successfully", "data":res })
                })
            }else{
                return response.status(200).json({ "status": 200, "message": "User Already Created", "data":[] })
            }
        })

    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}

exports.Fav = async(request,response)=>{
    try{
        const primaryUser = request.body._id
        await addedUsers.find({members:{$in:primaryUser}},{__v:0}).then( async res=>{
          console.log(res,'PRIMARY')
           const result = await Promise.all(res.map(async(val)=>{
                const id = val.members.flatMap(uID => uID != primaryUser ? uID:[]).toString()
                 return await UserRegisterModel.aggregate([
                    {$match:{_id: new mongoose.Types.ObjectId(id)}},
                    {
                        $addFields: {
                          fav: "$username" ,
                          reciverId:'$_id',
                          chatId:val._id
                        }
                      },
                      {$project:{__v:0,username:0,_id:0,password:0,updatedAt:0}}
                 ])  
            }))           
            return response.json({"status":'200',"message":"Success",data: await result.flat()})
        })
    }catch(err){
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}

exports.sendMessage = async (request, response) => {
    try {
        const message = request.body
        await messages.create(message).then((res) => {
            return response.status(200).json({ "status": 200, "message": "send Successfully", "data": res })
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}

exports.Messages = async (request, response) => {
    try {
        const cId = request.params.chatId
        await messages.find({chatId:cId}).then((res) => {
            if (res.length > 0) {
                return response.status(200).json({ "status": 200, "message": "Success", "data": res })
            } else {
                return response.status(200).json({ "status": 200, "message": "No Records", "data": res })
            }
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}

exports.chat = async (request, response) => {
    try {
        const cId = request.params.primaryUser;

        // Fetch chat details for the primary user
        const chatDetails = await addedUsers.aggregate([
            { $match: { members: { $in: [cId] } } },
            {
                $addFields: {
                    chatId: '$_id',
                    members: {
                        $filter: {
                            input: "$members",
                            as: "member",
                            cond: { $ne: ["$$member", cId] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    reciverId: { $arrayElemAt: ["$members", 0] }
                }
            },
            { $project: { __v: 0, updatedAt: 0, createdAt: 0, _id: 0, members: 0 } }
        ]);

        // Fetch additional details for each chat
        const chat = await Promise.all(chatDetails.map(async (x) => {
            const id = x.reciverId;

            // Fetch receiver details
            const userDetails = await UserRegisterModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $addFields: {
                        fav: "$username",
                        reciverId: '$_id',
                        chatId: x.chatId
                    }
                },
                { $project: { __v: 0, username: 0, _id: 0, password: 0, updatedAt: 0 ,createdAt:0} }
            ]);

            if (userDetails.length > 0) {
                x.fav = userDetails[0].fav;
                x.reciverId = userDetails[0].reciverId;
                x.chatId = userDetails[0].chatId;
            }

            // Fetch messages for the chat
            const messagesList = await messages.find({ chatId: x.chatId },{__v:0,chatId:0,_id:0,updatedAt:0});

            return {
                userDetails: userDetails[0] || null,
                messages: messagesList || []
            };
        }));

        return response.json({ status: 200, message: "Success", data: chat });
    } catch (err) {
        return response.status(400).json({ status: 400, message: err.message });
    }
};


