import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import FindPalindromos from './Palindromos.js'

const url = "https://crudcrud.com/api/0c5b231f566c4c548af8ef567dd64fe8/mascota"

class App extends Component {
  //estado del componente
  state = {
    data: [],
    insert: false,
    delete: false,
    form: {
      _id: '',
      edad: '',
      nombre: '',
      especie: '',
      tipoModal: '',
    }
  }

  //get
  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data })
    }).catch(error => {
      console.log(error.message)
    })
  }

  //Post
  peticionPost = async () => {
    await axios.post(url, this.state.form).then(response => {
      if (!this.state.form.edad || !this.state.form.nombre || !this.state.form.especie) {
        alert('Por favor, llene todos los campos')
      } else {
        this.setInsertar()
        this.peticionGet()
      }
    }).catch(error => {
      console.log(error.message)
    })
  }

  //Put
  peticionPut = () => {
    axios.put(url + this.state.form._id, this.state.form, { headers: { "Access-Control-Allow-Methods": "OPTIONS", "Access-Control-Allow-Headers": "Accept" } }).then(response => {
      console.log(url)
      this.setInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message)
    })
  }

  //Detele
  peticionDelete = () => {
    axios.delete(url + "/" + this.state.form._id).then(response => {
      this.setState({ delete: false })
      this.peticionGet()
    }).catch(error => {
      console.log(error.message);
    })
  }

  //ciclo de vida
  componentDidMount() {
    this.peticionGet()
  }

  setInsertar = () => {
    this.setState({ insert: !this.state.insert })
  }


  seleccioarMascota = (mascota) => {
    this.setState({
      tipoModal: 'Actualizar',
      form: {
        _id: mascota._id,
        edad: mascota.edad,
        nombre: mascota.nombre,
        especie: mascota.especie
      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }



  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <FindPalindromos />
        <div className="btn">
          <button className={"btn btn-success"} onClick={() => { this.setState({ form: null, tipoModal: 'Crear' }); this.setInsertar() }}>Agregar</button>

        </div>
        <div>
          <table className="table table-light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Edad</th>
                <th>Nombre</th>
                <th>Especie</th>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(mascota => {
                return (
                  <tr>
                    <td>{mascota._id}</td>
                    <td>{mascota.edad}</td>
                    <td> {mascota.nombre} </td>
                    <td> {mascota.especie} </td>
                    <td>
                      <button className="btn btn-primary" onClick={() => { this.seleccioarMascota(mascota); this.setInsertar() }}>Editar</button> {"  "}
                      <button className="btn btn-danger" onClick={() => { this.seleccioarMascota(mascota); this.setState({ delete: true }) }}>Eliminar</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Modal isOpen={this.state.insert}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'center' }}>{this.state.tipoModal} Mascota</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="nombre">Id</label>
              <input className="form-control" readOnly type="text" name="_id" id="_id" onChange={this.handleChange} value={form ? form._id : ''} />
              <label htmlFor="nombre">Edad</label>
              <input className="form-control" type="number" name="edad" id="edad" onChange={this.handleChange} value={form ? form.edad : ''} />
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
              <label htmlFor="nombre">Especie</label>
              <input className="form-control" type="text" name="especie" id="especie" onChange={this.handleChange} value={form ? form.especie : ''} />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === 'Crear' ?
              <button className="btn btn-primary" onClick={() => this.peticionPost()}> Crear </button> :
              <button className="btn btn-success" onClick={() => this.peticionPut()}> Editar </button>

            }
            <button className="btn btn-danger" onClick={() => this.setInsertar()}> Cancelar </button> </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.delete}>
          <ModalBody>
            Estás seguro que deseas eliminar a la mascota {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ delete: false })}>No</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
