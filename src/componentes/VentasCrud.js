import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/api/ventas/"; 

class VentasCrud extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        form: {
            id:'',
            IDVehiculo: '',
            IDCliente: '',
            FechaVenta: '',
            PrecioVenta: '',
            MetodoPago: '',
        },
        ventasSeleccionadas: null,
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
            this.modalEditar();
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

    seleccionarVentas = (venta) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
            id: venta.id,
            IDVehiculo: venta.IDVehiculo,
            IDCliente: venta.IDCliente,
            FechaVenta: venta.FechaVenta,
            PrecioVenta: venta.PrecioVenta,
            MetodoPago: venta.MetodoPago,
            }
        });
    }

    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    }

    seleccionarVentaParaEditar = (venta) => {
        this.setState({
            tipoModal: 'actualizar',
            ventasSeleccionadas: venta,
        });
        this.modalEditar();
    }

    guardarEdicion = () => {
        axios.put(url + this.state.ventasSeleccionadas.id, this.state.ventasSeleccionadas)
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
            ventasSeleccionadas: {
                ...this.state.ventasSeleccionadas,
                [e.target.name]: e.target.value,
            },
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
        console.log(this.state.ventasSeleccionadas);
    }

    render() {
        const { form, ventasSeleccionadas } = this.state;
        const styles = {
            backgroundColor: 'gray',
            padding: '50px',
        };

        return (
            <div style={styles}>
                <br />
                <h4>Registro de Ventas</h4>
                <hr></hr>
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); }}>
                    Agregar venta
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>ID Vehículo</th>
                            <th>ID Cliente</th>
                            <th>Fecha de Venta</th>
                            <th>Precio de Venta</th>
                            <th>Método de Pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(venta => {
                            return (
                                <tr key={venta.id}>
                                    <td>{venta.IDVehiculo}</td>
                                    <td>{venta.IDCliente}</td>
                                    <td>{venta.FechaVenta}</td>
                                    <td>{venta.PrecioVenta}</td>
                                    <td>{venta.MetodoPago}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.seleccionarVentaParaEditar(venta)}> <FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarVentas(venta); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            );
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
                            <input className="form-control" type="text" name="id" id="id" readOnly value={ventasSeleccionadas ? ventasSeleccionadas.id : ''} />
                            <br />
                            <label htmlFor="IDVehiculo">ID Vehículo</label>
                            <input className="form-control" type="text" name="IDVehiculo" onChange={this.handleChange} value={ventasSeleccionadas ? ventasSeleccionadas.IDVehiculo : ''} />
                            <br />
                            <label htmlFor="IDCliente">ID Cliente</label>
                            <input className="form-control" type="text" name="IDCliente" onChange={this.handleChange} value={ventasSeleccionadas ? ventasSeleccionadas.IDCliente : ''} />
                            <br />
                            <label htmlFor="FechaVenta">Fecha de Venta</label>
                            <input className="form-control" type="text" name="FechaVenta" onChange={this.handleChange} value={ventasSeleccionadas ? ventasSeleccionadas.FechaVenta : ''} />
                            <br />
                            <label htmlFor="PrecioVenta">Precio de Venta</label>
                            <input className="form-control" type="text" name="PrecioVenta" onChange={this.handleChange} value={ventasSeleccionadas ? ventasSeleccionadas.PrecioVenta : ''} />
                            <br />
                            <label htmlFor="MetodoPago">Método de Pago</label>
                            <input className="form-control" type="text" name="MetodoPago" onChange={this.handleChange} value={ventasSeleccionadas ? ventasSeleccionadas.MetodoPago : ''} />
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
                            <label htmlFor="IDVehiculo">ID Vehículo</label>
                            <input className="form-control" type="text" name="IDVehiculo" onChange={this.handleChange} value={form ? form.IDVehiculo : ''} />
                            <br />
                            <label htmlFor="IDCliente">ID Cliente</label>
                            <input className="form-control" type="text" name="IDCliente" onChange={this.handleChange} value={form ? form.IDCliente : ''} />
                            <br />
                            <label htmlFor="FechaVenta">Fecha de Venta</label>
                            <input className="form-control" type="text" name="FechaVenta" onChange={this.handleChange} value={form ? form.FechaVenta : ''} />
                            <br />
                            <label htmlFor="PrecioVenta">Precio de Venta</label>
                            <input className="form-control" type="text" name="PrecioVenta" onChange={this.handleChange} value={form ? form.PrecioVenta : ''} />
                            <br />
                            <label htmlFor="MetodoPago">Método de Pago</label>
                            <input className="form-control" type="text" name="MetodoPago" onChange={this.handleChange} value={form ? form.MetodoPago : ''} />
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
                        ¿Estás seguro que deseas eliminar la venta?
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

export default VentasCrud;
