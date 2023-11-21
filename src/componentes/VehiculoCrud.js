import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/api/vehiculos/";

class VehiculoCrud extends Component {
    
    state = {
        data: [],
        modalInsertar:false,
        modalEditar: false, 
        modalEliminar:false,
        form: {
            id:'',
            marca: '',
            modelo: '',
            anio: '',
            precio: '',
            tipoVehiculo: '',
            estado: '',
            TipoModal:'',
        },
        vehiculoSeleccionado: null,
    }

    componentDidMount() {
        this.peticionGet();
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    
peticionPost = async () => {
    delete this.state.form.id
   await axios.post(url,this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
        .catch(error => {
            console.log(error.message);
        });
}

peticionPut = () => {
    axios.put(url + this.state.form.id, this.state.form).then(response => {
        this.modalInsertar();
        this.peticionGet();
    });
}

peticionDelete = () => {
    axios.delete(url + this.state.form.id).then(response => {
        this.setState({ modalEliminar: false });
        this.peticionGet();
    });
}

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }
   
    SeleccionarVehiculos=(vehiculos)=>{
        
        this.setState({
            TipoModal:'actualizar',
            form: {
                id: vehiculos.id,
                marca: vehiculos.marca,
                modelo: vehiculos.modelo,
                anio: vehiculos.anio,
                precio: vehiculos.precio,
                tipoVehiculo: vehiculos.tipoVehiculo,
                estado: vehiculos.estado,
            }
        });
    }

    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    }

    SeleccionarVehiculosEditar = (vehiculos) => {
        this.setState({
            tipoModal: 'actualizar',
            vehiculoSeleccionado: vehiculos,
        });
        this.modalEditar();
    }

    guardarEdicion = () => {
        axios.put(url + this.state.vehiculoSeleccionado.id, this.state.vehiculoSeleccionado)
            .then(response => {
                this.modalEditar();
                this.peticionGet();
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            vehiculoSeleccionado:{
                ...this.state.vehiculoSeleccionado,
                [e.target.name]: e.target.value
            },
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.vehiculoSeleccionado);
    }

    
    render() {
        const { form, vehiculoSeleccionado } = this.state;

        const styles = {
            backgroundColor: 'gray',
            padding: '50px',
        };
        

        return (
           
            <div style={styles}>
                <br />
                <h4>Venta De Vehiculos</h4>
                <hr></hr>
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>
                    Agregar Vehiculo
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                        <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Precio</th>
                                <th>Tipo de Vehículo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
    
                        {this.state.data.map(vehiculos => {
                            return (
                                <tr key={vehiculos.id}>
                                   <td>{vehiculos.marca}</td>
                                        <td>{vehiculos.modelo}</td>
                                        <td>{vehiculos.anio}</td>
                                        <td>{vehiculos.precio}</td>
                                        <td>{vehiculos.tipoVehiculo}</td>
                                        <td>{vehiculos.estado}</td>
                                    <td>
                                    <button className="btn btn-primary" onClick={() => this.SeleccionarVehiculosEditar(vehiculos)}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.SeleccionarVehiculos(vehiculos); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>

                                    </td>
                                </tr>
                            )
                        })}
    
    
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalEditar}>
                <ModalHeader style={{ display: 'block' }}>
                    <span style={{ float: 'right' }} onClick={this.modalEditar}>X</span>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly value={vehiculoSeleccionado ? vehiculoSeleccionado.id : ''}  />
                        <br />
                        <label htmlFor="marca">Marca</label>
                        <input className="form-control" type="text" name="marca" onChange={this.handleChange } value={vehiculoSeleccionado ? vehiculoSeleccionado.marca : ''}  />
                        <br />
                        <label htmlFor="modelo">Modelo</label>
                        <input className="form-control" type="text" name="modelo" id="modelo" onChange={this.handleChange} value={vehiculoSeleccionado ? vehiculoSeleccionado.modelo : ''}/>
                        <br />
                        <label htmlFor="anio">Año</label>
                        <input className="form-control" type="text" name="anio" onChange={this.handleChange} value={vehiculoSeleccionado ? vehiculoSeleccionado.anio : ''} />
                        <br />
                        <label htmlFor="precio">Precio</label>
                        <input className="form-control" type="text" name="precio" onChange={this.handleChange} value={vehiculoSeleccionado ? vehiculoSeleccionado.precio : ''} />
                        <br />
                        <label htmlFor="tipoVehiculo">Tipo de Vehiculo</label>
      <select
        className="form-control"
        name="tipoVehiculo"
        onChange={this.handleChange}
        value={vehiculoSeleccionado ? vehiculoSeleccionado.tipoVehiculo : ''}
      >
        <option value="">Seleccionar tipo de vehículo</option>
        <option value="Vehiculo Standar">Vehiculo Standar</option>
        <option value="Camioneta">Camioneta</option>
        <option value="Autobus">Autobus</option>
        <option value="Ban">Ban</option>
        <option value="Motocicleta">Motocicleta</option>
        <option value="Deportivo">Deportivo</option>
        <option value="Trailer">Trailer</option>
        {/* Agrega aquí cualquier otro tipo de vehículo */}
      </select>
      <br />
      <label htmlFor="estado">Estado</label>
      <select
        className="form-control"
        name="estado"
        onChange={this.handleChange}
        value={vehiculoSeleccionado ? vehiculoSeleccionado.estado : ''}
      >
        <option value="">Seleccionar estado</option>
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
        <option value="semi-nuevo">Semi-nuevo</option>
      </select>
      <br />
                    </div>
                </ModalBody>
                <ModalFooter>

                    <button className="btn btn-primary" onClick={this.guardarEdicion}>Actualizar</button>                     
                    <button className="btn btn-danger" onClick={this.modalEditar}>Cancelar</button>
                </ModalFooter>

            </Modal>


                <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{ display: 'block' }}>
                    <span style={{ float: 'right' }} onClick={this.modalInsertar}>X</span>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length+1}  />
                        <br />
                        <label htmlFor="marca">Marca</label>
                        <input className="form-control" type="text" name="marca" onChange={this.handleChange } value={form ? form.marca : ''}  />
                        <br />
                        <label htmlFor="modelo">Modelo</label>
                        <input className="form-control" type="text" name="modelo" id="modelo" onChange={this.handleChange} value={form ? form.modelo : ''}/>
                        <br />
                        <label htmlFor="anio">Año</label>
                        <input className="form-control" type="text" name="anio" onChange={this.handleChange} value={form ? form.anio : ''} />
                        <br />
                        <label htmlFor="precio">Precio</label>
                        <input className="form-control" type="text" name="precio" onChange={this.handleChange} value={form ? form.precio : ''} />
                        <br />
                        <label htmlFor="tipoVehiculo">Tipo de Vehiculo</label>
      <select
        className="form-control"
        name="tipoVehiculo"
        onChange={this.handleChange}
        value={form ? form.tipoVehiculo : ''}
      >
        <option value="">Seleccionar tipo de vehículo</option>
        <option value="Vehiculo Standar">Vehiculo Standar</option>
        <option value="Camioneta">Camioneta</option>
        <option value="Autobus">Autobus</option>
        <option value="Ban">Ban</option>
        <option value="Motocicleta">Motocicleta</option>
        <option value="Deportivo">Deportivo</option>
        <option value="Trailer">Trailer</option>
        {/* Agrega aquí cualquier otro tipo de vehículo */}
      </select>
      <br />
      <label htmlFor="estado">Estado</label>
      <select
        className="form-control"
        name="estado"
        onChange={this.handleChange}
        value={form ? form.estado : ''}
      >
        <option value="">Seleccionar estado</option>
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
        <option value="semi-nuevo">Semi-nuevo</option>
      </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                {this.state.tipoModal === 'insertar' ? (
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        )}
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                </ModalFooter>

            </Modal>

            <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar este vehiculo?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                    <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                </ModalFooter>
            </Modal>
                </div>
        );
    }
    }
    export default VehiculoCrud;
        
      
         
        
      
         
     
    
  
     