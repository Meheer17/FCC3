var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const personSchema = new Schema({
        name : { type : String, required : true},
        age : Number,
        favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema); 


const createAndSavePerson = function(done) {
  const sanya = new Person({
        name : "Sanya",
        age : 16,
        favoriteFoods : ["pizza" , 'burger', 'nachos' , 'wedges', 'sundaes','mojito'] 
})
sanya.save(function(err, data){
        if(err) return console.error(err);
        done(null, data)
 });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];    

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
        if (err) return console.log(err);
        done(null, data);
  });
};      



const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
          if (err) return console.log(err);
          done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) =>{
          if (err) return console.log(err);
          done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data)=> {
          if(err) return console.log(err);
          done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data)=>{
          if (err) return console.log(err);
          data.favoriteFoods.push(foodToAdd);
          data.save((err,dataUpdated) => {
                  if (err) return console.log(err);
                  done(null, dataUpdated)
          });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, updates) => {
          if (err) return console.log(err);
          done(null, updates);
  })
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
          if (err) return console.log(err);
          done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, data) => {
          if(err) return console.log(err);
          done(null, data);
  });
};

var queryChain = function(done) {
  var foodToSearch = "burrito";
  var jsonObject = {favoriteFoods : foodToSearch};
  Person.find(jsonObject).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    (err) ? done(err) : done(null, data); 
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
