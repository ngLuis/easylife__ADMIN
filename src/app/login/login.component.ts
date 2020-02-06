import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserInterface = {
    email: '',
    password: ''
  };

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit() {
  }

  logIn() {
    this.authService.logIn(this.user).subscribe(response => {
      localStorage.setItem("access_token", response.access_token);
      this.showToast();
    },
    error => {
      console.log(error);
      this.showToast();
    })
  }

  showToast() {
    let token: string = localStorage.getItem("access_token");

      this.authService.me(token).subscribe(result => {
        if (result.type == 1) {
          this.toastr.success('Sesión iniciada', 'Bienvenido!');
          this.router.navigate(['/panel']);
        } else if (result.type == 0){
          this.toastr.error('Error al iniciar sesion', 'Debes ser administrador');
          localStorage.setItem("access_token", '');
        }
      },
      error => {
        console.log(error);
        if ( error.status === 401 ) {
          this.toastr.error('Error al iniciar sesion', 'El usuario introducido no existe');
        }
      });

  }

}


