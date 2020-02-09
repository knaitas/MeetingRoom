import axios from 'axios';
const API_URL = 'http://157.245.32.50:8000';

export default class CustomersService{

    constructor(){}

    //Sorry, I copied most of the code from another really cool project I did (ask me about it, I'm sure you will like it ^^)

    //get Reservations
    getCustomers(attendee) {
        const url = `${API_URL}/api/reservations/?attendee=${attendee}`;
        return axios.get(url).then(response => response.data);
    }
    //get Meeting Rooms
    getMeetingRooms(available) {
        const url = `${API_URL}/api/meeting_rooms/`;
        return axios.post(url, available).then(response => response.data);
    }
    //get Reservation by url, pagination
    getCustomersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    //get Reservation by id
    getCustomer(pk) {
        const url = `${API_URL}/api/reservations/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    //delete Reservation
    deleteCustomer(customer){
        const url = `${API_URL}/api/reservations/${customer.pk}`;
        return axios.delete(url);
    }
    //delete Meeting room
    deleteMeetingRoom(meetingRoom){
        const url = `${API_URL}/api/meeting_rooms_create/`;
        return axios.put(url, meetingRoom);
    }
    //create Reservation
    createCustomer(customer){
        const url = `${API_URL}/api/reservations/`;
        return axios.post(url,customer);
    }
    //create Meeting Room
    createMeetingRoom(customer){
        const url = `${API_URL}/api/meeting_rooms_create/`;
        return axios.post(url,customer);
    }
    //get employees, display them
    getEmployees() {
        const url = `${API_URL}/api/employees/`;
        return axios.get(url).then(response => response.data);
    }
}
