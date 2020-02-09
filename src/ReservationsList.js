import  React, { Component } from  'react';
import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();

class  ReservationsList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        customers: [],
        nextPageURL:  '',
        selectedEmployee: '',
        employeeList: []
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    customersService.getCustomers().then(function (result) {
        self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });

    customersService.getEmployees().then(function (result) {
        if(result.length !== 0){
          self.setState({ employeeList:  result})
        }
    });
}

handleDelete(e, pk){
    {/*One way to delete rows in frontend is by removing objects from array in frontend (Client's side) 
    much faster and more efficient for applications that handle millions of users*/}
    var  self  =  this;
    customersService.deleteCustomer({pk :  pk}).then(()=>{
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

loadEmployeeReservations(attendee){
    var  self  =  this;
    customersService.getCustomers(attendee).then(function (result) {
        self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });
}

searchEmployee = (event) => {
    this.setState({selectedEmployee: event.target.value})
    this.loadEmployeeReservations(event.target.value)
}

render() {

    return (
        <div  className="customers--list">
            <div>
            Filter by employees:  <select id="employees" onChange={this.searchEmployee} value={this.state.selectedEmployee}>
                {this.state.employeeList.map(employee  =>
                    <option key={employee.id} value={employee.username}>{employee.username}</option>
                )}
               </select>

               <button style={{marginLeft: "15px"}} className="btn btn-primary"  onClick=  {this.loadEmployeeReservations.bind(this, "all")}>Show All Reservations</button>
               </div>

            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Reservation title</th>
                <th>Meeting Room</th>
                <th>Reserved from</th>
                <th>Reserved to</th>
                <th>Employees attending</th>
                <th>Notes</th>
                <th>Reservation made at</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.customers.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.title}</td>
                <td>{c.roomReserved}</td>
                <td>{c.fromDate}</td>
                <td>{c.toDate}</td>
                <td>{c.employees}</td>
                <td>{c.notes}</td>
                <td>{c.createdAt}</td>
                <td>
                <button className="btn btn-primary" onClick={(e)=>  this.handleDelete(e, c.pk) }> Cancel reservation</button>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  ReservationsList;
