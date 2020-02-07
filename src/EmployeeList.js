import  React, { Component } from  'react';
import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();

class  EmployeeList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        employees: [],
        nextPageURL:  ''
    };

}

componentDidMount() {
    var  self  =  this;
    customersService.getEmployees().then(function (result) {
        console.log(result);
        self.setState({ employees:  result})
    });
}

render() {

    return (
        <div  className="customers--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Employee's E-mail</th>
                <th>Employee's Name</th>
            </tr>
            </thead>
            <tbody>
            {this.state.employees.map( c  =>
                <tr  key={c.id}>
                <td>{c.id}  </td>
                <td>{c.email}</td>
                <td>{c.username}</td>
            </tr>)}
            </tbody>
            </table>
        </div>
        );
  }
}
export  default  EmployeeList;
