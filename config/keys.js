//determine what to produce based on envirement
if(process.env.NODE_ENV==='production')
{// production
    module.exports=require('./prod')
}
else{
//development
module.exports=require('./dev');
}