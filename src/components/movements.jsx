import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from "@table-library/react-table-library/pagination";
import { getApiData } from '../providers/bankApiProvider';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    const [transferencias, setTransferencias] = useState([]);
    const [movData, SetMovData] = useState({});
    const theme = useTheme(getTheme());
    const [dataTable, setDataTable] = useState({
        nodes: [],
        totalPages: 0,
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
        getApiData({
            type: 'getMovements',
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
            renderCell: (item) => item.date,
        },
        {
            label: 'Descripcion',
            renderCell: (item) => item.description,
        },
        {
            label: 'Monto',
            renderCell: (item) => item.amount,
        }
    ];

    useEffect(() => {
        getApiData({
            type: 'getMovements',
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
            setTransferencias(data.data);
            setDataTable({ totalPages: movData.totalPages, nodes: data.data.slice(0, 10) })
        })
    }, []);

    return (
        <Row className='p-4'>
            <Row className="flex-row justify-content-end">
                <UncontrolledDropdown>
                    <DropdownToggle caret className='app-btn'>
                        Todos
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            Creditos
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
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
                </div>
            </Row>
        </Row>
    )
}

export default Movements
