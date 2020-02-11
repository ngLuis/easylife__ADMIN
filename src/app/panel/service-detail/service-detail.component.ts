import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceInterface } from 'src/app/interfaces/service.interface';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  id: string;

  nombre: string = '';
  descripcion: string = '';
  idServicio: number = 0;
  precio: number;
  categoriaId: number;

  categories: CategoryInterface[];

  file: File;


  servicio?: ServiceInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private route: Router,
    private serviceService: ServiceService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id === 'nuevo-servicio' ) {
      this.servicio = null;
    } else {
      this.serviceService.getServiceById(this.id).subscribe(response => {
        this.servicio = response.data;

        this.idServicio = this.servicio.id;
        this.nombre = this.servicio.nombre;
        this.descripcion = this.servicio.descripcion;
        this.precio = this.servicio.precio
        this.categoriaId = this.servicio.categoria_id
        
      });
    }

    this.categoryService.getCategories().subscribe(response => {
      console.log(response);

      this.categories = response.data;
      console.log(this.categories);
    });
  }

  saveService() {
    let formData = new FormData();

    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio+'');

    if ( this.categoriaId !== -1 ) {
      formData.append('categoria_id', this.categoriaId+'');
    }
    

    if ( this.file !== undefined ) {
      formData.append('imagen', this.file);
    }

    if ( this.servicio === null) {
      this.serviceService.postService(formData).subscribe(response => {
        this.route.navigate(['/panel/servicios']);
      },
      error => {
        console.log(error);
      })
    } else {
      formData.append('id', this.idServicio+'');
      this.serviceService.patchService(formData).subscribe(response => {
        console.log(response);
        this.route.navigate(['/panel/servicios']);
      },
      error => {
        console.log(error);
      })
    }
  }

  fileChanged(event) {
    this.file = event.target.files[0];
  }

  optionChanged(event) {
    this.categoriaId = event.target.value;
  }

}
