import {
    ClientSideRowModelModule,
    colorSchemeDarkBlue,
    ColumnAutoSizeModule,
    ColumnHoverModule,
    CsvExportModule,
    CustomFilterModule,
    DateFilterModule,
    ModuleRegistry,
    NumberFilterModule,
    PaginationModule,
    TextFilterModule,
    themeQuartz,
    TooltipModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
    ColumnAutoSizeModule,
    ColumnHoverModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CustomFilterModule,
    CsvExportModule,
    ClientSideRowModelModule,
    TooltipModule,
]);
export const colDefaults = {
    resizable: true,
    filter: false,
    sortable: true,
    flex: 1,
    minWidth: 100,
};

import { useThemeMode } from 'flowbite-react';

export const useAgGridTheme = () => {
    const { computedMode } = useThemeMode();

    // Return appropriate AG Grid theme based on current theme mode
    return computedMode === 'dark'
        ? themeQuartz.withPart(colorSchemeDarkBlue)
        : themeQuartz;
};
