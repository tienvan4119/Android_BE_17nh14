 'use strict'

 const firebase = require('../../../../db')
 const Student = require('../../../models/project')
 const firestore = firebase.firestore();

 export default class ProjectController{

    async addProject(req, res) {
       try{
            const data = req.body;
            await firestore.collection('projects').doc().set(data);
            res.send('Projects has been created successfully');
        }catch (error){
           res.status(400).send(error.message);
       }
    }
    
}