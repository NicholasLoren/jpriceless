import { colDefaults, useAgGridTheme } from '@/Utils/agGridModules';
import { AgGridReact } from 'ag-grid-react';

const AgGridTable = ({ tableData, colDefs }) => {
    const tableTheme = useAgGridTheme();
    return (
        <div>
            <AgGridReact
                theme={tableTheme}
                rowData={tableData}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={20}
                domLayout="autoHeight"
                animateRows={true}
                defaultColDef={colDefaults}
            />
        </div>
    );
};

export default AgGridTable;
