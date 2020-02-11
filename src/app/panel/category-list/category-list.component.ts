import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

import * as jsPDF from 'jspdf';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Array<CategoryInterface>;
  type: string;

  nombre: string;
  descripcion: string;
  imagen: any;


  constructor(
    private categoryService: CategoryService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  delete(category) {
    this.categoryService.deleteCategory(category.id).subscribe(response => {
      this.getCategories();
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  downloadPDF() {
    const doc = new jsPDF();

    doc.text('Lista de Categorias', 10, 10);

    doc.save('Prueba.pdf');
  }
}
