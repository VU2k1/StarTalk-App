'use strict';

// load package
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'mysql1',
  user : 'root',
  password : 'admin',

});
connection.connect();
var channelName;

app.get('/init', (req, res) => {
    connection.query('CREATE DATABASE IF NOT EXISTS logindb', function (error, result) {
      if (error) console.log(error);
      
    });
    connection.query('USE logindb',
      function (error, results){
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS users (
      id int unsigned NOT NULL auto_increment, 
      email varchar(100) NOT NULL,
      password varchar(100) NOT NULL,
      username varchar(100) NOT NULL,
      PRIMARY KEY (id))`,function(error, result){
        if (error) console.log(error);
      });

    connection.query(`CREATE TABLE IF NOT EXISTS channels (
      id int unsigned NOT NULL auto_increment, 
      name varchar(100) NOT NULL,
      PRIMARY KEY (id))`,function(error, result){
        if (error) console.log(error);
      });

    connection.query(`CREATE TABLE IF NOT EXISTS messages (
      id int unsigned NOT NULL auto_increment, 
      sender varchar(100) NOT NULL,
      msg varchar(100) NOT NULL,
      channel varchar(100) NOT NULL,
      vote INT UNSIGNED NOT NULL DEFAULT 0,
      PRIMARY KEY (id))`,function(error, result){
        if (error) console.log(error);
      });

      connection.query(`CREATE TABLE IF NOT EXISTS replies (
      id int unsigned NOT NULL auto_increment, 
      sender varchar(100) NOT NULL,
      reply varchar(100) NOT NULL,
      msgid INT UNSIGNED NOT NULL,
      vote INT UNSIGNED NOT NULL DEFAULT 0,
      PRIMARY KEY (id))`,function(error, result){
        if (error) console.log(error);
      });

      
  });

app.post('/register', (req,res) => {
    connection.query('USE logindb',
    function (error, results){
        if (error) console.log(error);
    });

    connection.query('SELECT COUNT(*) AS userCount FROM users', function (error, result) {
        if (error) console.log(error);

        let id = result[0].userCount + 1; // increment count by 1 for new post
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var query = `INSERT INTO users (id, username, email, password) VALUES
        ('${id}', '${username}', '${email}', '${password}')`;

        connection.query(query, function (error,result) {
            if (error) console.log(error);
        });
    });
});

app.post('/login', (req, res) =>{
    connection.query('USE logindb',
    function (error, results){
        if (error) console.log(error);
    });
    const email = req.body.email;
    const password = req.body.password;

    connection.query('SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    function (err, result) {
        if(err){
            console.log(err);
        } 
        console.log(result)
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Wrong username or password"})
        }
        }
    )
})


app.post('/addChannel', (req,res) => {
    var name = req.body.name;

    connection.query('USE logindb', function (error, results) {
        if (error) console.log(error);
    
        connection.query(`INSERT INTO channels (name) VALUES
        ('${name}');`, function (error, result) {
          if (error) console.log(error);
        });
      });

      
        
})

app.post('/receiveChannelName', (req, res) => {
  channelName = req.body.name;
  console.log(channelName);

  connection.query('USE logindb', function (error, results) {
    if (error) console.log(error);

  connection.query(`SELECT id, sender, msg FROM messages WHERE channel = ?`, [channelName], function (error, result) {
    if (error) console.log(error);

    res.send(result);
  });
  });
});


  app.get('/getChannels', (req, res) => {
    connection.query('USE logindb', function (error, results) {
      if (error) console.log(error);
  
      connection.query("SELECT name FROM channels", function (error, result) {
        if (error) console.log(error);
        const names = result.map(item => item.name);
        res.send(names);
      });
    });
  });
  

app.get('/getChannelInfo',(req, res) => {
    connection.query('USE logindb', function (error, results) {
      if (error) console.log(error);

    if (channelName){
        res.send({name: channelName})
        
    } else {
        res.send({message: "No Channel Selected"})
    }
    
    });
  });

app.post('/addMsg', (req,res) => {
   
    var sender = req.body.sender;
    var msg = req.body.msg;
    
    connection.query('USE logindb',
    function (error, results){
        if (error) console.log(error);
    });
    var query = `INSERT INTO messages (sender, msg, channel) VALUES
    ( '${sender}', '${msg}', '${channelName}')`;
    
    connection.query(query, function (error,result) {
        if (error) console.log(error);
    });
    connection.query(`SELECT id ,sender, msg FROM messages WHERE channel = ?`, [channelName], function (error, result) {
      if (error) console.log(error);
  
      res.send(result);
    });   
});


app.post('/addRep', (req,res) => {
   
  var sender = req.body.sender;
  var msgid = req.body.msgid;
  var reply = req.body.reply;
  
  connection.query('USE logindb',
  function (error, results){
      if (error) console.log(error);
  });
  var query = `INSERT INTO replies (sender, reply, msgid) VALUES
  ( '${sender}', '${reply}', '${msgid}')`;
  
  connection.query(query, function (error,result) {
      if (error) console.log(error);
  });
  connection.query(`SELECT sender, reply, id FROM replies WHERE msgid = ?`, [msgid], function (error, result) {
    if (error) console.log(error);
    console.log(result[0]['id'])

    res.send(result);
  });   
});



app.post('/showRep', (req,res) => {
   
  
  var msgid = req.body.msgid;
  console.log(msgid)
  
  connection.query('USE logindb',
  function (error, results){
      if (error) console.log(error);
  });

  connection.query(`SELECT sender, reply, id FROM replies WHERE msgid = ?`, [msgid], function (error, result) {
    if (error) console.log(error);
    console.log(result[0])
    res.send(result);
  });   
});

app.post('/deleteMessage', (req, res) => {
  const id = req.body.id;
  connection.query('USE logindb', function (error, results){
    if (error) console.log(error);
  });
  console.log(id)
  connection.query('DELETE FROM messages WHERE id = ?', [id], function (error, result) {
    if (error) console.log(error);
    console.log(`Deleted message with ID ${id}`);
  });
  res.send({message: 'message has been deleted'});
});

app.post('/deleteChannel', (req, res) => {
  const name = req.body.name;
  connection.query('USE logindb', function (error, results){
    if (error) console.log(error);
  });
  
  connection.query('DELETE FROM channels WHERE name = ?', [name], function (error, result) {
    if (error) res.send({message: 'No channel has that name'});
    console.log(`Deleted channel with name ${name}`);
  });
  res.send({message: 'channel has been deleted'});
});

app.post('/deleteRep', (req, res) => {
  const id = req.body.id;
  connection.query('USE logindb', function (error, results){
    if (error) console.log(error);
  });
  console.log(id)
  connection.query('DELETE FROM replies WHERE id = ?', [id], function (error, result) {
    if (error) console.log(error);
    console.log(`Deleted reply with ID ${id}`);
  });
  res.send({message: 'message has been deleted'});
});

app.get('/getMostMsg', (req, res) => {
  
  connection.query('USE logindb', function (error, results){
    if (error) console.log(error);
  });
 
  connection.query(`SELECT sender
  FROM messages
  GROUP BY sender
  ORDER BY COUNT(*) DESC
  LIMIT 1;`,function(error, result){
    if (error) console.log(error);
    
    let mostMSG = result[0]['sender']
    res.send({mostMSG: mostMSG})
  }) 
});

app.get('/getMostRep', (req, res) => {
  
  connection.query('USE logindb', function (error, results){
    if (error) console.log(error);
  });
 
  connection.query(`SELECT sender
  FROM replies
  GROUP BY sender
  ORDER BY COUNT(*) DESC
  LIMIT 1;`,function(error, result){
    if (error) console.log(error);
    
    let mostREP = result[0]['sender']
    res.send({mostREP: mostREP})
  }) 
});

app.listen(PORT, HOST);
    
console.log('up and running');