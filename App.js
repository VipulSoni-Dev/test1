import {  Fab, Title } from 'native-base';
import React, { Component } from 'react'
import {  View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { Button, Card, Badge ,Text, Input} from 'react-native-elements';

export class App extends Component {
  constructor(params) {
    super(params)
    this.state = {
      cat: {
        "personal": {
          'p1': {
            "content": "my first note",
            "date": 1600514848702,
          },
          'p2': {
            "content": "my first note",
            "date": 1600514848702,
          }
      },
        "work": {
          "w1": {
            "content": "my first note",
            "date": 1600514848702,
          },
          "w2": {
            "content": "my secound note",
            "date": 1600514848702,
          },
          "w3": {
            "content": "my secound note",
            "date": 1600514848702,
          },
        }


      },
      notePageContent : [],
      selectedCat:null,
      renderCat:false,
      renderNotes:false,
      renderAddNotePage:false,
      initalLoading : true
    }

  }

  render() {


 //for categories 
   const cats = () => {
   
      for (const key in this.state.cat) {
       
           this.state.notePageContent.push(
                
                   <TouchableOpacity key={key} onPress={(e)=>{
                     this.setState({renderNotes:true})
                     this.setState({selectedCat:key},
                     this.setState({notePageContent:[]})
                      )
                   }}>             
                  
                     <Text  h4 style={styles.noteText}>{key.substr(0,1).toUpperCase()+key.substr(1)}</Text> 
                   
                        <Badge badgeStyle={{width:30,height:30,marginTop:10,borderRadius:30}} 
                        value={Object.values(this.state.cat[key]).length}/> 
                        <Text> </Text>
                        <Button type="outline" title="Delete" onPress={()=>{
                          delete this.state.cat[key]
                          this.setState({renderNotes:false})
                          this.setState({notePageContent:[]})
                        }} />
                  </TouchableOpacity>  
           )       
          
           
      } 
      
      return this.state.notePageContent
   }
//for notes
   const notes = () => {
       
    for (const key in this.state.cat[this.state.selectedCat]) {
     let notes = this.state.cat[this.state.selectedCat]
    
      let  d =new Date(notes[key].date)
      
         this.state.notePageContent.push(
              
                <Card key={key}> 
                  <Card.Title>{d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()}</Card.Title>
                  <Card.Divider/>
                  <Text h4>{notes[key].content}</Text>
                  <Text> </Text>
                  <Button onPress={()=>{delete notes[key]
                      // this.setState({renderNotes:false})
                      this.setState({notePageContent:[]})
                      this.setState({renderNotes:true})
                  }} type="clear" title="delete" />
                </Card>
                
         )       
        
         
    } 
    
    return this.state.notePageContent
 }
 //for adding notes 
const addNote = ()=>{

  if(this.state.cat.hasOwnProperty(this.state.category))
  {
    const len = Object.values(this.state.cat[this.state.category]).length+1
    const id = this.state.category.substr(0,1)+len
    this.state.cat[this.state.category][id] = {
          "content":  this.state.content,
          "date" : Date.now()
    }
  }else{
    const id = this.state.category.substr(0,1)+"1"
    
    this.state.cat = {
      ...this.state.cat,
      [this.state.category]:{
        [id]:{
          date:Date.now(),
          content:this.state.content
        }
      }
    }
  }
  this.setState({renderAddNotePage:false})
  this.setState({renderNotes:false})  
  this.setState({notePageContent:[]})
}


    return (
      <View style={styles.container} >
        { 

          //renders notes homeScreen or NotesScreen 
         this.state.renderNotes ? 

          //renders add note screen 
          this.state.renderAddNotePage ? 
                  
                  <View style={{width:'80%', marginTop:200,alignItems:"center"}}>
                    <Text h4>Add Note</Text>   
                        <Input placeholder="Content" onChangeText={(text)=>this.setState({content:text})} />
                        <Input placeholder="Category" onChangeText={(text)=>this.setState({category:text})}/>
                    <Button title="Add" type="outline" onPress={()=>{
                          addNote()
                      }} />
                </View>
          :
        //renders NotesScreen
        <View>
              <View>
                  <Button mar title={'<< back'} type="clear"
                    onPress={()=>{this.setState({renderNotes:false})
                                  this.setState({notePageContent:[]})
                              } }
                  />
              </View>
                      <Text h3 style={{alignSelf:"center"}}>{this.state.selectedCat.substr(0,1).toUpperCase()+this.state.selectedCat.substr(1)}</Text>
                        <ScrollView style={{minHeight:250,minWidth:150,marginBottom:10}}> 
                           {notes()}
                        </ScrollView>
                      <Button type="outline"   title="Add Note" onPress={()=>{
                        this.setState({renderAddNotePage:true})
                        this.setState({notePageContent:[]})
                      }} />
        </View>
        :  
        <View  >
                <Text h3 style={{alignSelf:"center"}}>Notes</Text>
                <Text> </Text>             
                <ScrollView style={{minHeight:250,minWidth:150,marginBottom:10}}>
                    {cats()}
                </ScrollView>
                <Button type="outline"   title="Add Note" onPress={()=>{
                       
                       this.setState({renderAddNotePage:true})
                      this.setState({renderNotes:true})
                       this.setState({notePageContent:[]})
                     }} />
        </View>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:2,
    borderRadius:30,
    alignItems :"center"
    
  },
  fabStyle:{
    height:60,
    width:60,
    borderRadius:30,
    backgroundColor:"green"
  },
  badgeStyle:{
    width:60,
    height:60
  },
  noteText:{
    letterSpacing:1,
    marginTop:10,
    alignSelf:"center"
  }
})


export default App
