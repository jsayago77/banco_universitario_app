import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from "@table-library/react-table-library/pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import { UserContext } from '../providers/userContext';
import { useContext, useEffect, useState } from 'react';
import { getApiData } from '../providers/bankApiProvider';

function Dashboard() {

    const { userData, setUserContext } = useContext(UserContext);
    const [movData, SetMovData] = useState({});
    const [transferencias, setTransferencias] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [balance, setBalance] = useState(0);
    const [dataTable, setDataTable] = useState({
        nodes: [],
        totalPages: 0,
    });

    const INITIAL_PARAMS = {
        page: 1,
        page_size: 10
    };

    function getCreditsDebits(movimientos) {
        const credits = new Array(12).fill(0);
        const debits = new Array(12).fill(0);

        if (!movimientos) return {
            credits,
            debits
        };

        movimientos.forEach(movimiento => {
            const fecha = new Date(movimiento.created_at);
            const mes = fecha.getMonth(); // Obtiene el mes (0 para enero, 1 para febrero, etc.)
            const cantidad = movimiento.amount;

            if (movimiento.multiplier === 1) {
                credits[mes] += cantidad;
            } else if (movimiento.multiplier === -1) {
                debits[mes] += cantidad;
            }
        });

        return {
            credits,
            debits
        };
    }

    useEffect(() => {
        setUserContext({ ...userData, page_name: "Inicio" });
    }, [userData])
    
    useEffect(() => {
        getApiData({
            type: 'getBalance',
            method: 'GET',
        }).then(response => response.json())
        .then(data => {

            const updatedUser = { ...userData, balance: data.data.balance };
            setUserContext(updatedUser);
            setBalance(data.data.balance)
            
        })

        getApiData({
            type: 'movements',
            method: 'GET',
            args: {
            }
        }).then(response => {
            SetMovData({
                totalPages: response.headers.get('X-Pagination-Page-Count'),
                totalMovements: response.headers.get('X-Pagination-Total-Count')
            })
            return response.json();
        })
        .then(data => {
            console.log(movData)
            console.log(data)
            const updatedUser = { ...userData, movements: data.data };
            setUserContext(updatedUser);

            let transfers = data.data;
            transfers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            const ultimasTransacciones = transfers.slice(0, 10);
            setTransferencias(data.data);
            setDataTable({ totalPages: movData.totalPages, nodes: transfers.slice(0, 10) })
        })

        getApiData({
            type: 'getClients',
            method: 'GET',
            args: {
                page: 1,
                page_size: 20
            }
        }).then(response => response.json())
        .then(data => {
            const updatedUser = { ...userData, clients: data.data };
            setUserContext(updatedUser);
            setContactos(data.data);
        })
    }, []);

    const pagination = usePagination(dataTable, {
        state: {
            page: INITIAL_PARAMS.page,
            size: INITIAL_PARAMS.page_size,
        },
        onChange: onPaginationChange,
    }, {
        isServer: true,
    });

    function onPaginationChange(action, state) {
        getApiData({
            type: 'movements',
            method: 'GET',
            args: {
                page: state.page + 1,
                page_size: INITIAL_PARAMS.page_size
            }
        }).then(response => response.json())
        .then(data => {
            setDataTable({ ...dataTable, nodes: data.data })
        })
    }

    const theme = useTheme(getTheme());
    const COLUMNS = [
        {
            label: 'Cuenta',
            renderCell: (item) => item.account_number,
        },
        {
            label: 'ID',
            renderCell: (item) => item.id,
        },
        {
            label: 'Descripcion',
            renderCell: (item) => item.description,
        },
        {
            label: 'Monto',
            renderCell: (item) => 'Bs. ' + item.amount.toLocaleString(),
        },
        // {
        //     label: 'Opciones',
        //     renderCell: (item) => item.options,
        // },
    ];

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'end'
            }
        },
    };

    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const table_data = getCreditsDebits(transferencias);

    const data = {
        labels,
        datasets: [
            {
                label: 'Debitos',
                data: table_data.debits ? table_data.debits : [],
                borderColor: 'rgb(252, 196, 62)',
                backgroundColor: 'rgb(252, 196, 62)',
                tension: 0.5
            },
            {
                label: 'Creditos',
                data: table_data.credits ? table_data.credits : [],
                borderColor: 'rgb(251, 125, 91)',
                backgroundColor: 'rgb(251, 125, 91)',
                tension: 0.5
            },
        ],
    };


    return (
        <Row className='p-4'>
            <Row className='app-section'>
                <Col className='d-flex ms-4' xs='6'>
                    <Col className='d-flex align-items-center me-3' xs='1'>
                        <Row className='dash-icon'><FontAwesomeIcon icon={faUserTie} size='lg' /></Row>
                    </Col>
                    <Col>
                        <Row>Saldo actual</Row>
                        <Row className='fs-3'>{balance.toLocaleString()}</Row>
                    </Col>
                </Col>
                <Col className='d-flex'>
                    <Col className='d-flex align-items-center' xs='3'>
                        <Row className='dash-icon bg-orange'><FontAwesomeIcon icon={faUserTie} size='lg' /></Row>
                    </Col>
                    <Col>
                        <Row>Contactos</Row>
                        <Row className='fs-3'>{contactos ? contactos.length : 0}</Row>
                    </Col>
                </Col>
                <Col className='d-flex'>
                    <Col className='d-flex align-items-center' xs='3'>
                        <Row className='dash-icon bg-yellow'><FontAwesomeIcon icon={faHandHoldingDollar} size='lg' /></Row>
                    </Col>
                    <Col>
                        <Row>Transferencias</Row>
                        <Row className='fs-3'>{transferencias.length}</Row>
                    </Col>

                </Col>
            </Row>
            <Row className='app-section'>
                <Row><h4>Volumen de Transferencias</h4></Row>
                <Line options={options} data={data} />
            </Row>
            <Row className='app-section'>
                <Row><h4>Últimas Transferencias</h4></Row>
                <CompactTable columns={COLUMNS} data={dataTable} theme={theme} pagination={pagination} />
                {/* <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Mostrando { pagination.state.page } de {movData.totalMovements} transferencias </span>

                    <span>
                        Paginas:{" "}
                        {Array(dataTable.totalPages).fill().map((_, index) => (
                            <Button
                                className='m-1 rounded-circle border-0'
                                key={index}
                                type="button"
                                style={{
                                    fontWeight: pagination.state.page === index ? "bold" : "normal",
                                    backgroundColor: pagination.state.page === index ? "#49BEB7" : "#ffffff",
                                    color: pagination.state.page === index ? "#ffffff" : "#A098AE",
                                }}
                                onClick={() => pagination.fns.onSetPage(index)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </span>
                </div> */}
            </Row>
        </Row>
    )
}

export default Dashboard
