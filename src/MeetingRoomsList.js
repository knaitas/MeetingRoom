import  React, { Component } from  'react';
import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();

class  MeetingRoomsList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        customers: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    customersService.getMeetingRooms().then(function (result) {
        self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    customersService.deleteMeetingRoom({pk :  pk}).then(()=>{
        var  newArr  =  self.state.customers.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({customers:  newArr})
    });
}

nextPage(){
    var  self  =  this;        
    customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {
        self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div  className="customers--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Room Title</th>
                <th>Availability</th>
                <th>Room size</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.customers.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.meetingRoomTitle}</td>
                <td>{ c.isAvailable ? ("AVAILABLE!") : ("Sorry, taken :(") }</td>
                <td>{c.roomSize}</td>
                <td> 
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  MeetingRoomsList;
