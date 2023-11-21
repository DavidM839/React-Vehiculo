import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/api/clientes/"; 

class ClienteCrud extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        form: {
            id:'',
            Nombre: '',
            Apellido: '',
            CorreoElectronico: '',
            Telefono: '',
            Direccion: '',
            DUI: '', 
        },
        clientesSeleccionados: null,
    };

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
        delete this.state.form.id;
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
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

    seleccionarClientes = (cliente) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: cliente.id,
                Nombre: cliente.Nombre,
                Apellido: cliente.Apellido,
                CorreoElectronico: cliente.CorreoElectronico,
                Telefono: cliente.Telefono,
                Direccion: cliente.Direccion,
                DUI: cliente.DUI, 
            }
        });
    }
    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    }

    seleccionarClienteParaEditar = (cliente) => {
        this.setState({
            tipoModal: 'actualizar',
            clientesSeleccionados: cliente,
        });
        this.modalEditar();
    }

    guardarEdicion = () => {
        axios.put(url + this.state.clientesSeleccionados.id, this.state.clientesSeleccionados)
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
            clientesSeleccionados: {
                ...this.state.clientesSeleccionados,
                [e.target.name]: e.target.value,
            },
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
        console.log(this.state.clientesSeleccionados);
    }

    render() {
        const { form, clientesSeleccionados } = this.state;
        const styles = {
            backgroundColor: 'gray',
            padding: '50px',
        };

        return (
            <div style={styles}>
                <br />
                <h4>Registro de Clientes</h4>
                <hr></hr>
                <button className="btn btn-success"onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar();  }}>
                    Agregar cliente
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo Electrónico</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>NO DUI</th> 
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(cliente => { 
                            return (
                                <tr key={cliente.id}>
                                    <td>{cliente.Nombre}</td>
                                    <td>{cliente.Apellido}</td>
                                    <td>{cliente.CorreoElectronico}</td>
                                    <td>{cliente.Telefono}</td>
                                    <td>{cliente.Direccion}</td>
                                    <td>{cliente.DUI}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.seleccionarClienteParaEditar(cliente)}> <FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarClientes(cliente); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={this.modalEditar}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly value={clientesSeleccionados ? clientesSeleccionados.id : ''} />
                            <br />
                            <label htmlFor="Nombre">Nombre</label>
                            <input className="form-control" type="text" name="Nombre" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.Nombre : ''} />
                            <br />
                            <label htmlFor="Apellido">Apellido</label>
                            <input className="form-control" type="text" name="Apellido" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.Apellido : ''} />
                            <br />
                            <label htmlFor="CorreoElectronico">Correo Electrónico</label>
                            <input className="form-control" type="text" name="CorreoElectronico" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.CorreoElectronico : ''} />
                            <br />
                            <label htmlFor="Telefono">Teléfono</label>
                            <input className="form-control" type = "text" name="Telefono" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.Telefono : ''} />
                            <br />
                            <label htmlFor="Direccion">Dirección</label>
                            <input className="form-control" type="text" name="Direccion" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.Direccion : ''} />
                            <br />
                            <label htmlFor="DUI">NO DUI</label> {/* Cambia el nombre del campo a "IDCliente" */}
                            <input className="form-control" type="text" name="DUI" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.DUI : ''} /> {/* Cambia el nombre del campo a "IDCliente" */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={this.guardarEdicion}>Guardar Cambios</button>
                        <button className="btn btn-danger" onClick={this.modalEditar}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="Nombre">Nombre</label>
                            <input className="form-control" type="text" name="Nombre" onChange={this.handleChange} value={form ? form.Nombre : ''} />
                            <br />
                            <label htmlFor="Apellido">Apellido</label>
                            <input className="form-control" type="text" name="Apellido" onChange={this.handleChange} value={form ? form.Apellido : ''} />
                            <br />
                            <label htmlFor="CorreoElectronico">Correo Electrónico</label>
                            <input className="form-control" type="text" name="CorreoElectronico" onChange={this.handleChange} value={form ? form.CorreoElectronico : ''} />
                            <br />
                            <label htmlFor="Telefono">Teléfono</label>
                            <input className="form-control" type="text" name="Telefono" onChange={this.handleChange} value={form ? form.Telefono : ''} />
                            <br />
                            <label htmlFor="Direccion">Dirección</label>
                            <input className="form-control" type="text" name="Direccion" onChange={this.handleChange} value={form ? form.Direccion : ''} />
                            <br />
                            <label htmlFor="DUI">NO DUI</label> {/* Cambia el nombre del campo a "IDCliente" */}
                            <input className="form-control" type="text" name="DUI" onChange={this.handleChange} value={form ? form.DUI : ''} /> {/* Cambia el nombre del campo a "IDCliente" */}
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
                        ¿Estás seguro que deseas eliminar el cliente?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secondary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ClienteCrud;
