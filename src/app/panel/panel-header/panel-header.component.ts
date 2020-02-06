import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.scss']
})
export class PanelHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  logOut(){
    localStorage.setItem('access_token','');

    if (  localStorage.getItem('access_token').length === 0 ) {
      this.router.navigate(['/login']);
      this.toastr.success('Sesión cerrada', 'Hasta otra!');
    }
  }

}
