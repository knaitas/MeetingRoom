import React, { Component } from 'react';
import CustomersService from './CustomersService';
import DatePicker from 'react-date-picker';


const customersService = new CustomersService();

class CreateMeetingRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dateFrom: new Date(),
          dateTo: new Date(),

        }
      

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      onChangeFrom = dateFrom => this.setState({ dateFrom })
      onChangeTo = dateTo => this.setState({ dateTo })

      changeNiche = (event) => {
        this.setState({selectedRoom: event.target.value})
    }

      componentDidMount(){
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
        customersService.createMeetingRoom(
          { 
            "meetingRoomTitle": this.refs.title.value,
            "roomSize": this.refs.roomSize.value
        }          
        ).then((result)=>{
          alert("Customer created!");
        }).catch((err)=>{
          alert('There was an error! ' + err);
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
            
            <label>
              Title:</label>
              <input className="form-control" type="text" ref='title' />

            <label>
              Room Size:</label>
              <input className="form-control" type="text" ref='roomSize' />


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default CreateMeetingRoom;

