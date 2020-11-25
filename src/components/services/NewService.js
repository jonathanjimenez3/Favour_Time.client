import React, { Component } from "react";
import ServiceTypeService from "../../lib/serviceType-service";
import { withAuth } from "../../lib/AuthProvider";
import './newService.css'


class NewService extends Component {
  state = {
    serviceName: "",
    imageService: "",
    description: "",
    serviceTypeID: "",
    availableTime: "",
    cityToBeHeld: "",
    addressToBeHeld: "",
    streetNumberToBeHeld: "",
    credits: "",
    serviceTypeSelect: [],
    imgService: "",
  };
  componentDidMount() {
    this.allServicesSelect();
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = async (e) => {
    const files = e.target.files[0];
    this.setState({ imgService: files });
  };

  allServicesSelect = () => {
    ServiceTypeService.getAllServiceType()
      .then((responseFromApi) => {
        this.setState({
          serviceTypeSelect: responseFromApi,
        });
      })
      .catch((error) => console.log(error));
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newServiceResponse = await ServiceTypeService.newService(
        this.state
      );
      await ServiceTypeService.handleUpload(
        this.state.imgService,
        newServiceResponse._id
      );
      this.setState({
        serviceName: "",
        imageService: "",
        description: "",
        serviceTypeID: "",
        availableTime: "",
        cityToBeHeld: "",
        addressToBeHeld: "",
        streetNumberToBeHeld: "",
        credits: "",
        imgService: "",
      });
      this.props.form({ showForm: !this.state.showForm });
    } catch (error) {
      console.log("Error while adding the service: ", error);
    }
  };

  render() {
    return (
      <>
      <div className="newContainer">
        <form onSubmit={this.handleFormSubmit}>

          <input
            type="text"
            name="serviceName"
            value={this.state.serviceName}
            onChange={(e) => this.handleChange(e)}
            required
            className="input-Form"
            placeholder="Service Name"
          />

          <input
            type="text"
            name="cityToBeHeld"
            value={this.state.cityToBeHeld}
            onChange={(e) => this.handleChange(e)}
            required
            className="input-Form"
            placeholder="City"
          />

          <input
            type="text"
            name="addressToBeHeld"
            value={this.state.addressToBeHeld}
            onChange={(e) => this.handleChange(e)}
            required
            className="input-Form"
            placeholder="Address"
          />
          
          <input
            type="text"
            name="streetNumberToBeHeld"
            value={this.state.streetNumberToBeHeld}
            onChange={(e) => this.handleChange(e)}
            required
            className="input-Form"
            placeholder="Street Number"
          />
         
          <input
            type="number"
            name="credits"
            value={this.state.credits}
            onChange={(e) => this.handleChange(e)}
            required
            className="input-Form" 
            placeholder="Credits"
          />

          <div className="select">
          <select name="serviceTypeID" value={this.state.serviceTypeID} onChange={(e) => this.handleChange(e)} required>
            <option value="">Category</option>
            {this.state.serviceTypeSelect.map((type) => {
              return (
                <option key={type._id} value={type._id}>
                  {type.serviceName}
                </option>
              );
            })}
          </select>
          </div>
  
            <div className="select">
            <select name="availableTime" value={this.state.availableTime} onChange={(e) => this.handleChange(e)} required>
              <option value="">Available Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
          </div>

          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
            required
            className="input-Form"
            placeholder="Description"
          />

          <label for="file-upload" className="upload">
           Upload your photo
          </label>
          <input type="file" id="file-upload" onChange={(e) => this.handleFileUpload(e)} style={{ display: 'none'}} required/>
          
          <input type="submit" value="NEW SERVICE" className="signin-btn" />
        </form>
        </div>
      </>
    );
  }
}

export default withAuth(NewService);
