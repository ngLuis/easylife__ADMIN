import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  id: string;

  categoria: CategoryInterface;

  idCategoria: number;
  nombre: string;
  descripcion: string;
  file: File;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private route: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if ( this.id === 'nueva-categoria' ) {
      this.categoria = null;
    } else {
      this.categoryService.getCategoryById(this.id).subscribe(response => {
        this.categoria = response.data;

        this.nombre = this.categoria.nombre;
        this.descripcion = this.categoria.descripcion;
        this.idCategoria = this.categoria.id;
      });
    }
  }

  fileChanged(event) {
    this.file = event.target.files[0];
  }

  saveCategory(){
    var formData = new FormData();

    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    
    if ( this.file !== undefined ) {
      formData.append('imagen', this.file);
    }


    if ( this.categoria === null) {
      this.categoryService.postCategory(formData).subscribe(response => {
        this.route.navigate(['/panel/categorias']);
      },
      error => {
        console.log(error);
      })
    } else {
      formData.append('id', this.idCategoria+'');
      this.categoryService.patchCategory(formData).subscribe(response => {
        console.log(response);
        this.route.navigate(['/panel/categorias']);
      },
      error => {
        console.log(error);
      })
    }

  }
}