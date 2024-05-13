import Prefs from "../models/prefs.js";

const savePrefs = async (req, res) => {
     try{
     const {prefs} = req.body;
     const username = req.username;

     var savedPrefsObjects = await Prefs.findOne({username: username});
     console.log(savedPrefsObjects);

     let savedPrefsList = [];

     if(savedPrefsObjects){
          savedPrefsList = savedPrefsObjects.prefs;
     }
     if(prefs.length > 0){
          prefs.map((value) => {
               console.log(value);
               savedPrefsList.push(value);
          });
     }
     

     if(savedPrefsObjects){
          const setValues = new Set(savedPrefsList);
          savedPrefsList = [...setValues];
          const updatedPrefs = await Prefs.findOneAndUpdate({username: username},{
               prefs: savedPrefsList
          });
     
          if(updatedPrefs){
               res.status(200).json({
                    message: 'Preferences saved successfully'
               });
          }else{
               res.status(404).json({message: 'encountered error, please contact admin.'});
          }
     }else{
          const savePrefs = new Prefs({
               prefs: savedPrefsList,
               username: username,
          });
          savePrefs.save();
          res.status(200).json({
               message: 'Preferences saved successfully'
          });
     }
     
     }catch(err){
          console.log(`error: ${err}`);
          res.status(404).json({message: `encountered error, please contact admin. ${err}`});
     }
};

export {savePrefs};