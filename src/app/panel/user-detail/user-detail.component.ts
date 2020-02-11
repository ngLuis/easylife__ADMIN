import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  usuario: UserInterface;

  id: string;

  idUsuario: number;
  nombre: string;
  email: string;
  contrasenya: string;
  dni: string;
  type: number;

  file: File;

  constructor(
    private route: Router,
    private activatedRouter: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];

    if ( this.id === 'nuevo-usuario') {
      this.usuario = null;
    } else {
      this.userService.getUserById(this.id).subscribe(response => {
        this.usuario = response.data;

        this.idUsuario = this.usuario.id;
        this.nombre = this.usuario.name;
        this.email = this.usuario.email;
        this.contrasenya = this.usuario.password;
        this.dni = this.usuario.dni;
        this.type = this.usuario.type;

        console.log(this.type);

      });
    }
  }

  saveUser() {
    var formData = new FormData();

    formData.append('name', this.nombre);
    formData.append('email', this.email);
    formData.append('password', this.contrasenya);
    formData.append('dni', this.dni);
    console.log('TRAS GUARDAR'+this.type);
    formData.append('type', this.type+'');

    console.log(formData);

    if ( this.file !== undefined ) {
      formData.append('image', this.file);
    }


    if ( this.usuario === null) {
      this.userService.postUser(formData).subscribe(response => {
        this.route.navigate(['/panel/usuarios']);
      },
      error => {
        console.log(error);
      })
    } else {
      formData.append('id', this.idUsuario+'');
      this.userService.patchUser(this.idUsuario, formData).subscribe(response => {
        this.route.navigate(['/panel/usuarios']);
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
    this.type = event.target.value;
    console.log(this.type);
  }

}
