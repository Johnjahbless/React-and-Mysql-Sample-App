


const getStates = async() => {
    let states = []
    let sql = "SELECT * FROM state";
   await db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++) {
             states.push({ id: result[i].id, title: result[i].title });
            }
            
        }
        });
        
        return states;
}

module.exports = { getStates };