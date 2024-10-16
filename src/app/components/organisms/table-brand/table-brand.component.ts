import { Component, OnInit } from '@angular/core';
import { IBrand} from 'src/app/core/models/IBrand';
import { BrandService } from '../../../shared/service/brand/brand.service';
import { IPageResponse} from '../../../core/models/IPageResponse'

@Component({
  selector: 'app-table-brand',
  templateUrl: './table-brand.component.html',
  styleUrls: ['./table-brand.component.scss']
})
export class TableBrandComponent implements OnInit {



  brands: IBrand[] = [];

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe(
      (data: IPageResponse<IBrand>) => {
        this.brands = data.collection; 
      }
    );
  }

}
