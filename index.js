import server from "./endpoints/server.js";

const PORT = 9000;

server.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`)
})

