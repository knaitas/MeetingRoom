import React, { Component } from 'react';
import CustomersService from './CustomersService';
import DatePicker from 'react-date-picker';
import Select from 'react-select'


const customersService = new CustomersService();

class CreateReservation extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
          dateFrom: new Date(),
          dateTo: new Date(),
          selectedRoom: '',
          employee: '',
          roomList: [],
          employeeList: [],
          selectedEmployees: []
        }
      

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      getEmployees = () => {
        var self = this;
        customersService.getEmployees().then(function (result) {
          console.log(result)
          self.setState({ employeeList:  result})
      });

      }
      onChangeFrom = dateFrom => this.setState({ dateFrom })
      onChangeTo = dateTo => this.setState({ dateTo })

      changeRoom = (event) => {
        this.setState({selectedRoom: event.target.value})
    }

      selectEmployees = (event) => {
      console.log(event.target.value)
      this.setState({employee: event.target.value}, () => {
        this.setState(prevState => ({
          selectedEmployees: [this.state.employee, ...prevState.selectedEmployees]
        }))
      })
  }

      componentDidMount(){
        this.getEmployees();
        var self = this;
        customersService.getMeetingRooms("available").then(function (result) {
            if(result.data.length !== 0){
              self.setState({ roomList:  result.data, selectedRoom: result.data[0].meetingRoomTitle})
            }
        });
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          customersService.getCustomer(params.pk).then((c)=>{
            console.log(c)
            this.refs.title.value = c.title;
            this.refs.fromDate.value = c.fromDate;
            this.refs.toDate.value = c.toDate;
            this.refs.employees.value = c.employees;
            this.refs.additionalNotes.value = c.notes;
          })
        }
      }

      handleCreate(){
        customersService.createCustomer(
          { 
            "title": this.refs.title.value,
            "fromDate": this.state.dateFrom,
            "toDate": this.state.dateTo,
            "employees": this.state.selectedEmployees.toString(),
            "notes": this.refs.additionalNotes.value,
            "roomReserved": this.state.selectedRoom,
        }          
        ).then((result)=>{
          alert("Customer created!");
        }).catch((err)=>{
          alert('There was an error! Please re-check your form.'+ err);
        });
      }
      handleUpdate(pk){
        customersService.updateCustomer(
          {
            "pk": pk,
            "title": this.refs.title.value,
            "fromDate": this.state.dateFrom,
            "toDate": this.state.dateTo,
            "employees": this.refs.employees.value,
            "notes": this.refs.additionalNotes.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("Customer updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">

          <div>
            <label>
              Select Room:</label>
            <div>
                <select id="rooms" onChange={this.changeRoom} value={this.state.selectedRoom}>
                {this.state.roomList.map(room  =>
                    <option key={room.id} value={room.meetingRoomTitle}>{room.meetingRoomTitle}</option>
                )}
                </select>
               </div>
            </div>

            <label>
              Title:</label>
              <input className="form-control" type="text" ref='title' />
              
            <div>
            <label>
              From:</label>
              <DatePicker ref="fromDate"
                onChange={this.onChangeFrom}
                value={this.state.dateFrom}
              />

            <label>
              To:</label>
              <DatePicker ref="toDate"
                onChange={this.onChangeTo}
                value={this.state.dateTo}
              />
            </div>

            <div>
            <label>
              Select Employee:</label>
            <div>
                <select id="employees" onChange={this.selectEmployees} value={this.state.employee}>
                {this.state.employeeList.map(emp  =>
                    <option key={emp.id} value={emp.username}>{emp.username}</option>
                )}
                </select>
               </div>
               {this.state.selectedEmployees}
            </div>

            <label>
              Employees:</label>
              <input className="form-control" type="text" ref='employees' value={this.state.selectedEmployees} />

            <label>
              Additional notes:</label>
              <textarea className="form-control" ref='additionalNotes' ></textarea>


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default CreateReservation;

