import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CountryDataService} from "../country-data.service";

export interface CountryData {
  name: string;
  flagUnicode: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatSort,
    MatCell,
    MatPaginator,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'flagUnicode'];
  dataSource: MatTableDataSource<CountryData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private countryDataService: CountryDataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    function filter(countries: any[]): CountryData[] {
      return countries.map(country => ({
        name: country.name.official,
        flagUnicode: country.flag,
      }))
    }

    this.countryDataService.getData().subscribe({
      next: data => {
        this.dataSource.data = [...this.dataSource.data, ...filter(data)]
      },
      error: err => {
        console.error('Error fetching data:', err);
      }
    })
  }

}
