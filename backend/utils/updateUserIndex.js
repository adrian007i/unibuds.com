const Universities = require('../models/Universities'); 

// each university has a list of associated users stored in an array. 
// see /backend/models/universities for details
// we want to sstore the index postion of the user in the array
const updateUserIndex = async (university_id, user) => {

    // INSERT THE NEW USER INTO THE UNIVERSITIES->USERS
    Universities.updateOne(
        { _id: university_id },
        { $push: { users: user._id } }
    ).then(result => {

        if (result.modifiedCount === 1) {

            // FIND THE USER INDEX POSITION IN UNIVERSITIES->USERS ARRAY
            Universities.aggregate([
                { $match: { _id: university_id } },
                {
                    $project: {
                        index: { $indexOfArray: ["$users", user._id] }
                    }
                }]).then(uniUser => {

                    // ASYNC - STORE THE USER INDEX POSITION IN THEIR PROFILE
                    if (uniUser.length === 1) {
                        user.universityIndex = uniUser[0].index;
                        user.save();
                    }   
                });
        }
    });
}
module.exports = {updateUserIndex}; 