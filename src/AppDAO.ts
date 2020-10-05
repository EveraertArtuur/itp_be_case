const sqlite3 = require('sqlite3').verbose();


    
     let db = new sqlite3.Database('./bowling.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          return console.error(err.message);
        }else{
          db.run('CREATE TABLE Bowl(score id)',err => {
            if (err) {
              return console.error(err.message);
            }
          });
        }

        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
        });
      });

      
  
  
      module.exports = db