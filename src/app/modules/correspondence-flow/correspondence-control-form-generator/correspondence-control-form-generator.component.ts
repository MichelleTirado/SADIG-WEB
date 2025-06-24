import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-correspondence-control-form-generator',
  templateUrl: './correspondence-control-form-generator.component.html',
  styleUrl: './correspondence-control-form-generator.component.scss'
})
export class CorrespondenceControlFormGeneratorComponent {

  internalCorrespondence!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.internalCorrespondence = this.fb.group({
      docNumber: ['', Validators.required]
    })
  }

  generateInternalControlCorrespondence(): void {

  }
}
