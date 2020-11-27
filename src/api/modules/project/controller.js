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

    async getAllProjectOfEmail(req, res){
        try{
            const email = req.body.email;
            console.log(email)
            const projectRef = await firestore.collection('projects');
            console.log(projectRef)
            const queryRef = await projectRef.where('member', 'array-contains', email).get();
            
            res.send(queryRef)
        }catch(error){
            res.status(404).send("Erorrrr")
        }   
    }
    
}