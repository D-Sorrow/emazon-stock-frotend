import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from '../../../shared/service/brand/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  @Input() textButton: string = '';

  constructor(private fb: FormBuilder, private brandService: BrandService ) { }

  brandForm = this.fb.group({
    brandName: ['', [Validators.required, Validators.maxLength(50)]],
    brandDescription: ['', [Validators.required, Validators.maxLength(90)]]
  });

  get nameBrand() { return this.brandForm.get('brandName') as FormControl; }
  get descriptionBrand() { return this.brandForm.get('brandDescription') as FormControl; }

  submitCategory(){
    this.brandService.addBrand(this.brandForm.value)
    .subscribe(response => {
      console.log(response);
    });
    this.brandForm.reset();
  }

  ngOnInit(): void {
  }

}
