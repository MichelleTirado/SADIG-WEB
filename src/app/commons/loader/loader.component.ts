import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  date = new Date();
  slowLoading: boolean = false;
  @Input() loader: any;

  constructor(private changeDetectorRef: ChangeDetectorRef){
    this.loader = {'message': 'Cargando'}
    setTimeout(() => {
      this.slowLoading = true;
      this.changeDetectorRef.detectChanges();
    }, 60000);
  }
  
}
