 'use strict'

 const firebase = require('../../../../db')
 const Project = require('../../../models/project')
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


    async getAllProject(req, res){
        try{
            const projects = firestore.collection('projects');
            const data  = await projects.get();
            let groupArray = []
            if(data.empty){
                res.status(200).send(groupArray)
            }else{
                data.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data())
                    const project = {
                        id : doc.id, ...doc.data()
                    }
                    groupArray.push(project)
                  });
                res.send(groupArray)
            }
             
        }catch(error){
            res.status(404).send(error)
        }   
    }

    //Get Project of 1 User

    async getAllProjectEachEmail(req, res){
        try{
            
            const projects = firestore.collection('projects');
            const {email} = req.params
            const data = await projects.where('member', 'array-contains',
            email).get()
            
            let groupArray = []
            if(data.empty){
                res.status(200).send(groupArray)
            }else{
                data.forEach(doc => {
                    const project = {
                        id : doc.id, ...doc.data()
                    }
                    groupArray.push(project)
                  })
                res.send(groupArray)
            }
             
        }catch(error){
            res.status(404).send(error)
        }  
    }

    //Get Project with id
    async getProject(req, res){
        try{
            const id = req.params.id;
            const projects = firestore.collection('projects').doc(id);
            const data  = await projects.get();
            
            if(!data.exists){
                res.status(404).send("Project with that given ID not found")
            }else{           
                const result = {
                    id: data.id, ...data.data()
                }   
                res.send(result)
            }
             
        }catch(error){
            res.status(404).send(error)
        }   
    }

    async updateProject(req, res){
        try{
            const id = req.params.id;
            const data = req.body;
            const projects = firestore.collection('projects').doc(id);
            await projects.update(data);
            const result = await projects.get() 
            const result2 = {
                id: result.id, ...result.data()
            }   
            res.send(result2)
        }catch(error){
            res.status(404).send(error)
        }
    }

    async deleteProject(req, res){
        try{
            const id = req.params.id;
            await firestore.collection('projects').doc(id).delete();
            res.send("Delete Successfully")
        }catch(error){
            res.status(404).send(error)
        }
    }
}