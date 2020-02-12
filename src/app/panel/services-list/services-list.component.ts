import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service-service.service';
import { ServiceInterface } from 'src/app/interfaces/service.interface';
import { CategoryService } from 'src/app/services/category.service';
declare var $: any;

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  private services?: any;

  type: string;

  nombre: string;
  categoria_id: number = 1;
  descripcion: string;
  precio: number;
  imagen: any;

  constructor(
    private serviceService: ServiceService,
  ) { }

  ngOnInit() {
    this.getServices();
  }

  delete(service) {
    this.serviceService.deleteService(service.id).subscribe(response => {
      this.getServices();
    })
  }

  getServices() {
    this.serviceService.getServices().subscribe(response => {
      this.services = response.data;
      console.log(this.services);
    });
  }
}
