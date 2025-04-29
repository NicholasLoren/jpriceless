import { colDefaults, useAgGridTheme } from '@/Utils/agGridModules';
import { router } from '@inertiajs/react';
import { AgGridReact } from 'ag-grid-react';
import { Select, TextInput } from 'flowbite-react';
import { debounce } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';

const AgGridTable = ({
    tableData,
    colDefs,
    route,
    params = {},
    initialPage = 1,
    initialPerPage = 20,
    dataKey = 'tableData',
    onDataChange = null,
}) => {
    const tableTheme = useAgGridTheme();
    const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [perPage, setPerPage] = useState(initialPerPage);
    const [filterModel, setFilterModel] = useState({}); // Store filter state

    // Extract pagination info from tableData
    const paginationInfo = useMemo(
        () => ({
            currentPage: tableData?.current_page || initialPage,
            lastPage: tableData?.last_page || 1,
            perPage: tableData?.per_page || perPage,
            total: tableData?.total || 0,
            from: tableData?.from || 1,
            to: tableData?.to || 0,
        }),
        [tableData, initialPage, perPage],
    );

    // Row data is directly from tableData.data
    const rowData = useMemo(() => tableData?.data || [], [tableData]);

    // Handle grid ready
    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
    }, []);

    // Debounced fetch function
    const debouncedFetch = useMemo(
        () =>
            debounce((query, page, pageSize, filters) => {
                // Convert filter model to Laravel-friendly format
                const filterParams = Object.keys(filters).reduce((acc, key) => {
                    const filter = filters[key];
                    if (filter.filterType === 'text') {
                        acc[key] = filter.filter; // Simple text filter
                    }
                    // Add support for other filter types if needed (e.g., number, date)
                    return acc;
                }, {});

                router.get(
                    route,
                    {
                        ...params,
                        search: query,
                        page,
                        per_page: pageSize,
                        ...filterParams,
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        only: [dataKey],
                        onSuccess: (page) => {
                            if (onDataChange && page.props[dataKey]) {
                                onDataChange(page.props[dataKey]);
                            }
                        },
                    },
                );
            }, 300),
        [route, params, dataKey, onDataChange],
    );

    // Handle filter changes
    const onFilterChanged = useCallback(() => {
        if (!gridApi) return;
        const newFilterModel = gridApi.getFilterModel();
        setFilterModel(newFilterModel);
        // Trigger fetch with updated filter
        debouncedFetch(searchQuery, 1, perPage, newFilterModel);
    }, [gridApi, searchQuery, perPage, debouncedFetch]);
    // Handle search input
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedFetch(query, 1, perPage, filterModel);
    };

    // Handle page size change
    const handlePerPageChange = (e) => {
        const newPerPage = parseInt(e.target.value);
        setPerPage(newPerPage);
        debouncedFetch(searchQuery, 1, newPerPage, filterModel);
    };

    // Handle pagination navigation
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= paginationInfo.lastPage) {
            debouncedFetch(searchQuery, newPage, perPage, filterModel);
        }
    };

    return (
        <div className="ag-grid-wrapper w-full">
            {/* Search and Page Size Controls */}
            <div className="flex items-center justify-between p-2">
                <TextInput
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <Select value={perPage} onChange={handlePerPageChange}>
                        {[10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* AG Grid */}
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={paginationInfo.perPage}
                domLayout="autoHeight"
                animateRows={true}
                defaultColDef={{
                    ...colDefaults,
                    sortable: true, // Enable sorting
                    filter: true, // Enable filtering
                }}
                onGridReady={onGridReady} // Capture sort events
                onFilterChanged={onFilterChanged} // Capture filter events
                theme={tableTheme}
                rowModelType="clientSide"
                suppressPaginationPanel={true}
            />

            {/* Custom Pagination Controls */}
            <div className="flex items-center justify-between p-2 text-sm text-gray-600">
                <div>
                    Showing {paginationInfo.from} to {paginationInfo.to} of{' '}
                    {paginationInfo.total} entries
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() =>
                            handlePageChange(paginationInfo.currentPage - 1)
                        }
                        disabled={paginationInfo.currentPage <= 1}
                        className="rounded border px-2 py-1 disabled:opacity-50"
                    >
                        « Previous
                    </button>
                    <span>
                        Page {paginationInfo.currentPage} of{' '}
                        {paginationInfo.lastPage}
                    </span>
                    <button
                        onClick={() =>
                            handlePageChange(paginationInfo.currentPage + 1)
                        }
                        disabled={
                            paginationInfo.currentPage >=
                            paginationInfo.lastPage
                        }
                        className="rounded border px-2 py-1 disabled:opacity-50"
                    >
                        Next »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgGridTable;
