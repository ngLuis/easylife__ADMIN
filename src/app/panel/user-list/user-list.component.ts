import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users?: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  delete(user) {
    this.userService.deleteUser(user.id).subscribe(response => {
      this.getUsers();
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      console.log(this.users);
    });
  }

  generatePdf(user) {
    const doc = new jsPDF();


    this.userService.getComprasById(user.id).subscribe(response => {
      console.log(response);
      // doc.text(20,20,"Compras realizadas por el usuario: "+user.name);
      let html = '<h1>Historial de compra de: ' + user.name + '</h1>';
      let total = 0;
      response.data.map(service => {
        html += `<p> ${service.nombre} ${service.precio}</p>`;
        total += parseInt(service.precio);
      });

      html += '<p>Total a pagar:'+total+'</p>'

      doc.fromHTML(html, 15, 15, {
        "width":170
      });

      doc.save(user.dni+'-historial-compras');
    })
  }

}
