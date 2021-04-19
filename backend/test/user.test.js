const User = require('../models/user-model');
const mongoose = require('mongoose');


const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
afterAll(async () =>{
    await mongoose.connection.close();
});
describe('User Schema test', () => {
     it('Add User testing', () => {
        const users = {
            'name':'pooja',
            'email': 'pooja@gmail.com',
           ' password':'123456',
            'isAdmin':'false'
            };
    
        return Users.create(users)
        .then((pro_ret) => {
            expect(pro_ret.name).toEqual('pooja');
         });
     });
     it('Update User', async () =>{
         return User.findOneAndUpdate({
             _id:Object('607e8d64086fc128ccdcd712')
         },{$set : {name:'pooja'}})
            .then((pp)=>{
             expect(pp.name).toEqual('pooja')
         })
     })
     it('User Delete', async()=>{

         const status = await Users.deleteMany();
         expect(status.ok).toBe(1);
     })
})