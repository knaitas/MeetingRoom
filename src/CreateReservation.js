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
        }
      

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      getEmployees = () => {
        var self = this;
        customersService.getEmployees().then(function (result) {
          self.setState({ employeeList:  result})
          });
        }
        
      onChangeFrom = dateFrom => this.setState({ dateFrom })
      onChangeTo = dateTo => this.setState({ dateTo })

      changeRoom = (event) => {
        this.setState({selectedRoom: event.target.value})
    }

      selectEmployees = (selectedOption) => {
        this.setState({employee: selectedOption})
      }


      componentDidMount(){
        this.getEmployees();
        var self = this;
        customersService.getMeetingRooms("available").then(function (result) {
            if(result.data.length !== 0){
              self.setState({ roomList:  result.data, selectedRoom: result.data[0].meetingRoomTitle})
            }
        });
      }

      handleCreate(){
        customersService.createCustomer(
          { 
            "title": this.refs.title.value,
            "fromDate": this.state.dateFrom,
            "toDate": this.state.dateTo,
            "employees": this.state.employee,
            "notes": this.refs.additionalNotes.value,
            "roomReserved": this.state.selectedRoom,
        }          
        ).then((result)=>{
          alert("Reservation Created! Please visit reservations list!");
        }).catch((err)=>{
          alert('There was an error! Please re-check your form.'+ err);
        });
      }
      
      handleSubmit(event) {
          this.handleCreate();
      
          event.preventDefault();
      }

      render() {
        if (this.state.roomList.length === 0){
          return (

            <div>Sorry, no rooms available, busy season.</div>
          )

        } else {
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
                      <Select ref="employees"
                              onChange={this.selectEmployees} 
                              className="basic-multi-select" 
                              isMulti 
                              options={this.state.employeeList.map(emp => (
                              {value: emp.username, label: emp.username}
                          ))}/>
                    </div>
              </div>

              <label>
                Additional notes:</label>
                <textarea className="form-control" ref='additionalNotes' ></textarea>


              <input className="btn btn-primary" type="submit" value="Submit" />
              </div>
            </form>
          );
      }  
    }   
}

export default CreateReservation;

