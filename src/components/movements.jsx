import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from "@table-library/react-table-library/pagination";
import { getApiData } from '../providers/bankApiProvider';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    Row,
    Col,
    Button,
    ButtonGroup,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem
} from 'reactstrap';

function Movements() {

    const INITIAL_PARAMS = {
        page: 1,
        page_size: 10
    };

    const [multiplier, setMultiplier] = useState(null);
    const [transferencias, setTransferencias] = useState([]);
    const theme = useTheme(getTheme());
    const [dataTable, setDataTable] = useState({
        nodes: [],
        totalPages: 0,
        totalMovements: 0
    });

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
        let argsData = {};
        argsData.page = state.page + 1;
        argsData.page_size = INITIAL_PARAMS.page_size;
        if (multiplier != null) argsData.multiplier = multiplier;
        getApiData({
            type: 'movements',
            method: 'GET',
            args: argsData
        }).then(response => response.json())
        .then(data => {
            setDataTable({ ...dataTable, nodes: data.data })
        })
    }

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
            label: 'Fecha',
            renderCell: (item) => moment(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            label: 'Descripcion',
            renderCell: (item) => item.description,
        },
        {
            label: 'Monto',
            renderCell: (item) => 'Bs. ' + item.amount.toLocaleString(),
        }
    ];

    useEffect(() => {
        let argsData = {};
        if (multiplier != null) argsData.multiplier = multiplier

        let movData = {
            totalPages: 0,
            totalMovements: 0
        };
        getApiData({
            type: 'movements',
            method: 'GET',
            args: argsData
        }).then(response => {
            movData.totalPages = response.headers.get('X-Pagination-Page-Count')
            movData.totalMovements = response.headers.get('X-Pagination-Total-Count')
            return response.json();
        })
        .then(data => {
            console.log(movData)
            setTransferencias(data.data);
            setDataTable({ 
                totalPages: movData.totalPages ? parseInt(movData.totalPages) : 0,
                totalMovements: movData.totalMovements ? parseInt(movData.totalMovements) : 0,
                nodes: data.data.slice(0, 10) 
            })
        })
    }, [getApiData, multiplier]);

    function getDataMultiplier(type){
        setMultiplier(type);
    }

    return (
        <Row className='p-4'>
            <Row className="flex-row justify-content-end my-3">
                <UncontrolledDropdown className='mx-5' style={{display:'contents'}}>
                    <DropdownToggle caret className='app-btn-outline mx-3' style={{backgroundColor:'inherit'}}>
                        Obtener
                    </DropdownToggle>
                    <DropdownMenu className='rounded-4'>
                        <DropdownItem onClick={() => getDataMultiplier(null) }>
                            Todos
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => getDataMultiplier(1) }>
                            Creditos
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => getDataMultiplier(-1) }>
                            Debitos
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <Link className='btn app-btn' to='/new-movement'>
                    <FontAwesomeIcon icon={faPlus} size='lg' /> Nueva
                </Link>
            </Row>
            <Row className='app-section'>
                <CompactTable columns={COLUMNS} data={dataTable} theme={theme} pagination={pagination} />
                <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Mostrando { pagination.state.page * INITIAL_PARAMS.page_size} de {dataTable.totalMovements} transferencias </span>
                    <br />
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
                </div>
            </Row>
        </Row>
    )
}

export default Movements
