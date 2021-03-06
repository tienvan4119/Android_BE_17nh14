 'use strict'

 const firebase = require('../../../../db')
 const Task = require('../../../models/task')
 const firestore = firebase.firestore();

 export default class TaskController{

    async addTask(req, res) {
       try{
            const data = req.body;
            await firestore.collection('tasks').doc().set(data);
            res.status(200).send('task has been created successfully');
        }catch (error){
           res.status(400).send(error.message);
       }
    }

    async getAllTask(req, res){
        try{
            const tasks = firestore.collection('tasks');
            const data  = await tasks.get();
            let groupArray = []
            if(data.empty){
                res.status(200).send(groupArray)
            }else{
                data.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data())
                    const task = {
                        id : doc.id, ...doc.data()
                    }
                    groupArray.push(task)
                  });
                res.status(200).send(groupArray)
            }
             
        }catch(error){
            res.status(404).send(error)
        }   
    }

    //Get Task of 1 User

    async getAllTaskEachMember(req, res){
        try{
            
            const tasks = firestore.collection('tasks');
            const email = req.body.email;
            const data = await tasks.where('member', 'array-contains',
            email).get()
            
            let groupArray = []
            if(data.empty){
                res.status(200).send(groupArray)
            }else{
                data.forEach(doc => {
                    const task = {
                        id : doc.id, ...doc.data()
                    }
                    groupArray.push(task)
                  })
                res.status(200).send(groupArray)
            }
             
        }catch(error){
            res.status(404).send(error)
        }  
    }

    //Get Task with id
    async getTask(req, res){
        try{
            const id = req.params.id;
            const task = firestore.collection('tasks').doc(id);
            const data  = await task.get();
            
            if(!data.exists){
                res.status(200).send("Task with that given ID not found")
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

    async getTaskEachScreen(req, res){
        try{
            const id = req.params.id;
            const {state} = req.query
            console.log(id)
            // const tasks = firestore.collection('tasks');
            const data = await firestore.collection('tasks').where('project_id', '==', id).where('state', '==', state).get();
            // console.log(data)
            let groupArray = []
            if(data.empty){
                res.status(200).send(groupArray)
            }else{
                data.forEach(doc => {
                    const task = {
                        id : doc.id, ...doc.data()
                    }
                    groupArray.push(task)
                  })
                res.status(200).send(groupArray)
            }
        }catch(error){
            res.status(404).send(error)
        }  
    }


    async updateTask(req, res){
        try{
            const id = req.params.id;
            const data = req.body;
            const task = firestore.collection('tasks').doc(id);
            await task.update(data);
            const result = await task.get() 
            const result2 = {
                id: result.id, ...result.data()
            }   
            res.status(200).send(result2)
        }catch(error){
            res.status(404).send(error)
        }
    }

    async deleteTask(req, res){
        try{
            const id = req.params.id;
            await firestore.collection('tasks').doc(id).delete();
            res.status(200).send("Delete Successfully")
        }catch(error){
            res.status(404).send(error)
        }
    }
    
    async moveTask(req, res){
        try{
            const id = req.params.id;
            const task = firestore.collection('tasks').doc(id);
            const task_position = req.body
            await task.update(task_position)
            const result = await task.get() 
            const result2 = {
                id: result.id, ...result.data()
            }   
            res.status(200).send(result2)
        }catch(error){
            res.status(404).send(error)
        }
    }
}