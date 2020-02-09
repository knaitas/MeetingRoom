import axios from 'axios';
const API_URL = 'http://157.245.32.50:8000';

export default class CustomersService{

    constructor(){}

    //Sorry, I copied most of the code from another really cool project I did (ask me about it, I'm sure you will like it ^^)

    getCustomers(attendee) {
        const url = `${API_URL}/api/reservations/?attendee=${attendee}`;
        return axios.get(url).then(response => response.data);
    }
    getMeetingRooms(available) {
        const url = `${API_URL}/api/meeting_rooms/?available=${available}`;
        return axios.get(url).then(response => response.data);
    } 
    getCustomersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getCustomer(pk) {
        const url = `${API_URL}/api/reservations/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteCustomer(customer){
        const url = `${API_URL}/api/reservations/${customer.pk}`;
        return axios.delete(url);
    }
    deleteMeetingRoom(meetingRoom){
        const url = `${API_URL}/api/meeting_rooms/`;
        return axios.put(url, meetingRoom);
    }
    createCustomer(customer){
        const url = `${API_URL}/api/reservations/`;
        return axios.post(url,customer);
    }
    createMeetingRoom(customer){
        const url = `${API_URL}/api/meeting_rooms/`;
        return axios.post(url,customer);
    }
    getEmployees() {
        const url = `${API_URL}/api/employees/`;
        return axios.get(url).then(response => response.data);
    }
}
