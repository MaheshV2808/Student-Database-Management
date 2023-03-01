const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connections');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get("/",(request,response)=>{
    response.render('insert'); 
})

app.post("/insert", (request, response)=>{
    var name = request.body.name;
    var rollNo = request.body.rollNo;
    var standard = request.body.standard;
    var score = request.body.score;
    var mobileNo = request.body.mobileNo;
    var email = request.body.email;
    var address = request.body.address;
    const sql = `insert into students(Name, RollNumber, Standard, Score, MobileNo, EmailAddress, Address) value ('${name}', '${rollNo}', '${standard}', '${score}', '${mobileNo}', '${email}', '${address}')`;
    connection.query(sql,(error, result)=>{
        if(!error){
            response.sendFile(__dirname + '/success.html');
        }
        else{
            response.sendFile(__dirname + '/failure.html');
            console.log(error);
        }
    })
})

app.get("/show",(request, response)=>{
    const sql = "select * from students";
    connection.query(sql,(error, results)=>{
        if(error){
            response.sendFile(__dirname+'/failure.html');
        }
        else{
            response.render("showData",{students:results});
        }
    })
})

app.get("/delete/:RollNumber", (request,response)=>{
    var rollNo = request.params.RollNumber;
    const sql = `delete from students where RollNumber = '${rollNo}'`;
    connection.query(sql,(error, results)=>{
        if(error){
            response.sendFile(__dirname+'/failure.html');
            console.log(error);
        }
        else{
            response.redirect("/show"); 
        }
    })
})

app.get("/edit/:RollNumber",(request, response)=>{
    var rollNo = request.params.RollNumber;
    console.log(rollNo);
    const sql = `select * from students where RollNumber = '${rollNo}'`
    connection.query(sql, (error, results)=>{
        if(error){
            response.sendFile(__dirname+'/failure.html');
        }
        else{
            response.render('edit',{students:results});
        }
    })
})

app.post('/update/:RollNumber',( request, response)=>{
    var rollNo = request.params.RollNumber;

    var name = request.body.name;
    var standard = request.body.standard;
    var score = request.body.score;
    var mobileNo = request.body.mobileNo;
    var email = request.body.email;
    var address = request.body.address;

    const sql = `update students set Name = '${name}', Standard = '${standard}', Score = '${score}', MobileNo = '${mobileNo}', EmailAddress = '${email}', Address = '${address}' where RollNumber = '${rollNo}'`;
    connection.query(sql,(error, results)=>{
        if(error){
            response.sendFile(__dirname + '/failure.html');
        }
        else{
            response.redirect('/show');
        }
    })

})

app.post("/failure", (req, res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
