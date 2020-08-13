const express = require('express');
const path = require('path');
const db = require('./config/config');
const cors = require('cors')
const PORT = process.env.PORT || 3001;
let states = [], lga = [], courses = [], programmes = [], programmeCourses = [];



//start the express app
const app = express();


//STATIC MIDDLEWARES
app.use(express.urlencoded({limit: '10mb',  extended: true}));
app.use(express.json());
app.use(cors());

//IMPORT MIDDLEWARES
app.get('/', (req, res) => {
    res.status(200).json({data: 'API started successfully'})
});

app.get('/jsp/api/v1/add-school', async(req, res) => {
    
   try {

    await getStates();   
    await getLga();
    await getCourses();
    await getProgrammes();
    await getProgrammesCourses();  
delay(3, ()=> {
     res.status(200).json({states: states, lga: lga, courses: courses, programmes: programmes, programmeCourses: programmeCourses});
})
   } catch (error) {
       res.status(400).json('Error loading datas from DB ' + error)
   }
     
});

 const delay = (seconds, callback) => {
        setTimeout(callback, seconds*1000);
    }



const getStates = () => {
    let statement = "SELECT * FROM state";
if (states.length === 0) {
      db.query(statement, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++) {
           states.push({ id: result[i].id, title: result[i].title });
            }
            
        }
        });
}
  
}

const getLga = () => {
    let statement = "SELECT * FROM lga";
if (lga.length === 0) {
      db.query(statement, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++) {
           lga.push({ id: result[i].id, state_id: result[i].state_id, title: result[i].title });
            }
            
        }
        });
}
  
}

const getCourses = () => {
    let statement = "SELECT * FROM courses";
if (courses.length === 0) {
      db.query(statement, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++) {
           courses.push({ id: result[i].id, state_id: result[i].programme_id, title: result[i].title });
            }
            
        }
        });
}
  
}


const getProgrammes = () => {
    let statement = "SELECT * FROM programmes";
if (programmes.length === 0) {
      db.query(statement, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++) {
           programmes.push({ id: result[i].id, title: result[i].title });
            }
            
        }
        });
}
  
}

const getProgrammesCourses = () => {
    let statement = "SELECT * FROM programmes_courses_nce";
if (programmeCourses.length === 0) {
      db.query(statement, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++) {
           programmeCourses.push({ id: result[i].id, title: result[i].title });
            }
            
        }
        });
}
  
}

//connect to database once app is started
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log(' DB connected')
  });

  //make the connection global
  global.db = db;
  
  
  //to keep the connection alive, make frequent quries to SQL database
  setInterval(function () {
    
      db.query('SELECT 1');
  }, 5000);
   

app.listen(PORT, ()=> console.log(`JSP react test project running on port  ${PORT}`));

module.exports = app
