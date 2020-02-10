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

      handleCreate(){
        customersService.createMeetingRoom(
          { 
            "meetingRoomTitle": this.refs.title.value,
            "roomSize": this.refs.roomSize.value
        }          
        ).then((result)=>{
          //In real app I would add a toaster and push to meeting room list url
          alert("Meeting Room Created! Please visit meeting room list");
        }).catch((err)=>{
          alert('There was an error! ' + err);
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

